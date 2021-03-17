import React, { useContext } from "react"
import {ContactContext} from "./ContactProvider"

export const Contact = ({contact, props}) =>{
    const {deleteContact} = useContext(ContactContext)

    return(
        <div>
            Name : {contact.name}<br/>
            Relationship : {contact.relationship}<br/>
            Contact Information : {contact.contact}<br/>
            <button onClick={()=>{
                deleteContact(contact.id)
            }}>
                Delete Contact
            </button>
            <button onClick={() =>{
                props.history.push({
                    pathname: `contacts/edit/${contact.id}`,
                    state:{chosenContact: contact}
                })
            }}>
                Edit Contact
            </button>
        </div>
    )
}