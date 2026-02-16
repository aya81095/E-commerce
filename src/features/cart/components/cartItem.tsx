import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { CartItem as CartItemType } from "../types/cart.types";
import Swal from "sweetalert2";
import { removeProductFromCart, updateProductQuantity } from "../server/cart.actions";
import { removeProduct, setCartInfo } from "../store/cart.slice";
import { useAppDispatch } from "@/src/store/store";
import {useState} from "react"

export default function CartItem({info}: {info: CartItemType}) {
    const {_id,product,count,price}=info
    const {title,imageCover,category,id,quantity}=product
    const dispatch=useAppDispatch()
    const [loadingType,setLoadingType]=useState<'inc' | 'dec' | null>(null)

    const handleDeleteProduct=async()=>{
const result = await Swal.fire({
  html: `
    <div class="text-center">
      <div class="w-14 h-14 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center">
        
        <svg xmlns="http://www.w3.org/2000/svg" 
             class="w-6 h-6" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke="currentColor" 
             stroke-width="2">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5-3H6a1 1 0 00-1 1v2h14V5a1 1 0 00-1-1z" />
        </svg>

      </div>

      <h2 class="text-xl font-semibold mt-4">
         Remove <span class="font-bold text-gray-900" >${title.slice(0,40)}${title.length>40 ? "..." : ""}</span> from cart?
      </h2>

      <p class="text-gray-500 text-sm mt-2">
        You will not be able to undo this action.
      </p>
    </div>
  `,
  showCancelButton: true,
  confirmButtonText: "Delete",
  cancelButtonText: "Cancel",
  buttonsStyling: false,
  customClass: {
    popup: "rounded-2xl shadow-lg p-0 border-0",
    htmlContainer: "p-6 m-0 rounded-2xl",
    actions: "px-6 pb-6 pt-0 gap-3",
    confirmButton: "bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer",
    cancelButton: "bg-gray-200 text-gray-800 px-6 py-2 rounded-lg cursor-pointer",
  }
});
    if(result.isConfirmed){
      dispatch(removeProduct({id}))
      await removeProductFromCart({ productId: id }) 
    }
    }

    const handleUpdateQuantity=async(newCount:number,type:'inc' | 'dec')=>{
      if (newCount<1) return;
      setLoadingType(type)
      try{
      const response = await updateProductQuantity({productId:id,count:newCount})
      dispatch(setCartInfo(response))
      }catch(error){
        console.log(error);
        
      }
      finally{
        setLoadingType(null)
      }
    }
    return (<>
        {/* Product Card */}  
        <div className="bg-white rounded-2xl p-6 flex gap-6 shadow-sm">

              {/* Image */}
              <div className="w-36 h-auto bg-gray-100 rounded-xl flex items-center justify-center">
                <Image
                  src={imageCover}
                  alt={title}
                  width={130}
                  height={130}
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {title}
                </h2>

                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full inline-block mt-2">
                  {category.name} 
                </span>
                <span className="text-xs text-gray-500">
                 {" "} • SKU {_id.slice(-6).toUpperCase()}
                </span>

                <p className="text-green-600 font-bold text-xl mt-3">
                  {price} EGP
                </p>

                {/* Quantity */}
                <div className="flex items-center justify-between gap-4 mt-4 ">
                  <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg p-1">
                    <button disabled={count<=1 || loadingType!== null} className="px-2 py-1.5 bg-white rounded-lg shadow-sm text-red-500 text-sm hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed" onClick={()=>handleUpdateQuantity(count-1,'dec')}>
                      {loadingType==='dec' ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      ) : (
                        <FontAwesomeIcon icon={faMinus} />
                      )}
                    </button>
                    <span className="px-4 text-lg">{count}</span>
                    <button disabled={count >= quantity || loadingType!== null} className="px-2 py-1.5 bg-green-600 text-white rounded-lg shadow-sm text-sm hover:bg-green-700 cursor-pointer disabled:cursor-not-allowed" onClick={()=>handleUpdateQuantity(count+1,'inc')}>
                      {loadingType==='inc' ? (
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                  {/* Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="font-bold text-xl">{price*count} {" "} <span className="text-gray-400 text-sm font-normal">EGP</span></p>
                  </div>
                  <button className="text-red-500" onClick={handleDeleteProduct}>
                    <FontAwesomeIcon icon={faTrash} className="bg-red-50 p-2.5 text-lg rounded-xl border border-red-300 cursor-pointer"/>
                  </button>
                  </div>
                </div>
              </div>


            </div>
        </>
    )
}