import { useState } from "react";
import { useForgotPasswordMutation } from "../../../redux/services/studentApi";
import "./Auth.css";

const ForgotPassword = () => {
  const [forgotPassword,{isLoading,isError}] = useForgotPasswordMutation();
  const [email,setEmail] = useState("");
  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
    const res = forgotPassword(email).unwrap();
    console.log(res);
    alert("Password reset link sent to your email");
    }
    catch(err){
      console.log(err); 
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtext">
          Enter your registered email to reset your password
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button type="submit" className="auth-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
