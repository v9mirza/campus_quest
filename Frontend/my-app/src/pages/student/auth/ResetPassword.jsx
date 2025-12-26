import { useState } from "react";
import { useResetPasswordMutation } from "../../../redux/services/studentApi";
import "./Auth.css";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const Navigate = useNavigate();
  const [newPassword,setNewPassword]=useState("");
  const [confirmPass,setConfirmPass] = useState("");
  const [err,setErr] = useState("");
  const [msg,setMsg]=useState("");
 const [resetPassword,{isLoading,isError}]=useResetPasswordMutation();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
if(newPassword !== confirmPass){
  setMsg("Confirm Password is not matching");
}
 const res = await resetPassword({token,newPassword});
  if(res.data){
   setTimeout(() => {
    setMsg("Redirecting to Login....")
  Navigate('/student/login');
}, 2000); 
  }
  }catch(err){
setErr(err);
  }
}

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtext">
          Enter your new password
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="auth-input"
            placeholder="New password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Confirm new password"
            value={confirmPass}
            onChange={(e)=>setConfirmPass(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Reset Password
          </button>
          <p className="err">{err}</p>
          <p className="msg">{msg}</p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
