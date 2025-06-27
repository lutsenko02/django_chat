import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from "./utils/UserContext";

import Header from "./layout/Header"
import Footer from "./layout/Footer"
import ServersNav from "./layout/ServersNav"
import Server from "./layout/Server"

function Home() {
    // const {isAuth, setIsAuth} = useContext(UserContext);
    // let navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className="columns">
                <div className="columns is-1">
                    <ServersNav />
                </div>
                <div className="columns is-11">
                    <Server />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
