import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Fab} from "../components";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return <>
        <h1>Home - Autenticado!</h1>
    </>;
}

export default Home;