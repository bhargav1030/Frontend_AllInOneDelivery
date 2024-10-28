import React from 'react'
import "./NavBar.css"
const NavBar = ({showLoginHandler1,showRegisterHandler1,logOutHandler1,showLogOut}) => {

  const firmName = localStorage.getItem('firmName')
  return (
    <>
    <div className='navSection1'>
        <div className='navSection'>
            <div className='Company'>
              AllInOne
            </div> 
        {firmName &&
        <div className="firmName">  
            FirmName:{firmName} 
        </div>
        }
        <div className='UserAuth'>
          {!showLogOut ?<><span onClick={showLoginHandler1}>login / </span>
            <span onClick={showRegisterHandler1}>Register</span></>
            :<span onClick={logOutHandler1}>logout</span>}
        </div>
        </div>
    </div>
    </>
  )
}

export default NavBar
