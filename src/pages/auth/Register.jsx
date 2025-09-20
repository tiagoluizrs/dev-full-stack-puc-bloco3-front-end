import { Grid, Paper, Box, Typography, TextField, Button, Avatar } from '../../components';
import logo from '../../assets/images/logo.png';
import wallpaper from '../../assets/images/wallpaper.jpg';
import Auth from "../../services/Authentication";
import React from "react";
import { useToast } from '../../hooks/ToastContext';
import {Link} from "react-router-dom";

const Register = () => {
    const [data, setData] = React.useState({
        userEmail: '',
        password: '',
        confirmPassword: ''
    });
    const { showToast } = useToast();

    const signIn = () => {
        if (data.userEmail === '' || data.password === '' || data.confirmPassword === '') {
            showToast('Preencha todos os campos', 'warning');
            return;
        }

        if (data.password !== data.confirmPassword) {
            showToast('As senhas não coincidem', 'warning');
            return;
        }

        Auth.register(data).then(res => {
            if (res.error) {
                showToast(res.error, 'error');
            } else if (res.token && res.user) {
                showToast('Registro realizado com sucesso', 'success');
            } else {
                showToast('Erro inesperado ao registrar', 'error');
            }
        }).catch(() => {
            showToast('Erro de conexão com o servidor', 'error');
        });
    }

    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            <Grid item size={{
                xs: false,
                sm: 6,
                md: 8
            }}
                  sx={{
                      backgroundImage: `url(${wallpaper})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}
            />
            <Grid size={{
                xs: 12,
                sm: 6,
                md: 4
            }} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        src={logo}
                        sx={{ width: 170, height: 170, m: 1, bgcolor: 'secondary.main' }} />
                    <Typography component="h1" variant="h5">
                        Registrar
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="userEmail"
                            label="Email/Usuário"
                            value={data.userEmail}
                            onChange={e => setData({ ...data, userEmail: e.target.value })}
                            name="userEmail"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            value={data.password}
                            onChange={e => setData({ ...data, password: e.target.value })}
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password-confirm"
                            value={data.passwordConfirm}
                            onChange={e => setData({ ...data, passwordConfirm: e.target.value })}
                            label="Confirme a Senha"
                            type="password"
                            id="password-confirm"
                        />
                        <Link to={"/login"} variant="body2" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="primary">
                                {"Já possui uma conta? Entrar"}
                            </Typography>
                        </Link>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={signIn}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Register;