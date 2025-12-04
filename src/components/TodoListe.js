import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Divider, Grid, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './ToDo';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from '../contexts/todosContext';
import { useContext, useState, useEffect } from 'react';




export default function TodoList() {

    const { todos, setTodos } = useContext(TodosContext);
    const [showedTodosType , setShowedTodosType] =useState("all")
    const [newTask, setNewTask] = useState('');
    
    const completedTodos = todos.filter((t) =>{
        return t.checked
    })

    const notCompletedTodos = todos.filter((t) =>{
        return !t.checked
    })

    let showedTodos = todos

    if(showedTodosType == "completed"){
        showedTodos = completedTodos
    }else if(showedTodosType == "not-completed"){
        showedTodos = notCompletedTodos
    }else{
        showedTodos = todos
    }

    const todosArray = showedTodos.map((todo) => (
        <Todo key={todo.id} t={todo} />
    ));





    function changeShowedType(e){
        setShowedTodosType(e.target.value)
    }

    const handleAddTask = () => {
        const newToDo={
            id:uuidv4(),
            title:newTask,
            details:'',
            checked:false
        }
        const updatedTodos = [...todos, newToDo]
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        setNewTask('');
    };

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos)
    }, [])

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275}}style={{
             maxHeight: "85vh",
             overflow: "scroll",
             scrollbarWidth: "none"
            }}>
            <CardContent>

                <Typography gutterBottom sx={{ color: 'blue', fontSize: 30 }}>
                    my ToDo
                </Typography>

                <Divider /> 

                <ToggleButtonGroup
                    value={showedTodosType}
                    exclusive
                    style={{ marginTop: 16 }}
                    onChange={changeShowedType}
                    aria-label="text alignment"
                    color='primary'
                >
                    <ToggleButton color='primary' variant="contained" value="all">
                        all
                    </ToggleButton>

                    <ToggleButton color='primary' variant="contained" value="not-completed">
                        not completed
                    </ToggleButton>

                    <ToggleButton color='primary' variant="contained" value="completed">
                        completed
                    </ToggleButton>

                </ToggleButtonGroup>
                <Grid container style={{ marginTop: 16 }} spacing={2}  >
                    
                    <Grid 
                        size={8}
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="Title" 
                            variant="outlined" 
                            style={{ width:'100%' }} 
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />                    
                    </Grid>
                    <Grid 
                        size={4}
                    >
                       <Button 
                            variant="contained" 
                            style={{ height: '100%', width:'100%' }}
                            onClick={handleAddTask}
                            disabled={newTask.length === 0}
                        >Add Task</Button>
                    </Grid>
                </Grid>

                
                {todosArray}

                

            </CardContent>

        </Card>      
    
    </Container>
    </>
  );
}
