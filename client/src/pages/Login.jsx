import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
        userId : result.data.userId,
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
    <div>
      <h3>Login</h3>
      <form
        style={{ display: "flex", flexDirection: "column", margin: "30px" }}
        onSubmit={loginSubmit}
      >
        <CustomInput label="ID" value={userId} setValue={setUserId} />
        <CustomInput label="PASSWORD" value={password} setValue={setpassword} />

        <button type="submit">로그인</button>
        <Link to="/register">회원가입</Link>
      </form>
    </div>
  );
}

export default Login;
