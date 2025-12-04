import './App.css';
import TodoList from './components/TodoListe';
import { TodosContext } from './contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const initialTodos = [
    {
        id: uuidv4(),
        title: "Task 1",
        details: "Details of Task 1",
        checked: false
    },
    {
        id: uuidv4(),
        title: "Task 2",
        details: "Details of Task 2",
        checked: false
    },
    {
        id: uuidv4(),
        title: "Task 3",
        details: "Details of Task 3",
        checked: true
    }
];
const theme = createTheme({
  palette: {
    primary:{
      main: "#ca5202ff"
    }
  }
})

function App() {

      const [todos, setTodos] = React.useState(initialTodos);

  return (
    <TodosContext.Provider value={{todos, setTodos}}>
      <ThemeProvider theme={theme}>
        <div className="App" style={{ display:"flex",backgroundColor:"#d8a5a5ff", justifyContent:"center", alignItems:"center", height:"100vh" }}>
          <TodoList />
        </div>
      </ThemeProvider>
    </TodosContext.Provider>
  );
}

export default App;
