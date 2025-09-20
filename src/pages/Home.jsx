import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Fab} from "../components";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return <>
        <h1>Home - Autenticado!</h1>
        <Fab color="primary" aria-label="add" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={() => navigate('/habit')}>
            <AddIcon/>
        </Fab>
    </>;
}

export default Home;