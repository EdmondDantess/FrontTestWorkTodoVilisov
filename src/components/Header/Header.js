import React, { useEffect } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth, selectIsAuthStatus, selectName } from "../../redux/slices/auth";
import { openModalAddLogin, openModalAddTask, selectIsModalAddTask } from "../../redux/slices/modal";
import { Login } from "../Modals/Login";
import { AddTask } from "../Modals/AddTask";
import { ToastAlert } from "../Toast/Toast";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userName = useSelector(selectName);
  const isModalAddTask = useSelector(selectIsModalAddTask);
  const authStatus = useSelector(selectIsAuthStatus);

  useEffect(() => {

  });


  const logOut = () => {
    dispatch(logout());
  };
  const openLogin = () => {
    dispatch(openModalAddLogin());
  };
  const openAddTask = () => {
    dispatch(openModalAddTask());
  };

  return (
    <div className={"header"}>
      <div className={"header__container"}>
        <div className={"header_left"}>
          <button onClick={openAddTask} disabled={!isAuth}>Добавить задачу</button>
          {isModalAddTask && <AddTask />}
        </div>
        <button><a target={"_blank"} href="https://github.com/EdmondDantess/FrontTestWorkTodoVilisov">Открыть
          гитхаб</a></button>
        <div className={"header_right"}>
          {
            isAuth && !authStatus
              ? <div>Вы вошли как: {userName}</div>
              : <button onClick={openLogin}>Войти</button>
          }
          {isAuth && <button onClick={logOut}>Выйти</button>}
        </div>
        {!isAuth
          && <Login />}
      </div>
      <ToastAlert />
    </div>
  );
};
