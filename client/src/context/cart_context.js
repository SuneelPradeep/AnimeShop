import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from '../reducer/cartReducer'

const cartContext = createContext()

 const getLocalCartData = ()=>{
    let data = localStorage.getItem("CartValues")
//     if(data?.length===0 || data===undefined || data===null || data ==='' || data==='null'){
//      return  [] ;}
//       else{ 
        const parsedData = JSON.parse(data)
       if(!Array.isArray(parsedData)) return [] 
         return parsedData;
 }
const initialState = {
    cart : getLocalCartData(), 
    total_items : 0,
    total_amount : 0,
    shipping : 50000,
    
}
const CartContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(cartReducer,initialState)
   
    const AddToCart = (id,color,amount,product)=>{
        dispatch({type : 'GET_ALL_CART_ITEMS',payload : {id,color,amount,product}})
    }
    const removeItem = (id)=>{
        dispatch({type: "REMOVE_ITEM", payload: id  })
    }
    const clearCart = ()=>{
        dispatch({type: 'CLEAR_CART',payload: initialState})
    }
    const IncDecQuantity = (id,str)=>{
        dispatch({type: 'INCR_DECR_QUANTITY', payload : {id,str}})
    }

     useEffect(()=>{
        dispatch({type: 'UPDATE_TOTAL_ITEMS_AND_PRICE',payload: state.cart})
localStorage.setItem("CartValues", JSON.stringify(state.cart))
     },[state.cart])

    return (
    <cartContext.Provider value={{...state,AddToCart,removeItem,clearCart,IncDecQuantity}}>
        {children}
    </cartContext.Provider>
    )
}

const useCartContext = ()=>{
    return useContext(cartContext);
}
export {useCartContext,CartContextProvider}