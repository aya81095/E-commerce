import { getProductDetails } from "../server/products.actions"
import ProductInfo from "../components/productDetails/productInfo"
// import Pagination from "../components/productDetails/pagination"
export default async function ProductDetailsScreen({productId}: {productId: string}) {
    const response= await getProductDetails({id: productId})
    return (
        <div>
            <ProductInfo product={response.data}/>
            {/* <Pagination /> */}
        </div>
    )
}