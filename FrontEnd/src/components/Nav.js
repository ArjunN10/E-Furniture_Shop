import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { FaHeartCircleExclamation } from "react-icons/fa6"
import { FaRightToBracket } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { Mycontext } from "../context/Context";
import Search from "./products/Search";
import { useEffect } from "react";

function Nav() {
  const { username, setusername,loggedIn, setLoggedIn } = useContext(Mycontext);
  // console.log(loggedIn)
  const [showBasic, setShowBasic] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const storedUsername = localStorage.getItem('UserName');
    // console.log(storedUsername)
    if (storedUsername) {
      // If UserName is found in local storage, set loggedIn to true
      setLoggedIn(true);
      setusername(storedUsername);
    } else {
      // If UserName is not found, set loggedIn to false
      setLoggedIn(false);
    }
  }, [setLoggedIn, setusername]);

  const navcart = () => {
    if (loggedIn) {
      navigate("/addcart");
    } else {
      alert("Login to your account");
    }
  };
  

  const handleLogout = () => {
    // Clear the username from local storage on logout
    localStorage.removeItem('UserName');
    setusername('');
    localStorage.removeItem("jwt")
    localStorage.removeItem("UserId")
    localStorage.removeItem("UserEmail")
    setLoggedIn(!loggedIn);
  };

  return (
    <>
    <MDBNavbar expand="lg" light bgColor="light" className="my-4">
      <MDBContainer fluid>
        <MDBNavbarBrand className="mb-lg-0 me-4">
              <img
                   src={require("../components/products/images/logoicon.jpg")}  
                  alt="Shop Logo"
                  className="img-fluid"
                  style={{ maxWidth: "70px" }}
                />
             <h5 style={{ fontFamily: "cursive" }}>
                  WILD  &nbsp;WOOD <br />
                    GALLERY
                </h5>

        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-lg-1">
            <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                style={{ fontFamily: "cursive" }}
                onClick={() => navigate("/")}
                href="#home"
              >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink onClick={() => navigate("/allproducts")} >
                Products
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
  <MDBDropdown>
    <MDBDropdownToggle
      tag='a'
      className="nav-link"
      style={{ fontFamily: "cursive" }}
      role="button"
    >
      Categories
    </MDBDropdownToggle>
    <MDBDropdownMenu className="text-center">
      <MDBDropdownItem onClick={() => navigate("/table")}>
      <img
          src="https://img.icons8.com/?size=2x&id=30190&format=png"
          alt="icon"
          className="img-fluid " 
          style={{ maxWidth: '20px', height: 'auto' }}
        />
       
        Tables
      </MDBDropdownItem>
      <MDBDropdownItem onClick={() => navigate("/bed")}>
      <img
          src="https://img.icons8.com/?size=2x&id=zVuzYLxp4Euc&format=png"
          alt="icon"
          className="img-fluid " 
          style={{ maxWidth: '20px', height: 'auto' }}
        />
        Beds
      </MDBDropdownItem>
      <MDBDropdownItem onClick={() => navigate("/sofa")}>
      <img
          src="https://img.icons8.com/?size=2x&id=80481&format=png"
          alt="icon"
          className="img-fluid " 
          style={{ maxWidth: '20px', height: 'auto' }}
        />
        Sofas
      </MDBDropdownItem>
      <MDBDropdownItem onClick={() => navigate("/chair")}>
      <img
          src="https://img.icons8.com/?size=2x&id=kLCDEKFEmsPz&format=png"
          alt="icon"
          className="img-fluid " 
          style={{ maxWidth: '20px', height: 'auto' }}
        />
        Chairs
      </MDBDropdownItem>
      <MDBDropdownItem onClick={() => navigate("/wardrobe")}>
      <img
          src="https://img.icons8.com/?size=2x&id=81148&format=png"
          alt="icon"
          className="img-fluid " 
          style={{ maxWidth: '20px', height: 'auto' }}
        />
        Wardrobes
      </MDBDropdownItem>
    </MDBDropdownMenu>
  </MDBDropdown>
</MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>

      <MDBContainer fluid className="justify-content-center me-5">
        <div>
          <Search />
        </div>
        {!loggedIn ? (
          <div className="d-flex">
            <MDBBtn
              outline
              rippleColor="success"
              color="success"
              onClick={() => navigate("/login")}
              className="me-2"
              type="button"
            >
              Login
            </MDBBtn>
          </div>
        ) : (
          <div className="d-flex">
            <MDBBtn
              outline
              rippleColor="secondary"
              color="secondary"
              onClick={handleLogout}
              className="me-2"
              type="button"
              style={{height:60}}
            >
              Logout
            </MDBBtn>
            <MDBNavbarBrand className="me-2 " href="#">
              <MDBBtn className="btn btn-white" onClick={() => navcart()}>
                <img
                  src="https://img.icons8.com/?size=2x&id=TdZUZUq3XNh6&format=gif"
                  alt="cart"
                  className="img-fluid"
                />
                <MDBNavbarLink>Cart</MDBNavbarLink>
              </MDBBtn>
            </MDBNavbarBrand>
          </div>
        )}
        <MDBDropdown className='btn-group'  >
      <MDBDropdownToggle split style={{ backgroundColor: 'white',padding:0  }}>
      <MDBBtn className="btn btn-white ">
         <FaUser style={{fontSize:"30px "}}/>
         <br/>
          {username}
        </MDBBtn>
      </MDBDropdownToggle>
      <MDBDropdownMenu>
      <MDBDropdownItem className=" ms-5">
      <FaRightToBracket className="me-1"/>
      {username}
          </MDBDropdownItem>
        <MDBDropdownItem onClick={()=>navigate('/wishlist')} className=" ms-5"> 
        <FaHeartCircleExclamation />
                Wishlist
        </MDBDropdownItem>
        {/* <MDBDropdownItem className=" ms-5">
        <GoDotFill />
                  My Orders
          </MDBDropdownItem> */}
      </MDBDropdownMenu>
    </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>
    </>
  );
}

export default Nav;
