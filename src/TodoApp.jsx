import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import { TodoForm } from './components/TodoForm';

const TodoApp = () => {
  const todoKey = 'ReactTasks';
  
  // Retrieve tasks from localStorage on initial render
  const [tasks, settasks] = useState(() => {
    const rawTodos = localStorage.getItem(todoKey);
    if (!rawTodos) return []; // If there's no data in localStorage, return an empty array
      return JSON.parse(rawTodos); // Try to parse the JSON string
  });

  const [showCompleted, setShowCompleted] = useState(false);
  const [DateTime, setDateTime] = useState("");

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(todoKey, JSON.stringify(tasks));
  }, [tasks]);

  // Update date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = (inputValue) => {
    if (!inputValue) return;
    if (tasks.find(task => task.data === inputValue)) return;
    settasks((prev) => [...prev, { data: inputValue, isCompleted: false }]);
  };

  const handleDone = (value) => {
    settasks(
      tasks.map(task => task.data === value ? { ...task, isCompleted: !task.isCompleted } : task)
    );
  };

  const handleDelete = (value) => {
    settasks(tasks.filter(task => task.data !== value));
  };

  const handleEdit = (value) => {
    setInputValue(value);
    settasks(tasks.filter(task => task.data !== value));
    inputRef.current.focus();
  };

  const handleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTasks = showCompleted
    ? tasks.filter(task => task.isCompleted)
    : tasks.filter(task => !task.isCompleted);

  return (
    <>
      <Navbar />
      <section className="lower flex justify-center px-5">
        <div className="box lg:w-[35%] h-[80vh] sm:h-[88vh] mt-3 bg-secondary p-3 px-4 rounded-lg">
          <h1 className="text-center text-3xl my-4">Welcome to tasks Manager</h1>
          <h2 className='text-center'> {DateTime} </h2>
          <TodoForm onSubmitForm={handleFormSubmit} />
          <div className="bottom flex flex-col gap-3 pt-3 h-[70%]">
            <div className="check flex">
              <input
                type="checkbox"
                name="showCompleted"
                id="showCompleted"
                checked={showCompleted}
                onChange={handleShowCompleted}
              />
              <label htmlFor="showCompleted" className="ml-1 text-xs">
                Show completed tasks
              </label>
            </div>
            <div className="h-[1px] bg-primary"></div>
            <section className="last space-y-4 h-[80%]">
              <h2 className="text-xl">Your Todos</h2>
              <div className="all-todos overflow-y-auto h-[90%] scrollbar scrollbar-thin">
                {tasks.length < 1 ? (
                  <div className="ml-3 text-gray-500 text-sm">No todos to display</div>
                ) : filteredTasks.length < 1 ? (
                  showCompleted ? (
                    <div className="ml-3 text-gray-500 text-sm">No completed tasks</div>
                  ) : (
                    <div className="ml-3 text-gray-500 text-sm">No tasks remaining to complete</div>
                  )
                ) : (
                  filteredTasks.map((item) => (
                    <Todo
                      key={item.data}
                      item={item}
                      handleDone={handleDone}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoApp;
