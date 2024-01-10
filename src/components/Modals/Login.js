import React, { useState } from "react";
import { fetchAuth, selectIsAuthStatus } from "../../redux/slices/auth";
import { closeModalLogin } from "../../redux/slices/modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectTasksStatus } from "../../redux/slices/tasks";
import "./modal.css";

export const Login = () => {
  const [text, setText] = useState("");


  const dispatch = useDispatch();
  const authStatus = useSelector(selectIsAuthStatus);
  const tasksStatus = useSelector(selectTasksStatus);
  const statusApp = tasksStatus || authStatus;

  const postLogin = async () => {
    if (text.trim().length < 3) {
      return toast.error("введите минимум 3 символа");
    }
    dispatch(fetchAuth({ fullName: text }));
    dispatch(closeModalLogin());
  };
  const keyPress = (e) => {
    if (e.key === "Enter") {
      postLogin();
    }
  };

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Вход</h3>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <div className={"header_right_modal-login"}>
              <div>Введите ваше имя:</div>
              <input type="text"
                     value={text}
                     autoFocus
                     onKeyDown={keyPress}
                     onChange=
                       {(e) => setText(e.currentTarget.value)} />
              <button onClick={postLogin} disabled={statusApp}>Подтвердить</button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
        </div>
      </div>
    </div>);
};
