import React, { useState, useContext } from 'react';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./Register.scss";

function Register() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [, setMe] = useContext(AuthContext);
  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    try {
      e.preventDefault();  
      if (password !== passwordCheck) throw new Error("비밀번호를 확인해주세요!");

      const result = await axios.post("/users/register", { userId, username, password })
      setMe({ _id: result.data._id, sessionId: result.data.sessionId, username: result.data.username, userId:result.data.userId });
      toast.success("register Success");
      navigate("/main");
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  }
  return (
    <div className='registerWrap'>
      <h3>회원가입</h3>
      <form onSubmit={registerSubmit}>
        <CustomInput placeholder="ID" value={userId} setValue={setUserId} />
        <CustomInput placeholder="NAME" value={username} setValue={setUsername} />
        <CustomInput placeholder="PASSWORD" value ={password} setValue={setPassword} />
        <CustomInput placeholder="PASSWORD CAHECK" value={passwordCheck} setValue={setPasswordCheck} />
        
        <button type="submit">회원가입</button>
        <Link to="/" className="toLogin">로그인</Link>
      </form>
    </div>
  )
}

export default Register;