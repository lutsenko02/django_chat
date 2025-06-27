import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import {loginUser, setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser} from "../services/auth"

function Login() {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const {isAuth, setIsAuth} = useContext(UserContext);

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(userName, password)
            .then(response => {
                const auth_token = response;
                setAxiosAuthToken(auth_token);
                setToken(auth_token);
                getCurrentUser();
                setIsAuth(true);
                navigate("/");
            })
            .catch(error => {
                unsetCurrentUser();
                window.alert("Ошибка при входе " + error);
            })
    }

    return (
        <div className="container pt-5">
            <div className="card">
                <div className="card-content">
                    <h3 className="title is-3">Вход в чат</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="field" >
                            <p className="control has-icons-left" >
                                <input
                                    className="input"
                                    type = "text"
                                    placeholder = "Имя пользователя"
                                    id="userName"
                                    name="userName"
                                    onChange={e=>setUserName(e.target.value)}
                                />
                                <span className= "icon is-small is-left" >
                                    <i className="material-icons">person</i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    onChange={e=>setPassword(e.target.value)}
                                />
                                <span className="icon is-small is-left">
                              <i className="material-icons right">lock</i>
                            </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button type="submit" className="button is-success">
                                    Войти
                                    <i className="material-icons right">send</i>
                                </button>
                            </p>
                            <p>
                                У вас нет аккаунта?
                                <Link to='/register'>Зарегистируйтесь!</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
