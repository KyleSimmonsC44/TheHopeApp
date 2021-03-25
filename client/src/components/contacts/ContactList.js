import React, {useContext, useEffect, useRef, useState} from "react"
import {ContactContext} from "./ContactProvider"
import {Link} from "react-router-dom"
import {Contact} from "./Contact"
import { ContactForm } from "./ContactForm"
import "./Contact.css"

export const ContactList = (props) =>{
    const {getContacts, contacts} = useContext(ContactContext)

    useEffect(() =>{
        getContacts()
    },[])

    const contactForm = useRef()
return(
    <div>
        <h3 className="titleH3">Contacts</h3>
        <dialog className="dataForm-div" ref={contactForm}><ContactForm props={props}/> <button className="dataForm-button" onClick={() => {
                    contactForm.current.close()
                }}>Close Form
                </button></dialog>
                <div className="buttonDiv">
        <button
        className="contactForm-button"
        onClick={() => {
            contactForm.current.showModal();
        }}
        >Create A New Contact</button>
        </div>
        <div className="contacts-div">

        {
            contacts.map(c => <Contact key={c.id} contact={c} props={props}/>)
        }
        </div>
    </div>
)
}