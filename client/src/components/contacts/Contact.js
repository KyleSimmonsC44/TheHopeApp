import React, { useContext } from "react"
import {ContactContext} from "./ContactProvider"
import "./Contact.css"

export const Contact = ({contact, props}) =>{
    const {deleteContact} = useContext(ContactContext)

    return(
        <div className="contact-card">
            Name : {contact.name}<br/>
            Relationship : {contact.relationship}<br/>
            Contact Information : {contact.contact}<br/>
            <div className="button-box">
            <button className="contact-button" onClick={()=>{
                deleteContact(contact.id)
            }}>
                Delete Contact
            </button>
            <button className="contact-button" onClick={() =>{
                props.history.push({
                    pathname: `contacts/edit/${contact.id}`,
                    state:{chosenContact: contact}
                })
            }}>
                Edit Contact
            </button>
                </div>
        </div>
    )
}