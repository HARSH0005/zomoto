import{useNavigate} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2'



 
function Header(props) {
  
  
  let navigate = useNavigate();

  let getTokenDetails =()=>{
   let token = localStorage.getItem('auth-token')
   if(token===null){
    return false;
   }else{
    return jwt_decode(token);
   }

  };

  let [userLogin,setUserLogin] = useState(getTokenDetails());
  

  let onSuccess= (credentialResponse)=>{
    let token = credentialResponse.credential;


   
    localStorage.setItem('auth-token',token);
    // alert("User Login successfully");
    Swal.fire({
      icon: 'success',
      title: 'Login Successfuly',
      text: 'Welcome to zomato',
    }).then(()=>{
      window.location.reload();
    });
    
  };
  let onError=()=>{
    // alert("Login Fail");
    Swal.fire({
      icon: 'error',
      title: 'opps...',
      text: 'Login Fail Try Again',
    });

  }
  console.log(userLogin);

  let logout=()=>{

    Swal.fire({
      title: 'Are you sure to logout?',
      text: "Have a good time",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth-token")
   
        window.location.reload();
        
      }
    })

   

  };


    return (
      <>
<GoogleOAuthProvider clientId="16591387286-a5qhv7bdedb2fcq0e7hisl32i0fhsbfr.apps.googleusercontent.com">

<div className="modal fade" id="google-sign-in" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">



  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Google Sign-In</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
                    <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
              />;
      </div>
    </div>
  </div>
</div>

          <div className={"row justify-content-center "+ props.color}>
        <div className="col-10 d-flex justify-content-between py-2">
          <p className="m-0 brand hand "onClick={()=>navigate("/")}>e!</p>
          {userLogin ? (<div> 
            <div>
                                <span className='fs-5  text-white fw-bold loginmr'>Welcome ,{userLogin.given_name}</span>
                                {/* <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#google-sign-in">{}</button> */}
                                <button className="btn btn-outline-light ms-2"onClick={logout}>
                                  <i className="fa fa-exit" aria-hidden="true"></i>Logout
                                </button>  
                              </div>
          </div>): (
                              <div>
                                <button className="btn text-white loginmr" data-bs-toggle="modal" data-bs-target="#google-sign-in">Login</button>
                                <button className="btn btn-outline-light">
                                  <i className="fa fa-search" aria-hidden="true"></i>Create a
                                  Account
                                </button>  
                              </div>
          )};
        </div>
      </div>
      </GoogleOAuthProvider>;
      </>
    );
  }
  
  export default Header;
  