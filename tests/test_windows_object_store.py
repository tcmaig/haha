import os

import pytest

from launchcase.domain.common import DomainError
from launchcase.infrastructure.store import ObjectStore


def test_original_read_and_tamper_detection(tmp_path):
    store = ObjectStore(tmp_path)
    sha = store.put(b"original source bytes")
    assert store.get(sha) == b"original source bytes"
    store.path(sha).write_bytes(b"replaced bytes")
    with pytest.raises(DomainError, match="hash changed"):
        store.get(sha)


@pytest.mark.skipif(os.name != "nt", reason="Native Windows junction handling")
def test_windows_junction_is_rejected(tmp_path):
    import _winapi

    store = ObjectStore(tmp_path / "data")
    sha = store.put(b"original")
    alias = tmp_path / "alias"
    _winapi.CreateJunction(str(store.root.parent), str(alias))
    try:
        with pytest.raises(DomainError, match="unavailable"):
            ObjectStore(alias).get(sha)
    finally:
        alias.rmdir()
