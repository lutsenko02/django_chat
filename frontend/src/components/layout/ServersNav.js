import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ServersNav() {
    return (
        <div className="box">
            <ul>
                <li style={{ paddingTop: "15px", paddingLeft: "5px" }}>
                    <Link to='/createserver' className="button is-link is-small is-rounded">Создать</Link>
                </li>
                <li style={{ paddingTop: "15px", paddingLeft: "5px" }}>
                    <Link to='/EXPLORE' className="button is-link is-small is-rounded">EXPLORE</Link>
                </li>
            </ul>
        </div>
    )
}

export default ServersNav