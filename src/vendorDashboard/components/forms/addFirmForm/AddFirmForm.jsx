import React, {useState} from 'react'
import { API_URL } from '../../../data/ApiPath';
import "./AddFirmForm.css";

const AddFirmForm = () => {
  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState([]);
  const [offer,setOffer] = useState("");
  const [file,setFile] = useState(null);

  
  const handleCategory = (event) =>{
   const value =event.target.value
    if (category.includes(value)){
      setCategory(category.filter((item)=>item !== value));
    }else{
      setCategory([...category,value])
    }
  }


  const handleImageUpload =(event)=>{
    const selectedImage =event.target.files[0];
    setFile(selectedImage);
  }


  const handleFirmSubmit=async(event)=>{
    event.preventDefault();
    try {   
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken){
        console.error("invalid Token");
      }
      const formData = new FormData();
      formData.append('firmName',firmName); 
      formData.append('area',area);
      formData.append('offer',offer);
      category.forEach((value)=>{
        formData.append('category',value)
      });
      formData.append('image',file);
      const response =await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });
      const data = await response.json();
      if(response.ok){
        console.log(data);
        localStorage.setItem('firmId',data.firmId)
        localStorage.setItem('firmName',data.firmName)
        setFirmName('');
        setArea('');
        setCategory([]);
        setOffer('');
        setFile(null);
        alert("Firm added successfully")
        window.location.reload(); 
      }else if(data.message === 'add only one firm'){
        alert("Failed - Only one Firm added")
      }else{
        alert('Failed to add firm')
      }
    } catch (error) {
      console.error(error);
    }
    }
  return (
    <div className='addFrimSection'>
        <form className="addFirmForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label><br/>
            <input text="text" value={firmName} onChange={(event)=>setFirmName(event.target.value)} /><br/>
            <label>Area</label><br/>
            <input type="text" value={area} onChange={(event)=>setArea(event.target.value)}/><br/>
            <div>Category</div>
            <div className="checkBoxCategory">
                <div className="checkBoxContainer">
                  <label>Provision</label>
                  <input type="checkbox" checked={category.includes('Provision')} value="Provision" onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Food</label>
                  <input type="checkbox" checked={category.includes('Food')} value="Food" onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Repair</label>
                  <input type="checkbox" checked={category.includes('Repair')} value="Repair" onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Electronics</label>
                  <input type="checkbox" checked={category.includes('Electronics')} value="Electronics" onChange={handleCategory}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Vegetables</label>
                  <input type="checkbox" checked={category.includes('Vegetables')} value="Vegetables" onChange={handleCategory}/>
                </div>  
                <div className="checkBoxContainer">
                  <label>Others</label>
                  <input type="checkbox" checked={category.includes('Other')} value="Other" onChange={handleCategory} />
                </div> 
            </div>
            <label>Offer</label><br/>
            <input type="text" value={offer} onChange={(event)=>setOffer(event.target.value)}/><br/>
            <label>Firm Image</label><br/>
            <input type="file" onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button>
                    Submit
                </button>
            </div>

        </form>
        
    </div>
  )

}

export default AddFirmForm
