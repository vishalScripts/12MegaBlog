import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { deletePosts } from "../../store/postsSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then((res) => {
      dispatch(logout());
      dispatch(deletePosts());
      console.log("working here")
      navigate("/login")
    });
  };
  return (
    <button
      onClick={logoutHandler}
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      LogOut
    </button>
  );
}

export default LogoutBtn;
