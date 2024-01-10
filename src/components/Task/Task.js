import React from "react";
import "./task.css";
import { fetchOneTask, fetchRemoveTask, fetchUpdateTask, selectTasks } from "../../redux/slices/tasks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openModalAddLogin, openModalEditTask, selectIsModalEditTask } from "../../redux/slices/modal";
import { selectIsAuth } from "../../redux/slices/auth";
import { EditAddTask } from "../Modals/EditTask";

const statuses = ["Ожидание", "В работе", "Сделано"];

export const Task = ({
                       statusApp,
                       handleDragStart,
                       taskId = ""
                     }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isModalEditTask = useSelector(selectIsModalEditTask);
  const tasks = useSelector(selectTasks);
  let task = tasks.find(el => el._id === taskId);

  const removeTask = (id) => {
    if (!isAuth) dispatch(openModalAddLogin());
    if (!statusApp) dispatch(fetchRemoveTask(id));
    else toast.warn("подождите...");
  };
  const editTask = () => {
    dispatch(fetchOneTask(taskId));
    dispatch(openModalEditTask());
  };
  const changeStatus = (e) => {
    dispatch(fetchUpdateTask({ status: e.currentTarget.value, _id: task._id }));
  };

  return (
    <div className={"task"}
         title={task.text}
         draggable
         onDragStart={() => handleDragStart(task._id)}>
      {isAuth && isModalEditTask &&
        <EditAddTask taskId={taskId} />}
      <div className="task__delete" title={"удалить"} onClick={() => removeTask(task._id)}>&#10060;</div>
      <div className="task__edit" title={"редактировать"} onClick={editTask}>✏️</div>
      <div className={"task__title"}>
        Название: {task.title}
      </div>
      <div className={"task__status"}>
        Статус:
        <select value={task.status}
                defaultValue="Ожидание"
                onChange={(e) => changeStatus(e)}>
          {
            statuses.map((el) => {
              return <option name={el} id={el} key={el}>{el}</option>;
            })
          }
        </select>
      </div>
      <div className={"task__author"}>
        Кто создал: {task.user?.fullName}
      </div>
      <div className={"task__text"}>
        Текст: {task.text}
      </div>
      <div className={"task__data"}>
        Дата создания:
        <div>{new Date(task.createdAt).toLocaleString()}</div>
      </div>
    </div>
  )
    ;
};
