import React, {useState,useEffect} from 'react';
import './AllProducts.css';
import { API_URL } from '../../data/ApiPath';
const AllProducts = () => {
    const [products,setProducts] = useState([]);
    
  
    const allProductsFunction = async()=>{
      const firmId =localStorage.getItem('firmId'); 
      try {
        const response = await fetch(`${API_URL}/product/${firmId}/products`);
        const data =await response.json()
        setProducts(data.products)
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch the Products',error)
        alert('Failed to fetch the Products')
      }

    }
    useEffect(()=>{
      allProductsFunction();
      console.log("use effect used");
    },[])

  const deleteProductById = async(productId)=>{
    try {   
      const response = await fetch(`${API_URL}/product/${productId}`,{ 
          method: 'DELETE'
        }) 
        if(response.ok){
          console.log("sanelo")
          setProducts(products.filter(product=>product._id !== productId));  
          alert("product deleted successfully")                     
         
        }
    } catch (error) {
      console.error(error)
      console.log("yub")
      alert('Failed to delete Product')
    }
  }

  return (
    <div>
    {!products ?(<p>No product Added</p>):(
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>price</th>
            <th>image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {products.map((item)=>{
              return(
                <>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>{item.image && (<img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} style={{width:"50px",height:"50px"}}/>)}</td>
                    <td>
                      <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                    </td>
                  </tr> 
                  </>
              )

            })}
        </tbody>

      </table>
    )}      
    </div>
  )
}

export default AllProducts
