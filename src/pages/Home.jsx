import React, {useEffect, useState} from 'react';
import {DatePicker, Grid, TextField, Typography} from "../components";
import {useNavigate} from "react-router-dom";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {useTheme} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import useHabits from "../hooks/useHabits";
import {useToast} from "../hooks/ToastContext";
import dayjs from 'dayjs';

const Home = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { fetchDashboard, dashboard } = useHabits();
    const theme = useTheme();
    const [form, setForm] = useState({
        category: '',
        start_date: '',
        end_date: '',
    });

    const handleDateChange = (field, value) => {
        // value pode ser null ou dayjs
        setForm({
            ...form,
            [field]: value ? value.format('YYYY-MM-DD') : ''
        });
    };

    const search = () => {
        const { start_date, end_date } = form;
        if ((start_date && !end_date) || (!start_date && end_date)) {
            showToast('Preencha ambas as datas ou deixe ambas vazias', 'warning');
            return;
        }
        if (start_date && end_date) {
            const start = new Date(start_date);
            const end = new Date(end_date);
            if (start > end) {
                showToast('A data inicial deve ser menor ou igual à final', 'warning');
                return;
            }
        }
        fetchDashboard(form);
    }

    useEffect(() => {
        search();
    }, []);

    useEffect(() => {
        search();
    }, [form]);

    return  <Grid container sx={{minHeight: '100vh', p: 2}} spacing={2}>
                <Grid size={{xs: 12}}>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12}}>
                            <Typography variant="h6" component="h1">
                                Filtros:
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 12, md: 2}} sx={{ pt: 1 }}>
                            <DatePicker
                                label={"Data inicial"}
                                onChange={value => handleDateChange('start_date', value)}
                                value={form.start_date ? dayjs(form.start_date) : null}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 2}} sx={{ pt: 1 }}>
                            <DatePicker
                                label={"Data final"}
                                onChange={value => handleDateChange('end_date', value)}
                                value={form.end_date ? dayjs(form.end_date) : null}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{xs: 0, md: 3, lg: 4}}>
                    <Typography variant="h6" component="h1">
                        Economia no período:
                    </Typography>
                    <BarChart
                        xAxis={[{ data: dashboard?.economy_on_period ? dashboard?.economy_on_period?.labels : [] }]}
                        series={[{ data: dashboard?.economy_on_period ? dashboard?.economy_on_period?.data : [], color: theme.palette.secondary.main }]}
                        height={300}
                    />
                </Grid>
                <Grid size={{xs: 0, md: 3, lg: 4}}>
                    <Typography variant="h6" component="h1">
                        Hábitos de maior impacto no período (Energia) em CO₂/Kg:
                    </Typography>
                    <BarChart
                        xAxis={[{ data: dashboard?.energy_habit_ranking_on_period ? dashboard?.energy_habit_ranking_on_period?.labels : [] }]}
                        series={[{ data: dashboard?.energy_habit_ranking_on_period ? dashboard?.energy_habit_ranking_on_period?.data : [], color: theme.palette.tertiary.main }]}
                        height={300}
                    />
                </Grid>
            </Grid>;
}

export default Home;