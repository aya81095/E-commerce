"use client";
import { Provider } from "react-redux";
import { ReactNode, useRef } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { createStore, preloadedState } from "../../store/store";
import { AppStore } from "../../store/store";
type providerProps = {
    children:ReactNode;
    preloadedState:preloadedState;
}

export default function Providers({children,preloadedState}:providerProps){
    const storeRef = useRef<null|AppStore>(null)

    if(!storeRef.current){
        storeRef.current = createStore(preloadedState);
    }
    
    return(
        <>
        <Provider store={storeRef.current}>
            {children}
            <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </Provider>
        </>
    )
}