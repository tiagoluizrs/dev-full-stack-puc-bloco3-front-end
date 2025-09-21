import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import useHabits from "../hooks/useHabits";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Fab, Grid} from "../components";
import AddIcon from "@mui/icons-material/Add";


const getCategoryIcon = (category) => {
  if (category === 'transporte') return <ImageIcon />;
  if (category === 'energia') return <WorkIcon />;
  if (category === 'alimentacao') return <BeachAccessIcon />;
  return <Avatar />;
};

const Habits = () => {
  const { habits, fetchHabits, loading, error, deleteHabit } = useHabits();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedHabit, setSelectedHabit] = React.useState(null);

  React.useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleEdit = (id) => {
    navigate(`/habit/${id}`);
  };

  const handleDeleteClick = (habit) => {
    setSelectedHabit(habit);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedHabit(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedHabit) {
      await deleteHabit(selectedHabit.id);
      setDialogOpen(false);
      setSelectedHabit(null);
    }
  };

  return (
    <React.Fragment>
      <Grid container sx={{minHeight: '100vh'}}>
        <Grid size={{xs: 0, md: 2, lg: 4}}/>
        <Grid size={{xs: 12, md: 8, lg: 4}}>
          <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '0 auto', mt: 4 }}>
            {loading && <ListItem><ListItemText primary="Carregando..." /></ListItem>}
            {error && <ListItem><ListItemText primary={error} /></ListItem>}
            {Array.isArray(habits) && habits.length === 0 && !loading && (
                <ListItem><ListItemText primary="Nenhum hábito cadastrado." /></ListItem>
            )}
            {Array.isArray(habits) && habits.map((habit) => (
                <ListItem key={habit.id}
                          secondaryAction={
                            <>
                              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(habit.id)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(habit)} sx={{ ml: 1 }}>
                                <DeleteIcon />
                              </IconButton>
                            </>
                          }
                >
                  <ListItemAvatar>
                    <Avatar>
                      {getCategoryIcon(habit.category)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary={habit.name}
                      secondary={`Categoria: ${habit.category} | Frequência: ${habit.frequency} | Unidade: ${habit.quantity} | Início: ${habit.start_date} | Localização: ${habit.location}`}
                  />
                </ListItem>
            ))}
            {!Array.isArray(habits) && !loading && (
                <ListItem><ListItemText primary="Erro: dados de hábitos inválidos." /></ListItem>
            )}
          </List>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir o hábito "{selectedHabit?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
        <Fab color="primary" aria-label="add" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={() => navigate('/habit')}>
            <AddIcon/>
        </Fab>
    </React.Fragment>
  );
};

export default Habits;
