import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./utils/UserContext";
import {logout} from "./services/auth";

function Home() {
    const {isAuth, setIsAuth} = useContext(UserContext);
    let navigate = useNavigate();
    return (
        <div>
            <p>Hello Im Home!</p>
            <button
                onClick={()=>{
                    logout();
                    setIsAuth(false);
                    navigate('/')
                }}
            >
                Выйти
            </button>
        </div>
    )
}

export default Home
