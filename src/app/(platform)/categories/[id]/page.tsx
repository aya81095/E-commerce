import SubcategoriesScreen from "../../../../features/categories/screens/subcategories.screen";
interface subcategoriesProps {
  params: Promise<{ id: string }>;
}
export default async function Subcategories({
  params,
}: {
  params: subcategoriesProps["params"];
}) {
  const resolvedParams = await params;
  return <SubcategoriesScreen categoryId={resolvedParams.id} />;
}
