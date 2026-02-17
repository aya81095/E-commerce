import BrandDetailScreen from "../../../../features/brands/screens/brandDetail.screen";

interface BrandPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { id } = await params;
  return <BrandDetailScreen brandId={id} />;
}
