
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/cartSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state=> state.cart.searchQuery)
  const{cartTotalQuantity} = useSelector(state => state.cart)
  const handleInputChange = (e) =>{
    dispatch(setSearchQuery(e.target.value));
    
 };
  



    return (
        <>
           
       <nav className="nav-bar">
        
        <Link to = "/">
          <div className='Brand-logo'>
        <h2>KickStart</h2>
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="40" height="40" viewBox="100 100 50 32"
        ><path fillRule="evenodd" 
          clipRule="evenodd" 
          d="M 150.07 131.439 L 131.925 100 L 122.206 105.606 L 137.112 131.439 L 150.07 131.439 Z M 132.781 131.439 L 120.797 110.692 L 111.078 116.298 L 119.823 131.439 L 132.781 131.439 Z M 109.718 121.401 L 115.509 131.439 L 102.551 131.439 L 100 127.007 L 109.718 121.401 Z" 
         fill="white"></path></svg>
         </div>
         
        </Link>
        <div className="Search-Bar">
          <div className='Search-Bar-sub'>
            <div className='input-wrapper'>
                 <input 
             type="text"
             placeholder="search" 
             value={searchQuery}
             onChange={handleInputChange}
         />

<svg xmlns="http://www.w3.org/2000/svg"
 width="18" height="18" fill="black" 
 className="bi bi-search" 
 viewBox="0 0 16 16">
  <path
   d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 
   0 0 0 1.415-1.414l-3.85-3.85a1 1 0 
   0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
</div>
</div>
</div>
        <Link to = '/cart'>
         
        <div className="nav-bag">
          <svg
           xmlns="http://www.w3.org/2000/svg" 
           width="40" height="40" 
           fill="currentColor" 
           className="bi bi-cart2" viewBox="0 0 16 16">
           <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
         </svg>
            
          <span className="bag-quantity"> 
            <span>{cartTotalQuantity}</span>    
          </span>

          </div>
          
        </Link>
           
        </nav>
      
        </>
      );
}
 
export default Nav;