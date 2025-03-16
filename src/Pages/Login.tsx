import React from "react";

function Login() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
       style={{backgroundImage: "url('../../public/field-background.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
      >
        <div className="d-flex flex-column align-items-center justify-content-center rounded border-1 w-100 w-md-50 w-lg-25" style={{ boxShadow: "rgba(109, 183, 29, 0.5) 0px 5px 15px", backgroundColor: "rgb(230, 229, 153, 0.7)",maxWidth: "350px"}} >
          <img className="w-50 py-3" src="../../public/green-shadow.png" alt="" />
          <input type="text" placeholder="Username" className="mb-3 rounded form-control w-75" />

          <input type="password" placeholder="Password" className="mb-3 rounded form-control w-75" />

          <button className="btn btn-success w-75 mb-3">Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;
