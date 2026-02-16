import ProductDetailsScreen from "@/src/features/products/screens/productDetails";

interface productDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function productDetailsPage({
  params,
}: productDetailsProps) {
  const { id } = await params;
  return <ProductDetailsScreen productId={id} />;
}
