import React ,{useState} from 'react'
import "./RegisterForm.css"
import { API_URL } from '../../../data/ApiPath'

const RegisterForm = ({showLoginHandler}) => {

  const [username ,setUsername] =useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword] =useState("");
  const [error,setError]=useState("");
  const [loader,setLoader] =useState(true);

  const submitHandler = async(event)=>{
    event.preventDefault();
try {
  const response = await fetch(`${API_URL}/vendor/register`,{
    method: "POST",
    headers : {
      'Content-Type':"application/json"
    },
    body:JSON.stringify({username, email, password})

  })
  const data = await response.json();
  console
  if(response.ok){
    console.log(data)
    setUsername("");
    setPassword("");
    setEmail("");
    alert("vendor Register Success");
    showLoginHandler()
    
  }
} catch (error) {
    console.error("registration failed",error)
    alert("registration failed")
}
  }
  return (
    <div className="RegisterSection">
        
        <form className='authForm' onSubmit={submitHandler}>
            <h3>Vendor Register</h3>
            <label>Username</label><br/>
            <input type='text' name='username' value={username} onChange={(event)=>setUsername(event.target.value)} placeholder='Enter your Username'/><br/>
            <label>Email</label><br/>
            <input type='text'name="email" value={email} onChange={(event)=>setEmail(event.target.value)}  placeholder='Enter your Email'/><br/>
            <label>Password</label><br/>
            <input type='password' name='password' value={password} onChange={(event)=>setPassword(event.target.value)} placeholder='Enter your Password'/><br/>
            <div className="btnSubmit">
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default RegisterForm;
