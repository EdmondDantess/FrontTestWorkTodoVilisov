import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateTask, selectOneTask, selectTasksStatus } from "../../redux/slices/tasks";
import { selectIsAuthStatus } from "../../redux/slices/auth";
import { closeModalEditTask } from "../../redux/slices/modal";
import "./modal.css";

export const EditAddTask = () => {

  const [text, setText] = useState("");
  const [titleText, setTitleText] = useState("");

  const dispatch = useDispatch();
  const authStatus = useSelector(selectIsAuthStatus);
  const task = useSelector(selectOneTask);
  const tasksStatus = useSelector(selectTasksStatus);

  const onClose = () => {
    dispatch(closeModalEditTask());
  };

  const statusApp = tasksStatus || authStatus;
  const taskUpdate = () => {
    dispatch(fetchUpdateTask({
      title: titleText,
      text: text,
      status: task.status,
      _id: task._id
    }));
    onClose();
  };

  useEffect(() => {
    setTitleText(task.title);
    setText(task.text);
  }, []);

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Редактировать</h3>
          <span className="modal-close" onClick={onClose}>&#10060;</span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <div className={"header_left_modal-add-task"}>
              <div>Введите название задачи:</div>
              <input type="text" value={titleText}
                     onChange={(e) => setTitleText(e.currentTarget.value)} />
              <div>Введите Описание</div>
              <textarea value={text}
                        onChange={(e) => setText(e.currentTarget.value)} />
              <button
                onClick={() => taskUpdate()}
                disabled={statusApp}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

