import React, {useState} from 'react';
import "./LoginForm.css";
import { API_URL } from '../../../data/ApiPath';

const LoginForm = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const loginHandler = async(event)=>{
    event.preventDefault();
  try {
    
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify({email,password})
      }
    );
    const data =await response.json();
    if(response.ok){
      console.log(data);
      alert("Login Success");
      localStorage.setItem("loginToken",data.token);
      localStorage.setItem('firmId',data.vendorFirmId);
      setEmail('');
      setPassword('');
     
    }
    const firmId =localStorage.getItem('firmId')
    console.log(firmId)
    const vendorId =data.vendorId;
    console.log('checking vendor id',vendorId);
    const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
    const vendorData = await  vendorResponse.json();
    if (vendorResponse.ok){
      if(firmId !=='undefined'){
        const firmName = vendorData.vendor.firm[0].firmName
         localStorage.setItem('firmName',firmName);
      }
      window.location.reload();
    }  
  }  
  catch (error) {
    console.error(error);
    alert("login failed");    
  }
}
  return (
    <div className="loginSection">
        
        <form className='authForm' onSubmit={loginHandler}>
            <h3>Vendor Login</h3>
            <label>Email</label><br/>
            <input type='text' name='email' value={email} onChange={(event)=>setEmail(event.target.value)}  placeholder='Enter your Email'/><br/>
            <label>Password</label><br/>
            <input type='password' name='password'value={password}  onChange={(event)=>setPassword(event.target.value)} placeholder='Enter your Password'/><br/>
            <div className="btnSubmit">
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default LoginForm
