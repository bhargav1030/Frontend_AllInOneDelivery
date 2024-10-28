import React, {useState} from 'react';
import { API_URL } from '../../../data/ApiPath';
import "./AddProductForm.css";

const AddProductForm = () => {
  const [productName,setProductName] = useState("");
  const [price,setPrice] =useState("");
  const [category,setCategory]=useState([]);
  const [Description,setDescription] =useState("");
  const [image,setFile] = useState(null);

  const handleCategory=(event)=>{
    const value = event.target.value; 
    if (category.includes(value)){
      setCategory(category.filter((item)=> item !== value)) 
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleImageUpload =(event)=>{
    const selectedImage =event.target.files[0];
    setFile(selectedImage);
  }



  const handleProductSubmit = async(event) =>{
    event.preventDefault();
    try {
      const loginToken =localStorage.getItem('loginToken');
      const firmId =localStorage.getItem('firmId');
    if (!loginToken || !firmId){
      console.error("Something error")
    }
     const formData = new FormData();

      formData.append('productName',productName);
      formData.append('price',price);

      category.forEach((value)=>{
        formData.append('category',value)
      })
      console.log(category)
      formData.append('Description',Description);
      formData.append('image',image);

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body:formData
      });
      const data = await response.json()
      if (response.ok){
        alert("Product added succefully");
        setProductName("");
        setCategory([]);
        setDescription("");
        setFile(null);
        setPrice("")
      }
    } catch (error) {
      console.error(error);
      alert("Product added failed")
    }
  }
  return (
    <div className='addProductSection'>
        <form className="addProductForm" onSubmit={handleProductSubmit}>
            <h3>Add Product</h3>
            <label>Product Name</label><br/>
            <input text="text" onChange={(event)=>setProductName(event.target.value)} /><br/>
            <label>Price</label><br/>
            <input type="text" onChange={(event)=>setPrice(event.target.value)} /><br/>
            <div>Category</div>
            <div className="checkBoxCategory">
                <div className="checkBoxContainer">
                  <label>Food</label>
                  <input type="checkbox" value="Food" checked={category.includes("Food")} onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Fruits</label>
                  <input type="checkbox" value="Fruits" checked={category.includes("Fruits")} onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Electronics</label>
                  <input type="checkbox" value="Electronics" checked={category.includes("Electronics")} onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Repair</label>
                  <input type="checkbox" value="Repair" checked={category.includes("Repair")} onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Provision
                  </label>
                  <input type="checkbox" value="Provision" checked={category.includes("Provision")} onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Vegetable
                  </label>
                  <input type="checkbox" value="Vegetable" checked={category.includes("Vegetable")}  onChange={handleCategory}/>
                </div>  
                <div className="checkBoxContainer">
                  <label>Others</label>
                  <input type="checkbox" value="Others" checked={category.includes("Others")} onChange={handleCategory}/>
                </div> 
            </div>
            <label>Description</label><br/> 
            <input type="text" onChange={(event)=>setDescription(event.target.value)}/><br/>
            <label>Product Image</label><br/>
            <input  type="file" onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button type='submit'>
                    Submit
                </button>
            </div>

        </form>
        
    </div>
  )
}

export default AddProductForm
