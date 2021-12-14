import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.scss";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setpassword] = useState("");
  const [me, setMe] = useContext(AuthContext);
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.patch("/users/login", { userId, password });
      setMe({
        username: result.data.username,
        sessionId: result.data.sessionId,
        _id: result.data._id,
        userId: result.data.userId,
      });
      console.log(me);
      toast.success("Login Success");
      navigate("/main");
    } catch (e) {
      console.error(e.response);
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="loginWrap">
      <h3>Login</h3>
      <form onSubmit={loginSubmit}>
        <CustomInput placeholder="ID" value={userId} setValue={setUserId} />
        <CustomInput placeholder="Password" value={password} setValue={setpassword} />

        <button type="submit">로그인</button>
        <Link to="/register" className="registerLink">회원가입</Link>
      </form>
    </div>
  );
}

export default Login;
