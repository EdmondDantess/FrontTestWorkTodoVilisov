import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask, selectTasksStatus } from "../../redux/slices/tasks";
import { selectIsAuthStatus } from "../../redux/slices/auth";
import { closeModalAddTask } from "../../redux/slices/modal";
import "./modal.css";

export const AddTask = () => {
  const [textTask, setTextTask] = useState("");
  const [titleTextTask, setTitleTextTask] = useState("");

  const dispatch = useDispatch();
  const authStatus = useSelector(selectIsAuthStatus);
  const tasksStatus = useSelector(selectTasksStatus);
  const statusApp = tasksStatus || authStatus;
  const createTask = () => {
    dispatch(fetchTask({
      title: titleTextTask,
      text: textTask,
      status: "pending"
    }));
  };

  const onClose = () => {
    dispatch(closeModalAddTask());
  };


  return (<div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Задача</h3>
          <span className="modal-close" onClick={onClose}>&#10060;</span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <div className={"header_left_modal-add-task"}>
              <div>Введите название задачи:</div>
              <input type="text" value={titleTextTask}
                     onChange={(e) => setTitleTextTask(e.currentTarget.value)} />
              <div>Введите Описание</div>
              <textarea value={textTask}
                        onChange={(e) => setTextTask(e.currentTarget.value)} />
              <div>{textTask.status}</div>
              <button
                onClick={() => createTask()}
                disabled={statusApp}
              >Подтвердить
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
