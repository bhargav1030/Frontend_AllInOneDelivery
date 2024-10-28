import React from 'react'
import "./SideBar.css"

const SideBar = ({showAddFirmHandler1,showAddProductHandler1,showAllProductsHandler1,showAddFirmInSideBar}) => {
    const loginToken =localStorage.getItem('loginToken');
  return (
    
    <div className="sideBarSection">
        {loginToken &&
        <ul>
            <li onClick={showAllProductsHandler1}>
                All Products
            </li>
            {showAddFirmInSideBar && <><li onClick={showAddFirmHandler1}>Add Firm</li></>}
            <li onClick={showAddProductHandler1}>
                Add Product
            </li>
            <li >
                User details
            </li>
        </ul>
        }
    </div>
  )
}

export default SideBar
