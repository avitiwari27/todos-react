import React from "react";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      {/* {JSON.stringify(!todo.issCompleted)} */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <div>
        <Button
          variant="success"
          // style={{ background: "green", color: "white" }}
          onClick={() => completeTodo(index)}
        >
          Complete
        </Button>
        {/* <Button variant="danger" onClick={() => removeTodo(index)}>
            X
          </Button> */}
        <button
          type="button"
          class="btn btn-outline-danger"
          onClick={() => removeTodo(index)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Todo;
