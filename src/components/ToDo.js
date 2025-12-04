
import { Card, CardContent, Typography, Grid, Button, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { TodosContext } from '../contexts/todosContext';
import { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function Todo({t}) {

          //hooks:

    const [openDelete, setopenDelete] = useState(false);
    const [openEdit, setopenEdit] = useState(false);
    const [updatedTodo , setUptadetTodo] = useState({title: t.title, details: t.details})

    const { todos, setTodos } = useContext(TodosContext);

          //handelers:

  function handleDelete(id){
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }
  function handleEdit(id){
    const updatedTodos = todos.map((todo) => {
      if(todo.id === id){
        return{...todo, title: updatedTodo.title, details: updatedTodo.details}
      }else{
        return todo
      }
      
    })
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setopenEdit(false)

  }
  function handleChecked(id) {
      const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
              todo.checked = !todo.checked;
          }
          return todo;
      });
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }
 
  return (


          //delete alert
    <>
        <Dialog
        open={openDelete}
        onClose={() => setopenDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
             Are you sure you want to delete this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDelete(false)}>Annuler</Button>
          <Button  onClick={() => handleDelete(t.id)} color="error">
            Delete 
          </Button>
        </DialogActions>
      </Dialog>

          {/* update alert */}
        <Dialog
        open={openEdit}
        onClose={() => setopenEdit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Edit Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) => {
                setUptadetTodo({...updatedTodo,title: e.target.value})
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="details"
              label="Details"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) => {
                setUptadetTodo({...updatedTodo,details: e.target.value})
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenEdit(false)}>Annuler</Button>
          <Button  onClick={() => handleEdit(t.id)} color="error">
            confirm
          </Button>
        </DialogActions>
      </Dialog>

      
           {/* the task */}
        <Card sx={{ minWidth: 275, backgroundColor: '#21a282ff', marginTop: 2 }}>
            <CardContent >

                <Grid container spacing={2}>

                    <Grid size={8}>
                        <Typography variant='h4' sx={{ textAlign:'left' }}>{t.title}</Typography>
                        <Typography variant='h6' sx={{ textAlign:'left' }}>{t.details}</Typography>
                    </Grid>

                    <Grid size={4}> 
                    
                        <IconButton 
                            className='iconB'
                            onClick={() => {
                                handleChecked(t.id);
                            }}
                            style={{ 
                                color: t.checked ? 'white' : 'green',
                                backgroundColor: t.checked ? 'green' : 'white',
                                border: '1px solid green',
                            }}  
                            >
                            <CheckIcon />
                        </IconButton>
                        <IconButton 
                            className='iconB'
                            style={{ 
                                color: 'blue',
                                backgroundColor: 'white',
                                border: '1px solid blue',
                                marginLeft: '3px',
                            }}  
                            onClick={() => setopenEdit(true)}
                        >
                            <EditIcon />

                        </IconButton>
                        <IconButton 
                            className='iconB'
                            onClick={() => setopenDelete(true)}
                            style={{ 
                                color: 'red',
                                backgroundColor: 'white',
                                border: '1px solid red',
                                marginLeft: '3px',
                            }}  
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>

                </Grid>
                

            </CardContent>

        </Card>
    </>
    
  );
}
