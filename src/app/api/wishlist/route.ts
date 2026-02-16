import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token)
    return NextResponse.json(
      { status: "fail", message: "Not authenticated" },
      { status: 401 },
    );

  const body = await req.json();
  const resp = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token)
    return NextResponse.json(
      { status: "fail", message: "Not authenticated" },
      { status: 401 },
    );

  const resp = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token,
    },
  });
  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}
