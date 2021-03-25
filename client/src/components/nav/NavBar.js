import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">

            <li className="navbar__item logoItem">
                <div className="navbar__logo"></div>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myposts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/contacts">Contact Management</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            {
                (localStorage.getItem("app_user") !== null) ? //? is similar to an if statement
                    <li className="nav-item">
                        <button className="contact-button"
                            onClick={() => {
                                localStorage.removeItem("app_user")
                                localStorage.removeItem("categoryId")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> : // : is similar to an else statement
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
