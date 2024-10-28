import React from 'react'
import "./LandingPage.css"
import { useState, useEffect } from 'react'
import NavBar from '../../components/navBar/NavBar'
import SideBar from '../../components/sideBar/SideBar'
import LoginForm from '../../components/forms/loginForm/LoginForm'
import RegisterForm from '../../components/forms/registerForm/RegisterForm'
import AddFirmForm from '../../components/forms/addFirmForm/AddFirmForm'
import AddProductForm from '../../components/forms/addProductForm/AddProductForm'
import AllProducts from '../../components/allProducts/AllProducts'

const LandingPage = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [showRegister,setShowRegister] =useState(false)
  const [showAddFirm,setShowAddFirm]=useState(false)
  const [showAddProduct,setShowAddProduct]= useState(false)
  const [showAllProducts,setShowAllProducts] = useState(false)
  const [showLogOut,setShowLogOut] =useState(false)
  const [showAddFirmInSideBar,setShowAddFirmInSideBar]=useState(true)


  const logOutHandler =() =>{
    confirm('Are you sure,You want to LogOut')
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName')
    setShowLogOut(false)
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false)
    setShowAddFirmInSideBar(true)
  }

  useEffect(()=>{
    const token=localStorage.getItem('loginToken');
    
    if(token){
      setShowLogOut(true)
     
    }
  },[])

  useEffect(()=>{
    const firmId=localStorage.getItem('firmId');

    if(firmId && firmId !=='undefined'){
      setShowAddFirmInSideBar(false)
    }
  },[])


  const showLoginHandler = () =>{
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false)  
  }

  const showRegisterHandler =() =>{
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false)  
  }


  const showAddFirmHandler=()=>{
    setShowAddFirm(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowAddProduct(false);
    setShowAllProducts(false)  
  }

  const showAddProductHandler = () =>{
    setShowAddProduct(true);
    setShowAddFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowAllProducts(false)  
  }

  const showAllProductsHandler=()=>{
    setShowAddProduct(false);
    setShowAddFirm(false);
    setShowRegister(false);
    setShowLogin(false); 
    setShowAllProducts(true)  
  }
    return (
    <div>
        <NavBar showLoginHandler1={showLoginHandler} showRegisterHandler1 ={showRegisterHandler} showLogOut={showLogOut} logOutHandler1={logOutHandler}/>
      <div className="sideBarAndMainSection">
        <SideBar showAddFirmHandler1={showAddFirmHandler} showAddProductHandler1 ={showAddProductHandler} showAddFirmInSideBar={showAddFirmInSideBar} showAllProductsHandler1={showAllProductsHandler}/>
        {showLogin && <LoginForm/>}
        {showRegister && <RegisterForm showLoginHandler={showLoginHandler} />}
        {showAddFirm && <AddFirmForm/>}
        {showAddProduct && <AddProductForm/>}
        {showAllProducts && <AllProducts/>}
      </div>
      
    </div>
  )
}

export default LandingPage
