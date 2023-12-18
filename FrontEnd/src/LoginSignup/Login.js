import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Axios } from "../App";




function Login() {
  const navigate = useNavigate();

  const login = async(e) => {
    e.preventDefault();
    const eml = e.target.email.value.trim();
    const password = e.target.pwd.value;
    const Adminemail=process.env.REACT_APP_ADMIN_EMAIL
    // console.log(Adminemail)

    if(eml === "" || password === ""){
      toast.error("Inuput Field is Empty")
      return;
    }
    let url="http://localhost:3003/api/users/login"

    if(eml === Adminemail ){
        url="http://localhost:3003/api/admin/login";
    }
    try {  
      const payload= {email:eml,password};
      const response=await Axios.post(url,payload)
      // console.log(response)

      if(response.status === 200){
        eml === Adminemail && localStorage.setItem("role","admin")
        eml === Adminemail && localStorage.setItem("Admin jwt",response.data.data)
        eml !== Adminemail && localStorage.setItem("UserId",response.data.data.id)
        localStorage.setItem("jwt",response.data.data.Token)
        localStorage.setItem("UserEmail",response.data.data.email)
        localStorage.setItem("UserName",response.data.data.Username)

        // console.log(Adminemail)
        // console.log(response.data.data.id)
        // console.log(response.data.data.Token)
        // console.log(response.data.data.email)
        // console.log(response.data.data.Username)
        // console.log(response.data.data)

        if(eml === Adminemail){
          navigate("/adminhome/")
          toast.success("Admin Login Successfull")
        }else{
          setTimeout(()=>{
            localStorage.removeItem("jwt")
            localStorage.removeItem("UserId")
            localStorage.removeItem("UserEmail")
            localStorage.removeItem("UserName")
            localStorage.removeItem("Admin jwt")

          },3600000)
          navigate("/")
          toast.success("Login Successfull")
        }  
      }else{
        toast.error("Login Failed:",response.error)
       
      }
    }catch(error){
      console.log("err:",error)
      toast.error("Invalid EMAIL or PASSWORD")
    }
  };

  return (
    <div>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard
              className="my-5 bg-glass"
              style={{
                boxshadow:
                  "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
              }}
            >
              <MDBCardBody className="p-5">
                <h3 className="text-center mb-5">LOGIN</h3>
                <form onSubmit={login} className="w-auto">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="email"
                    type="email"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="pwd"
                    type="password"
                    required
                  />
                  <MDBBtn className="w-100 mb-4" size="md">
                    sign in
                  </MDBBtn>

                  <div className="text-center">
                    <p>
                      {" "}
                      Not a member? <Link to={"/signup"}>sign up</Link>
                    </p>
                    <p className="mb-5">
                      <Link to={"/"}>
                        <MDBBtn className="btn-success">Home</MDBBtn>
                      </Link>
                    </p>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offers <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your Happiness
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Welcome to our WILD WOOD GALLERY family, where style meets
              convenience, and your dream home is just a click away! Our login
              page is not just a gateway to your furniture shopping adventure;
              it's a visual treat that sets the tone for the incredible
              experience that awaits you.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}


export default Login;
