import React, { useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
// import { Mycontext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
// import axios from "axios";
import toast from "react-hot-toast"
import { Axios } from "../App";
import axios from "axios";


function Signup() {
  // const { user, setuser } = useContext(Mycontext);
  const navigate = useNavigate();

  const register = async(event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const username = event.target.username.value.trim();
    const password = event.target.pwd.value.trim();

// console.log("name :",name);
// console.log("email :",email);
// console.log("username :",username);
// console.log("password :",password);

    if(name === "" || email === "" || username === "" || password === ""){
      toast("Please Fill All Input Fields")
    }
    try{
      const payload={name,email,username,password}
      // console.log(payload);
   
      const response = await Axios.post("api/users/register", payload);

      // console.log(response);
      if(response.status === 201){
        toast.success("Registration Successfull")
        navigate("/login")
      }
    }
    catch(error){
      console.log("Register Failed:",error);
    }
  };

  //   const emailvalid = user.filter((item) => item.email === email);
  //   if (emailvalid.length !== 0) {
  //     alert("Email already exists");
  //   } else {
  //     setuser([
  //       ...user,
  //       {
  //         name: name,
  //         email: email,
  //         password: password,
  //         re_password: repassword,
  //       },
  //     ]);
  //   }
  //   event.target.reset();
  // };






  return (
    <MDBContainer fluid>
      <MDBCard
        className="text-black m-3 m-md-5"
        style={{
          borderRadius: "25px",
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <form onSubmit={register}>
                <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4">
                  Sign up
                </h3>

                <div className="mb-4">
                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      label="Your Name"
                      id="name"
                      type="text"
                      className="w-100"
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      label="Your Email"
                      id="email"
                      type="email"
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput
                      label="username"
                      id="username"
                      type="text"
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Password"
                      id="pwd"
                      type="password"
                      required
                    />
                  </div>

                </div>

                <MDBBtn
                  className="mb-4 ms-4"
                  size="lg"
                  type="submit"
                  // onClick={() => navigate("/login")}
                >
                  Register
                </MDBBtn>
                <p className="ms-4">
                  or <Link to={"/login"}>Login</Link>
                </p>
              </form>
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src={require("../components/products/images/cover15new.jpg")}
                style={{ borderRadius: "20px" }}
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <div className="mt-3">
        <Footer />
      </div>
    </MDBContainer>
  );
}

export default Signup;
