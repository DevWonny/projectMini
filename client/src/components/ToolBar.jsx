import React,{useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './ToolBar.scss';

function ToolBar() {
  const [me, setMe] = useContext(AuthContext);
  const { imageId } = useParams();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.patch("/users/logout");
      setMe();
      toast.success("Logout!");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  }
  return (
    <div className="toolbarWrap">
      <h3 className="toolbarTitle">{imageId ? <Link to="/main" className='toHome'>{`Personal Page - ${imageId}`}</Link> : "Personal Page"}</h3>
      <div className="memberBox">
        <span className='memberName'>{me? `환영합니다. ${me.username}님` : "Who?" }</span>
        <span className="logout" onClick={logoutHandler}>로그아웃</span>
      </div>
    </div>
  )
}

export default ToolBar;