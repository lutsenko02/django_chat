import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';

import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import {UserContext} from "./utils/UserContext";

function App() {

    const getToken = () => {
        const token = localStorage.getItem('token');
        return !!token; // true если токен есть, false если нет
    };

    const [isAuth, setIsAuth] = useState(getToken())

    return (
        <UserContext.Provider value={{isAuth, setIsAuth}}>
            <Router>
                <Routes>
                    <Route path="/" element={
                        isAuth ? <Home/> : <Navigate to="/login" replace/>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App
