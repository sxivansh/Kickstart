// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import{ useNavigate } from 'react-router-dom'
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";
// import { SearchQuery} from './SearchBar';
import 'react-toastify/dist/ReactToastify.css';




const Home = () => {
     const products = useSelector(state => state.cart.products);
  
 // const{items, state}  = useSelector(state => state.products
 
  const{ data, error, isLoading } =   useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector(state => state.cart.searchQuery);
    
  
  const filteredProducts = data?.filter(product =>
     product.name && searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
 );

  function handleAddToCart(product){
       //dispatching the action creater addToCart 
       //how we can dispatch?
       // we can use a hook useDispatch

     dispatch(addToCart(product));
    //  console.log(product)
    navigate("/cart");
  }

    return ( 
        <>  
        
        <div className="home-container">

            { isLoading?  (<p>Loading...</p>): error? (
            <p>An error occured </p>) :( <>
             <h2>New Arrivals</h2>
             <div className="products">
                {filteredProducts.map(product => <div key={product.id} className="product">
                    <h3>{product.name}</h3>
                    <img src={product.image} alt= {product.name}/>
                    <div className="details">
                        <span className="details-sub">{product.description}</span>
                        <span className="price">${product.price}</span>
                    </div>
                    <button onClick = {()=> handleAddToCart(product)}>Add to Cart</button>
                </div>)}
             </div>
            
            </>)}
            
        </div>
        </>
     );
}
 
export default Home;