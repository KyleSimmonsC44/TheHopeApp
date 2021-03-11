import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"


// Determine if user is authenticated by presence of the app_user_id key in local storage
export const TheHopeApp = (props) => (
    <>
        <Route render={props => {
            if (localStorage.getItem("app_user")) {
                return <>
                    <NavBar {...props}/>
                    <ApplicationViews {...props}/>
                </>
            } else {
                return <Redirect to="/login" {...props}/>
            }
        }} />

        <Route path="/login" render={props => {
            if (localStorage.getItem("app_user")) {
                return <Redirect to="/" {...props}/>
            } else {
                return <Login {...props}/>
            }
        }} />

        <Route path="/register" render={props => {
            if (localStorage.getItem("app_user")) {
                return <Redirect to="/" {...props}/>
            } else {
                return <Register {...props}/>
            }
        }} />
    </>
)