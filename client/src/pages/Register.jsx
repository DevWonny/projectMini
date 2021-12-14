import React, { useState, useContext } from 'react';
import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
    <div>
      <h3>회원가입</h3>
      <form style={{display:"flex", flexDirection:"column", margin : "30px"}} onSubmit={registerSubmit}>
        <CustomInput label="ID" value={userId} setValue={setUserId} />
        <CustomInput label="NAME" value={username} setValue={setUsername} />
        <CustomInput label="PASSWORD" value ={password} setValue={setPassword} />
        <CustomInput label="PASSWORDCAHECK" value={passwordCheck} setValue={setPasswordCheck} />
        
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default Register;