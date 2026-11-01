import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function localIdentityToken() {
  const dataDir =
    process.env.LAUNCHCASE_DATA_DIR || resolve(process.cwd(), "../.launchcase");
  const identityPath = process.env.LAUNCHCASE_IDENTITY_FILE
    ? resolve(process.env.LAUNCHCASE_IDENTITY_FILE)
    : resolve(dataDir, "identity.json");
  try {
    const contents = await readFile(identityPath, "utf8");
    const identity = JSON.parse(
      contents.charCodeAt(0) === 0xfeff ? contents.slice(1) : contents,
    );
    return typeof identity.token === "string" &&
      identity.token.length > 0 &&
      identity.token.length <= 200
      ? identity.token
      : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  if (
    request.headers.get("origin") !==
    `${request.nextUrl.protocol}//${request.headers.get("host")}`
  )
    return NextResponse.json(
      { error: { message: "Origin rejected" } },
      { status: 403 },
    );
  const { token } = await request.json();
  if (typeof token !== "string" || token.length > 200)
    return NextResponse.json(
      { error: { message: "Invalid token" } },
      { status: 400 },
    );
  const response = await fetch(
    `${process.env.LAUNCHCASE_API_URL || "http://127.0.0.1:8810"}/api/v1/product-cases`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (!response.ok)
    return NextResponse.json(
      { error: { message: "身份凭证无效" } },
      { status: 401 },
    );
  const result = NextResponse.json({ ok: true });
  result.cookies.set("launchcase_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 28800,
  });
  return result;
}
export async function DELETE(request: NextRequest) {
  if (
    request.headers.get("origin") !==
    `${request.nextUrl.protocol}//${request.headers.get("host")}`
  )
    return NextResponse.json(
      { error: { message: "Origin rejected" } },
      { status: 403 },
    );
  const result = NextResponse.json({ ok: true });
  result.cookies.delete("launchcase_session");
  return result;
}

export async function GET(request: NextRequest) {
  const existingToken = request.cookies.get("launchcase_session")?.value;
  const token = existingToken || (await localIdentityToken());
  if (!token)
    return NextResponse.json(
      { authenticated: false },
      { headers: { "Cache-Control": "no-store" } },
    );

  let upstream: Response;
  try {
    upstream = await fetch(
      (process.env.LAUNCHCASE_API_URL || "http://127.0.0.1:8810") +
        "/api/v1/product-cases",
      {
        headers: { Authorization: "Bearer " + token },
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(3000),
      },
    );
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!upstream.ok) {
    const result = NextResponse.json(
      { authenticated: false },
      { headers: { "Cache-Control": "no-store" } },
    );
    if (existingToken) result.cookies.delete("launchcase_session");
    return result;
  }

  const result = NextResponse.json(
    { authenticated: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  if (!existingToken)
    result.cookies.set("launchcase_session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: request.nextUrl.protocol === "https:",
      path: "/",
      maxAge: 28800,
    });
  return result;
}
