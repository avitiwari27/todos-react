import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, Container, CardGroup } from "react-bootstrap";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForms";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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
    setTasksRemaining(
      todos && todos.filter((todo) => !todo.isCompleted).length
    );
    setCompletedTask(
      todos && todos.filter((todos) => todos.isCompleted).length
    );

    window.localStorage.setItem("todos", JSON.stringify(todos)); // stores data in local storage in string form, so making array-object string

    // window.localStorage.setItem("taskRemaining", tasksRemaining); // these two not needed as we calculate them according to todos array
    // window.localStorage.setItem("taskCompleted", completedTask);
  }, [todos]); // using [todos], so that the useEffect tasks works only when there is change in todos

  const addTodo = (text) => {
    if (todos && todos.length > 0) {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    } else {
      const newTodos = [{ text: text }];
      setTodos(newTodos);
    }
    const warning = text + " is added";
    toast.warn(warning);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    const completed = newTodos[index].text + " is completed";
    toast.success(completed);
    // alert(newTodos[index].text + " is completed");
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    const removedTask = newTodos[index].text + " is removed";
    toast.error(removedTask, {
      // position: toast.POSITION.TOP_RIGHT  (can use this or the bottom one)
      position: "top-right",
    });
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
