import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { HideLoading, showLoading } from "../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getpresentUser() {
    try {
      dispatch(showLoading());
      const res = await GetCurrentUser();
      // console.log(res);
      dispatch(HideLoading());
      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        dispatch(setUser(null));
        message.error(res.response.data.message);
        localStorage.removeItem("jwt_token");
        navigate("/login");
      }
    } catch (err) {
      dispatch(HideLoading());
      dispatch(setUser(null));
      message.error(err.message);
    }
  }
  useEffect(() => {
    //  we should allow user to access home only when user is authneticated fro that we check the user has a
    // token stored in localstorage if yes then check its validity if not then navigate them to login page
    if (localStorage.getItem("jwt_token")) {
      getpresentUser();
    } else {
      navigate("/login");
    }
  }, []);
  // console.log(user);
  return (
    user && (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div>
            <h1
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Book My Show {user.isAdmin ? "(Admin)" : ""}
            </h1>
          </div>

          <div className="bg-white p-1 flex gap-1">
            <i className="ri-shield-user-line text-primary mt-1"></i>
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.Username === undefined ? (
                <>{user.username}</>
              ) : (
                <>{user.Username}</>
              )}
            </h1>

            <i
              className="ri-logout-box-r-line mt-1"
              onClick={() => {
                localStorage.removeItem("jwt_token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;
