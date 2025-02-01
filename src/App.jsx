//import react from 'react';
import {useState , useEffect} from 'react';
import './App.css';

const TodoApp= ()=>{
  const [Task , setTask]= useState([]);
  const [NewTask, setNewTask]= useState('');

  useEffect(()=>{
    const savedTasks= JSON.parse(localStorage.getItem('Task'))||[];
    setTask(savedTasks);
  }, []);

  const addTask=()=>{
    if (!NewTask){
      alert("You must write something!");
      return;
    }
    const updatedTasks = [...Task, {text: NewTask, completed: false}];
    setTask(updatedTasks);
    localStorage.setItem('Task', JSON.stringify(updatedTasks));
    setNewTask('');
  };

  const toggleCompletion = (index) => {
    const updatedTasks = Task.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = Task.filter((_, idx) => idx !== index);
    setTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
    return (
      
          <div className="todo-app">
              <h2>To-Do List </h2>
              <div className="row">
                  <input 
                    type="text"
                    value={NewTask}
                    onChange={(e)=> setNewTask(e.target.value)}
                    //id="input-box" 
                    placeholder="add your task"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addTask();
                      }
                    }}
                  />
                  <button onClick={addTask}>Add</button>
              </div>
              <ul>
                {Task.map((task, index) => (
                  <li
                    key={index}
                    className={task.completed ? 'checked' : ''}
                    onClick={() => toggleCompletion(index)}
                  >
                    {task.text}
                    <span onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>×</span>
                  </li>
                ))}
              </ul>
          </div>
    );
};
export default TodoApp;
