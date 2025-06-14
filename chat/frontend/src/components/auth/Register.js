import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {UserContext} from "../utils/UserContext";

function Register() {

    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordSecond, setPasswordSecond] = useState();
    const {isAuth, setIsAuth} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordSecond) {
            window.alert("Пароли не совпадают")
        } else {
            console.log("пароли совпали!")
            console.log(userName)
        }

        console.log(userName)
        console.log(userEmail)
        console.log(password)
        console.log(passwordSecond)
    }

    return (
        <div className="container pt-5">
            <div className="card">
                <div className="card-content">
                    <h3 className="title is-3">Регистрация</h3>
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
                        <div className="field" >
                            <p className="control has-icons-left has-icons-right" >
                                <input
                                    className="input"
                                    type = "email"
                                    placeholder = "Введите адрес эл. почты"
                                    id="userEmail"
                                    name="userEmail"
                                    onChange={e=>setUserEmail(e.target.value)}
                                />
                                <span className="icon is-small is-left">
                                    <i className="material-icons">email</i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Придумайте пароль"
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
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Введите пароль повторно"
                                    id="passwordSecond"
                                    name="passwordSecond"
                                    onChange={e=>setPasswordSecond(e.target.value)}
                                />
                                <span className="icon is-small is-left">
                                  <i className="material-icons right">lock</i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button type="submit" className="button is-success">
                                    Зарегистироваться
                                    <i className="material-icons right">send</i>
                                </button>
                            </p>
                            <br/>
                            <p>
                                Можете войти в приложение! <Link to='/login'>Войти!</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
