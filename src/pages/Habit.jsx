import {Grid, Box, Typography, TextField, Button, Avatar} from '../components';
import Autocomplete from '@mui/material/Autocomplete';
import logo from '../assets/images/logo.png';
import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useHabits from "../hooks/useHabits";
import {useToast} from "../hooks/ToastContext";

const categories = [
    {value: 'transporte', label: 'Transporte'},
    {value: 'energia', label: 'Energia'}
];

const frequencies = [
    {value: 'diario', label: 'Diário'},
    {value: 'semanal', label: 'Semanal'},
    {value: 'mensal', label: 'Mensal'},
];

const units = [
    {value: 'km', label: 'Km'},
    {value: 'kwh', label: 'KWh'},
    {value: 'refeicoes', label: 'Refeições'},
];

const estados = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
    'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
    'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

const Habit = () => {
    const { showToast } = useToast();
    const { id } = useParams();
    const { createHabit, fetchHabitById, updateHabit, habit } = useHabits();
    const [form, setForm] = useState({
        name: '',
        category: null,
        frequency: null,
        unit: null,
        quantity: '',
        start_date: '',
        location: null,
    });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            fetchHabitById(id).then(() => setLoading(false));
        }
    }, [id, fetchHabitById]);

    React.useEffect(() => {
        if (id && habit) {
            setForm({
                name: habit.name || '',
                category: habit.category || null,
                frequency: habit.frequency || null,
                unit: habit.unit || null,
                quantity: habit.quantity || '',
                start_date: habit.start_date || '',
                location: habit.location || null,
            });
        }
    }, [id, habit]);

    console.log(form)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleAutocomplete = (field, value) => {
        setForm({...form, [field]: value ? (value.value || value) : null});
    };

    const handleSubmit = () => {
        const requiredFields = [
            form.name,
            form.category,
            form.frequency,
            form.unit,
            form.quantity,
            form.start_date,
            form.location
        ];
        const allFilled = requiredFields.every(field => field !== null && field !== '');
        if (!allFilled) {
            showToast('Preencha todos os campos obrigatórios.', 'warning');
            return;
        }
        if (id) {
            updateHabit(id, form);
        } else {
            createHabit(form);
        }
    };

    return (
        <Grid container sx={{minHeight: '100vh'}}>
            <Grid size={{xs: 0, md: 3, lg: 4}}/>
            <Grid size={{xs: 12, md: 6, lg: 4}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={logo} sx={{width: 170, height: 170, m: 1, bgcolor: 'secondary.main'}}/>
                    <Typography component="h1" variant="h5">
                        {id ? 'Editar Hábito' : 'Cadastrar Hábito'}
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1, width: '100%'}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Nome"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Autocomplete
                            disablePortal
                            options={categories}
                            getOptionLabel={option => option.label}
                            value={categories.find(opt => opt.value === form.category) || null}
                            onChange={(_, value) => handleAutocomplete('category', value)}
                            sx={{mt: 2, mb: 1}}
                            renderInput={(params) => <TextField {...params} label="Categoria" required/>}
                        />
                        <Autocomplete
                            disablePortal
                            options={frequencies}
                            getOptionLabel={option => option.label}
                            value={frequencies.find(opt => opt.value === form.frequency) || null}
                            onChange={(_, value) => handleAutocomplete('frequency', value)}
                            sx={{mt: 2, mb: 1}}
                            renderInput={(params) => <TextField {...params} label="Frequência" required/>}
                        />
                        <Autocomplete
                            disablePortal
                            options={units}
                            getOptionLabel={option => option.label}
                            value={units.find(opt => opt.value === form.unit) || null}
                            onChange={(_, value) => handleAutocomplete('unit', value)}
                            sx={{mt: 2, mb: 1}}
                            renderInput={(params) => <TextField {...params} label="Unidade" required/>}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="quantity"
                            label={form.unit ? `${units.find(u => u.value === form.unit)?.label} economizada` : 'Quantidade economizada'}
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="start_date"
                            label="Data de início"
                            name="start_date"
                            type="date"
                            value={form.start_date}
                            onChange={handleChange}
                            InputLabelProps={{shrink: true}}
                            required
                        />
                        <Autocomplete
                            disablePortal
                            options={estados}
                            getOptionLabel={option => option}
                            value={form.location || null}
                            onChange={(_, value) => handleAutocomplete('location', value)}
                            sx={{mt: 2, mb: 1}}
                            renderInput={(params) => <TextField {...params} label="Localização" required/>}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {id ? 'Atualizar' : 'Salvar'}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Habit;
