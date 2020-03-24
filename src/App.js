import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Container, CardGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// const Todo = ({ todo }) => <div className="todo">{todo.text}</div>;

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

// To add new todo in the list (with form)

function TodoForm({ addTodo }) {
  const [value, setValue] = useState(""); // value to store state, setValue to define how

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const retrivedData = () => JSON.parse(window.localStorage.getItem("todos")); // retriving string and coverting to object array
  // const intialTodo = JSON.parse(retrivedData);

  // const initialTaskRemaining = () =>
  //   Number(window.localStorage.getItem("taskRemaining")) || 0;
  // const initialtaskCompleted = () =>
  //   Number(window.localStorage.getItem("taskCompleted")) || 0;

  const [tasksRemaining, setTasksRemaining] = useState(0); //see what the number means= INITIAL VALUE OR DEFAULT VALUE
  const [completedTask, setCompletedTask] = useState(0);
  const [todos, setTodos] = useState(retrivedData); // using the retrived data as initial data array

  // const [todos, setTodos] = useState([     // for static value i.e. without the use of local storage
  // { text: "Learn about React", isCompleted: false },
  // { text: "Meet friend for lunch", isCompleted: false },
  // { text: "Go out for snacks", isCompleted: false }
  // ]);

  // The first parameter, todos, is what we are going to name our state.
  // The second parameter, setTodos, is what we are going to use to set the state.

  // update task remaining, i.e. todos with isComplete: false
  useEffect(() => {
    // console.log(todos.filter(todo => todo.issCompleted === undefined)); //
    setTasksRemaining(todos && todos.filter(todo => !todo.isCompleted).length);
    setCompletedTask(todos && todos.filter(todos => todos.isCompleted).length);

    window.localStorage.setItem("todos", JSON.stringify(todos)); // stores data in local storage in string form, so making array-object string

    // window.localStorage.setItem("taskRemaining", tasksRemaining); // these two not needed as we calculate them according to todos array
    // window.localStorage.setItem("taskCompleted", completedTask);
  }, [todos]); // using [todos], so that the useEffect tasks works only when there is change in todos

  const addTodo = text => {
    if (todos && todos.length > 0) {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    } else {
      const newTodos = [{ text: text }];
      setTodos(newTodos);
    }
    toast.warn(text + " is added");
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    toast.success(newTodos[index].text + " is completed");
    // alert(newTodos[index].text + " is completed");
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    toast.error(todos[index].text + " is removed", {
      // position: toast.POSITION.TOP_RIGHT  (can use this or the bottom one)
      position: "top-right"
    });
    const newTodos = [...todos];

    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // we'll render our todos here ...
  // return <div></div>

  // prob1

  return (
    <div className="app">
      <Container fluid style={{ background: "#209cee", height: "100%" }}>
        <div className="header">My TODOs</div>
        <div className="todo-list">
          {todos &&
            todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            ))}
          <div className="create-task">
            <TodoForm addTodo={addTodo} />
          </div>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Subtitle>Completed task ({completedTask})</Card.Subtitle>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Subtitle> Pending task ({tasksRemaining}) </Card.Subtitle>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      </Container>
    </div>
  );
}

export default App;
