import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState([]);

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  const addTodo = () => {
    // Agregar el valor del input a la lista
    const item = {
      id: todos.length >= 1 ? todos[todos.length - 1].id + 1 : 1,
      description: newTodo,
      completed: false,
    };
    setTodos([...todos, item]);
  };

  const completeTodo = (e, todo) => {
    let newTodos = [
      ...todos.filter((t) => t.id !== todo.id),
      { ...todo, completed: e.target.checked },
    ];
    setTodos(newTodos.sort((a, b) => a.id - b.id));
  };

  const deleteTodo = (id) => {
    let newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  const listTodos = todos.map((todo) => (
    <li key={todo.id} className="list-group-item todo-item box">
      {todo.completed ? (
        <span className="done">{todo.description}</span>
      ) : (
        <>{todo.description}</>
      )}
      <div className="todo-item-actions">
        <input
          className="form-check-input check-input centered-checkbox"
          type="checkbox"
          onClick={(e) => completeTodo(e, todo)}
        />
        <button
          className="btn centered-button"
          onClick={() => deleteTodo(todo.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
  ));

  return (
    <div className="container-fluid position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center flex-column ">
      <div className="shadow-sm p-3 mb-5 rounded box">
        <h1 className="d-flex justify-content-center">To Do List</h1>
        <div className="card box" style={{ width: "18rem", border: "none" }}>
          <div class="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="New item"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={handleChange}
              value={newTodo}
            />
            <button
              className="btn button-outline-secondary button"
              type="button"
              id="button-addon2"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
          <ul className="list-group list-group  form-check ">{listTodos}</ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
