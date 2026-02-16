import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } },
) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token)
    return NextResponse.json(
      { status: "fail", message: "Not authenticated" },
      { status: 401 },
    );

  const { productId } = params;
  const resp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    },
  );
  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}
