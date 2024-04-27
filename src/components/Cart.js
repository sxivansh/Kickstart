import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import {useState} from 'react';
import {Link} from 'react-router-dom';
import { clearCart, decreaseCart, getTotals, increaseCart, removeFromCart } from "../features/cartSlice";
const Cart = () => {
// const [isOpen, setIsOpen] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(getTotals());
    }, [cart, dispatch]);
    function handleRemoveFromCart(cartItem) {
     dispatch(removeFromCart(cartItem))
    }
    function handleDecreaseCart(cartItem) {
        dispatch(decreaseCart(cartItem));
    }
    function handleIncreaseCart(cartItem){
        dispatch(increaseCart(cartItem));
    }
    function handleClearCart(){
        dispatch(clearCart());
    }
    return ( 
        <>
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.cartItems.length === 0 ?(
                <div className="cart-empty"> 
                <p>Your cart is currently empty</p> 
                
                    <div className="start-shopping">
                        <Link  to = "/">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" height="20" 
                        fill="currentColor" 
                        className="bi bi-arrow-left" viewBox="0 0 16 16">
                     <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                        <span>start shopping</span>
                        </Link>
                    </div>
                </div>):(
                    <div>
                        <div className="titles">
                           <h3 className="product-title">Product</h3> 
                           <h3 className="price">Price</h3>
                           <h3 className="quantity">Quantity</h3>
                           <h3 className="Total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {/* now mapping the items of cart */}
                            {cart.cartItems &&
                            cart.cartItems?.map((cartItem) =>(
                                <div className="cart-item" key={cartItem.id}>
                                    <div className="cart-product"> 
                                    <img src={cartItem.image} alt={cartItem.name}/>
                                    <div>
                                        <h3>{cartItem.name}</h3>
                                        <p>{cartItem.description}</p>
                                        <button onClick={()=> handleRemoveFromCart(cartItem)}>Remove</button>
                                    </div>
                                </div>
                            <div className="cart-product-price">{cartItem.price}₹</div>  
                            <div className="cart-product-quantity">
                            {/* this one is little differnt because here you'll have a plus button and a minus button to add and remove items from the cart by one and the functionalities will be under a round square  */}
                            <button onClick={() => handleDecreaseCart(cartItem) }>-</button>
                            <div className="count">{cartItem.cartQuantity}</div>
                            <button onClick={()=> handleIncreaseCart(cartItem)}>+</button>
                            </div>      
                        <div className="cart-product-total-price">
                            {cartItem.price * cartItem.cartQuantity}₹
                        </div>

                        </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <button className="clear-cart" onClick={()=> handleClearCart()}> Clear cart</button>
                            <div className="cart-checkout">
                              <div className="sub-total">
                                <span>Subtotal</span>
                                <span className="amount">{cart.cartTotalAmount}</span>
                              </div>  
                              <p>Taxes and Shipping calculated at checkout </p>
                              <button> Check out</button>

                              <div className="continue-shopping">
                        <Link  to = "/">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" height="20" 
                        fill="currentColor" 
                        className="bi bi-arrow-left" viewBox="0 0 16 16">
                     <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                        <span>Continue shopping</span>
                        </Link>
                    </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
        {/* <h1>Cart Component</h1> */}
        </>
    );
}
 
export default Cart;