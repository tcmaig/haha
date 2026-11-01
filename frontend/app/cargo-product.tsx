import { useId } from "react";

type ProductKind =
  | "stationery"
  | "appliance"
  | "parts"
  | "tools"
  | "component"
  | "visual"
  | "sample"
  | "package";

/** Local vector navigation artwork; these illustrations are not product evidence. */
export default function CargoProduct({ kind }: { kind: ProductKind }) {
  const id = useId();
  return (
    <svg viewBox="0 0 128 104" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fbf8ee" />
          <stop offset="1" stopColor="#c7d8cd" />
        </linearGradient>
      </defs>
      <ellipse cx="65" cy="93" rx="46" ry="6" fill="#244c40" opacity=".1" />
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {kind === "stationery" && (
          <>
            <path d="m25 29 43-10 25 13-44 11Z" fill="#efb879" />
            <path d="m25 29 24 14v46L25 75Z" fill="#b76940" />
            <path d="m49 43 44-11v46L49 89Z" fill="#f5ecda" />
            <path d="m56 52 27-7m-27 17 27-7m-27 17 18-5" opacity=".55" />
            <path d="m28 24 16-4m-13 14 16-4m-13 14 10-3" />
            <path d="m92 26 7-18 6 2-7 18-6 7Z" fill="#e8b34d" />
            <path d="m92 35 6-7" />
            <path d="m100 54 7-23 6 2-7 23-6 6Z" fill="#a9c7c1" />
          </>
        )}
        {kind === "appliance" && (
          <>
            <path d="m34 16 43-7 19 13-43 7Z" fill="#cde1df" />
            <path d="m77 9 19 13v64l-19 7Z" fill="#50908e" />
            <path d="m34 16 43-7v84l-43-9Z" fill={`url(#${id})`} />
            <path d="m34 45 43 1" />
            <path d="M68 23v13m0 19v16" strokeWidth="3" />
            <path d="m40 85 1 6m29 2v4" strokeWidth="4" />
            <rect x="42" y="22" width="14" height="7" rx="1" fill="#72aba6" />
          </>
        )}
        {kind === "parts" && (
          <>
            <path d="m20 58 48-24 37 13-48 26Z" fill="#c7ccb7" />
            <path d="m20 58 37 15v15L20 72Z" fill="#8e9e7d" />
            <path d="m57 73 48-26v15L57 88Z" fill="#b3bea1" />
            <path
              d="m55 27 9-3 3 7 8 1 6-6 8 6-4 8 4 6 9 1 1 10-9 3-3 6 4 8-8 6-7-6-8 1-4 7-10-3 1-9-5-6-9 1-3-10 8-4 1-8-5-7 7-7 8 4Z"
              fill="#e0e3d6"
            />
            <ellipse cx="70" cy="49" rx="13" ry="14" fill="#7a8d73" />
            <ellipse cx="70" cy="49" rx="6" ry="7" fill="#f3f0e5" />
          </>
        )}
        {kind === "tools" && (
          <>
            <path
              d="M36 17c-9 0-15 8-13 17l12-8 9 10-12 10c7 5 15 2 19-4l32 40a7 7 0 0 0 11-9L57 35c1-9-5-18-14-19l3 12-9 2Z"
              fill="#ccd4c9"
            />
            <circle cx="87" cy="76" r="3" fill="#f5f1e5" />
            <path d="m90 17 7 5-26 34-7-5Z" fill="#d3d9d0" />
            <path d="m61 48 13 10-20 28c-5 5-17-4-14-9Z" fill="#dba74c" />
            <path d="m49 75 15-19m-9 24 14-19" opacity=".55" />
            <path d="m97 22 6-6-4-3-9 4" fill="#d3d9d0" />
          </>
        )}
        {kind === "component" && (
          <>
            <path d="m18 45 60-25 34 24-61 29Z" fill="#527c74" />
            <path
              d="m18 45 33 28v8L18 53Zm33 28 61-29v8L51 81Z"
              fill="#345e59"
            />
            <path d="m42 45 30-13 20 13-31 14Z" fill="#374e59" />
            <path
              d="m42 45 19 14v8L42 53Zm19 14 31-14v8L61 67Z"
              fill="#25404c"
            />
            <path
              d="m49 40-6-4m13 1-5-4m13 1-5-4m21 7 6-3m1 8 7-3M43 54l-7 4m13 1-7 4m13 1-7 4m27-8 6 4m1-8 7 3"
              stroke="#e8cc81"
              strokeWidth="3"
            />
            <path d="m29 46 6-3m60 5 6-3M56 76l8-4m7-3 8-4" stroke="#d6be79" />
          </>
        )}
        {kind === "visual" && (
          <>
            <path
              d="m28 35 16-3 6-11 23-3 9 11 16-2 10 8-63 12Z"
              fill="#dbd4bf"
            />
            <path d="m28 35 70-8v52l-70 9Z" fill={`url(#${id})`} />
            <path d="m98 27 10 8v50l-10-6Z" fill="#85998f" />
            <path d="m28 44 70-8v12l-70 8Z" fill="#9c6652" />
            <ellipse cx="64" cy="61" rx="21" ry="23" fill="#536d66" />
            <ellipse cx="64" cy="61" rx="15" ry="17" fill="#b8c8bd" />
            <ellipse cx="64" cy="61" rx="10" ry="12" fill="#294e50" />
            <path d="m60 55 5-3" stroke="#e7efe3" strokeWidth="3" />
            <path d="m36 37 10-1m8-10 14-2" strokeWidth="4" />
            <circle cx="88" cy="40" r="3" fill="#e9c581" />
          </>
        )}
        {kind === "sample" && (
          <>
            <path d="m22 40 53-16 31 20-53 18Z" fill="#e0c394" />
            <path d="m22 40 31 22v29L22 68Z" fill="#a98962" />
            <path d="m53 62 53-18v29L53 91Z" fill="#c9b58b" />
            <path
              d="m27 40 31 21m10-30 31 20M22 50l31 22 53-18M22 60l31 22 53-18"
              opacity=".6"
            />
            <path
              d="m36 36 31 21v29m23-37v29"
              strokeWidth="5"
              stroke="#527a67"
            />
            <path d="m73 61 13-4v12l-13 4Z" fill="#f9f2df" />
            <path d="m76 66 7-2" />
          </>
        )}
        {kind === "package" && (
          <>
            <path d="m18 60 42-14 30 18-42 16Z" fill="#e5c18b" />
            <path d="m18 60 30 20v15L18 75Z" fill="#ac8051" />
            <path d="m48 80 42-16v16L48 95Z" fill="#ccaa75" />
            <path d="m47 28 36-10 26 16-36 12Z" fill="#ecd09f" />
            <path d="m47 28 26 18v30L47 59Z" fill="#bd945f" />
            <path d="m73 46 36-12v29L73 76Z" fill="#dbb782" />
            <path d="m61 24 26 18v12l9-3V39L70 21Z" fill="#f9e6b9" />
            <path d="m83 59 12-4m-12 9 8-3" />
            <path d="m31 56 30 19v15l8-3V72L39 53Z" fill="#f6dfaf" />
          </>
        )}
      </g>
    </svg>
  );
}
