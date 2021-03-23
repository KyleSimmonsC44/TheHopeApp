import React, {useContext, useEffect, useRef, useState} from "react"
import {ContactContext} from "./ContactProvider"
import {Link} from "react-router-dom"
import {Contact} from "./Contact"
import { ContactForm } from "./ContactForm"

export const ContactList = (props) =>{
    const {getContacts, contacts} = useContext(ContactContext)

    useEffect(() =>{
        getContacts()
    },[])

    const contactForm = useRef()
return(
    <div>
        <h3>Contacts</h3>
        <dialog ref={contactForm}><ContactForm props={props}/> <button onClick={() => {
                    contactForm.current.close()
                }}>Close Form
                </button></dialog>
        <button
          onClick={() => {
            contactForm.current.showModal();
          }}
        >Create A New Contact</button>
        {
            contacts.map(c => <Contact key={c.id} contact={c} props={props}/>)
        }
    </div>
)
}