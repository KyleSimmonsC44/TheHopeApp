import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { RehabList } from "./rehab/RehabList";
import { RehabProvider } from "./rehab/RehabProvider";
import {RehabDetails} from "./rehab/RehabDetail"
import { CategoryProvider } from "./categories/CategoryProvider";
import { CategoryList } from "./categories/CategoryList";

// Determine if user is authenticated by presence of the app_user_id key in local storage
export const TheHopeApp = (props) => (
  <>
    <Route
      render={(props) => {
        if (localStorage.getItem("app_user") && localStorage.getItem("categoryId")) {
          return (
            <>
              <NavBar {...props} />
              <ApplicationViews {...props} />
            </>
          );
        } else if(localStorage.getItem("app_user") && !localStorage.getItem("categoryId")){
            return (
                <>
                  <Redirect to="/category" {...props} 
                   />
                            <CategoryProvider>
                            <Route exact path="/category" render={(props)=><CategoryList {...props}/>}/>
                            </CategoryProvider>

                </>
              );
        }
        else{
            return (
                <>
                  <Redirect to="/login" {...props} />
                  <RehabProvider>
                    <Route
                      exact
                      path="/emergency"
                      render={(props) => <RehabList {...props} />}
                    />
                    <Route exact path="/rehab/:id(\d+)" render={(props) => <RehabDetails {...props}/>}/>
                  </RehabProvider>
                </>
              );
        }
      }}
    />

    <Route
      path="/login"
      render={(props) => {
        if (localStorage.getItem("app_user")) {
          return <Redirect to="/" {...props} />;
        } else {
          return (
            <>
              <Login {...props} />
              <RehabProvider>
                <Route
                  exact
                  path="/emergency"
                  render={(props) => <RehabList {...props} />}
                />
                <Route exact path="/rehab/:id(\d+)" render={(props) => <RehabDetails {...props}/>}/>
              </RehabProvider>
            </>
          );
        }
      }}
    />

    <Route
      path="/register"
      render={(props) => {
        if (localStorage.getItem("app_user")) {
          return <Redirect to="/" {...props} />;
        } else {
          return (
            <>
              <Register {...props} />
              <RehabProvider>
                <Route
                  exact
                  path="/emergency"
                  render={(props) => <RehabList {...props} />}
                />
                <Route exact path="/rehab/:id(\d+)" render={(props) => <RehabDetails {...props}/>}/>
              </RehabProvider>
            </>
          );
        }
      }}
    />
  </>
);
