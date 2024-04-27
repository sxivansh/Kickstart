import { createSlice } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
const initialState = {
    setSearchQuery: '',
    cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): 
    [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};


const cartSlice = createSlice({
    initialState,
    name:"cart",
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
         
          },


        addToCart(state, action){
            //using an array method findIndex 
           // to find index 
           //then we will perform a check to check the product we are
           //trying to access? is it present in the cart or not
          const itemIndex =  state.cartItems.findIndex(
            (item) => item.id === action.payload.id);
            if(itemIndex>=0){
                state.cartItems[itemIndex] = {
                    ...state.cartItems[itemIndex],
                    cartQuantity: state.cartItems[itemIndex].cartQuantity +1,
                };
                toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity`,{
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
                })
            }
            else{
            const tempProduct = {...action.payload, cartQuantity: 1};
                // we are generating an action creater and handling the state at the same time.
            state.cartItems.push(tempProduct);  //action.payload is the porduct since here it will come from action.payload
            toast.success(`${action.payload.name} added to cart`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            })
            }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems)) ;       
},

removeFromCart(state, action) {
    const itemIdToRemove = action.payload.id;
    state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    toast.error(`${action.payload.name} removed from the cart`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
},
decreaseCart(state, action) {
    // getting the index for each item
    const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
    )

    if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`decreased ${action.payload.name} cart quantity`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
        })
    }
    else if(state.cartItems[itemIndex].cartQuantity === 1){
        const nextCartItems = state.cartItems.filter(
            cartItem => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error(`Product ${action.payload.name} removed from the cart`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
},
increaseCart(state, action){
  const itemIndex = state.cartItems.findIndex(
    cartItem  => cartItem.id === action.payload.id
  );
  if(itemIndex !== -1){
    state.cartItems[itemIndex] ={
        ...state.cartItems[itemIndex],
        cartQuantity: state.cartItems[itemIndex].cartQuantity + 1,
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
},
clearCart(state,action){
    state.cartItems = [];
   toast.error("Cart is cleared", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
transition: Bounce,
   })
   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
},
getTotals(state, action){
    //using reduce array method
   let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal
        cartTotal.quantity += cartQuantity

        return cartTotal;
    },{

        total: 0,
        quantity: 0,
})
state.cartTotalQuantity = quantity;
state.cartTotalAmount = total;
}
//reduce function accepts 2 parameters 
// the first one is a callback function and 
// the second one is an initial value, here initial value is an object containing total and quantity

}
   

})
export const {addToCart, removeFromCart, decreaseCart, increaseCart, clearCart, getTotals, setSearchQuery} = cartSlice.actions;
export default cartSlice.reducer;