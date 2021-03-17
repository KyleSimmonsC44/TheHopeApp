import React from "react";
import { Route } from "react-router-dom";
import { RehabList } from "./rehab/RehabList";
import { RehabProvider } from "./rehab/RehabProvider";
import {RehabDetails} from "./rehab/RehabDetail"
import { CategoryProvider } from "./categories/CategoryProvider";
import { CategoryList } from "./categories/CategoryList";
import { ContactProvider } from "./contacts/ContactProvider";
import { ContactList } from "./contacts/ContactList";
import { ContactForm } from "./contacts/ContactForm";

export const ApplicationViews = (props) => {
    return (
      <>
        <main
          style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem",
          }}
        >
        <RehabProvider>
          <Route exact path="/emergency" render={(props)=><RehabList {...props}/>}/>
          <Route exact path="/rehab/:id(\d+)" render={(props) => <RehabDetails {...props}/>}/>
        </RehabProvider>
        <CategoryProvider>
          <Route exact path="/category" render={(props)=><CategoryList {...props}/>}/>
        </CategoryProvider>
        <ContactProvider>
          <Route exact path="/contacts" render={(props)=><ContactList {...props}/>}/>
          <Route exact path="/contacts/create" render={(props)=><ContactForm {...props}/>}/>
          <Route exact path="/contacts/edit/:id(\d+)" render={(props)=><ContactForm {...props}/>}/>
        </ContactProvider>
        </main>
        </>
        )}