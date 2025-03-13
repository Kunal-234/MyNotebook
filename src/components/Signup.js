import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export default function Signup() {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,cpassword }=credentials;
    if(password===cpassword){

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password:password,
      }),
    });
    const json = await response.json();
    console.log(json);

  if (json.success) {
    localStorage.setItem("token", json.authtoken);
    navigate("/");
  } else alert("User with this email already exist");
}
else{
  alert("confirm your password correctly")
}
}

  return (
    <div className="container">

    <div className="container my-4 px-4">
      <h1 className="mb-4">Sign up Here</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            minLength={3}
            name="name"
            onChange={onChange}
            aria-describedby="textHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            minLength={5}
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            minLength={5}
            name="cpassword"
            id="cpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn my-3 btn-primary">
          Sign up
        </button>
        <div>
          {" "}
          <small>Already have an account? </small>
          <NavLink to="/login">Log in </NavLink>
        </div>
      </form>
    </div>
    </div>
  );
}
