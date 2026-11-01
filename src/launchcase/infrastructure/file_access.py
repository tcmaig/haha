"""Read original files without following links on POSIX or native Windows."""

import os
from pathlib import Path


def open_original(path: Path):
    if os.name != "nt":
        return os.fdopen(os.open(path, os.O_RDONLY | os.O_NOFOLLOW), "rb")

    import ctypes
    import errno
    import msvcrt
    from ctypes import wintypes

    class AttributeTag(ctypes.Structure):
        _fields_ = [("attributes", wintypes.DWORD), ("tag", wintypes.DWORD)]

    # Open the reparse point itself, then inspect the opened handle. Do not
    # replace O_NOFOLLOW with an unprotected check followed by normal open.
    kernel = ctypes.WinDLL("kernel32", use_last_error=True)
    create = kernel.CreateFileW
    create.argtypes = [
        wintypes.LPCWSTR,
        wintypes.DWORD,
        wintypes.DWORD,
        ctypes.c_void_p,
        wintypes.DWORD,
        wintypes.DWORD,
        wintypes.HANDLE,
    ]
    create.restype = wintypes.HANDLE
    info = kernel.GetFileInformationByHandleEx
    info.argtypes = [wintypes.HANDLE, ctypes.c_int, ctypes.c_void_p, wintypes.DWORD]
    info.restype = wintypes.BOOL
    close = kernel.CloseHandle
    close.argtypes = [wintypes.HANDLE]
    close.restype = wintypes.BOOL
    if any(p.is_symlink() or p.is_junction() for p in [path, *path.parents]):
        raise OSError(errno.ELOOP, "Original file links are not accepted", str(path))
    handle = create(str(path.absolute()), 0x80000000, 1, None, 3, 0x00200000, None)
    if handle == wintypes.HANDLE(-1).value:
        raise ctypes.WinError(ctypes.get_last_error())
    try:
        attributes = AttributeTag()
        if not info(handle, 9, ctypes.byref(attributes), ctypes.sizeof(attributes)):
            raise ctypes.WinError(ctypes.get_last_error())
        if attributes.attributes & (0x400 | 0x10):
            raise OSError(errno.ELOOP, "Original must be a regular file", str(path))
        fd = msvcrt.open_osfhandle(handle, os.O_RDONLY | os.O_BINARY)
        handle = None  # The descriptor now owns the Windows handle.
        return os.fdopen(fd, "rb")
    finally:
        if handle is not None:
            close(handle)
