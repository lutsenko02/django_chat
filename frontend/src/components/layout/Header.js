import React, { useContext } from 'react'
import { logout } from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../utils/UserContext";

function Header() {

    const {isAuth, setIsAuth} = useContext(UserContext);
    let navigate = useNavigate();

    return (
        <header>

            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="../../../static/img/9171503.png" alt=""/>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <a className="navbar-item" href="">
                                <i className="material-icons">home</i>
                                Домашняя страница
                            </a>
                            <a className="navbar-item" href="">
                                <i className="material-icons">notifications</i>
                                Уведомления
                            </a>
                            <a className="navbar-item" href="">
                                <i className="material-icons">person</i>
                                Обо мне
                            </a>
                            <div className="navbar-item">
                                <div className="buttons">
                                    <button
                                        className="button is-light"
                                        onClick={() => {
                                            logout();
                                            setIsAuth(false);
                                            navigate('/')
                                        }}
                                    >
                                        Выйти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header