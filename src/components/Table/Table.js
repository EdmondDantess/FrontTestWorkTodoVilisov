import React, { useState } from "react";
import "./table.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateTask, selectTasks, selectTasksStatus } from "../../redux/slices/tasks";
import { Task } from "../Task/Task";
import { selectIsAuthStatus } from "../../redux/slices/auth";

export const Table = () => {
  const [isOver, setIsOver] = useState(false);
  const [isOverProgress, setIsOverProgress] = useState(false);
  const [isOverFinish, setIsOverFinish] = useState(false);
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const authStatus = useSelector(selectIsAuthStatus);
  const tasksStatus = useSelector(selectTasksStatus);
  const statusApp = tasksStatus || authStatus;

  const tasksPending = tasks?.filter(el => el.status === "Ожидание");
  const tasksInProgress = tasks?.filter(el => el.status === "В работе");
  const tasksFinish = tasks?.filter(el => el.status === "Сделано");

  const handleDragStart = (el) => {
    setTask(el);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
    setStatus("Ожидание");
  };
  const handleDragOverProgress = (e) => {
    e.preventDefault();
    setIsOverProgress(true);
    setStatus("В работе");
  };
  const handleDragOverFinish = (e) => {
    e.preventDefault();
    setIsOverFinish(true);
    setStatus("Сделано");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsOver(false);
    setIsOverProgress(false);
    setIsOverFinish(false);
    setStatus("");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    setStatus("");
    setIsOverProgress(false);
    setIsOverFinish(false);
    dispatch(fetchUpdateTask({
      _id: task,
      status
    }));
    setTask("");
  };

  return (
    <div className={"table"}>
      {!statusApp
        ? <div className={"table__container"}>
          <div className={`table__pending`}
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               style={{ backgroundColor: isOver ? "lightgray" : "white" }}
          >
            {tasksPending?.map(el =>
              <Task handleDragStart={handleDragStart}
                    taskId={el?._id}
                    key={el._id}
                    statusApp={statusApp}
              />)}
          </div>
          <div className={`table__in-progress`}
               onDragOver={handleDragOverProgress}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               style={{ backgroundColor: isOverProgress ? "lightgray" : "white" }}>
            {tasksInProgress?.map(el =>
              <Task taskId={el?._id}
                    handleDragStart={handleDragStart}
                    key={el._id}
                    statusApp={statusApp}
              />)}
          </div>
          <div className={`table__finish`}
               onDragOver={handleDragOverFinish}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               style={{ backgroundColor: isOverFinish ? "lightgray" : "white" }}>
            {tasksFinish?.map(el =>
              <Task handleDragStart={handleDragStart}
                    taskId={el?._id}
                    key={el._id}
                    statusApp={statusApp}
              />)}
          </div>
        </div>
        : <div className="loader"></div>
      }
    </div>
  );
};
