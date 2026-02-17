import SubcategoryDetailScreen from "../../../../features/categories/screens/subcategoryDetail.screen";
export default async function SubcategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SubcategoryDetailScreen subcategoryId={id} />;
}
