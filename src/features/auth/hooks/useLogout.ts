import { useDispatch } from "react-redux";
import { setAuthInfo } from "../store/auth.slice";
import { removeToken } from "../server/auth.actions";
import { useRouter } from "next/navigation";

export default function useLogout(){
 const dispatch = useDispatch();
 const router = useRouter();
 const Logout = async () => {
    await removeToken();
    dispatch(setAuthInfo({isAuthenticated:false,userInfo:null}))
    router.push("/login");
    router.refresh();
 }
 return {Logout};
    
}