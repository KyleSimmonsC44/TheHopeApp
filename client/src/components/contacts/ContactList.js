import React, {useContext, useEffect, useState} from "react"
import {ContactContext} from "./ContactProvider"
import {Link} from "react-router-dom"
import {Contact} from "./Contact"

export const ContactList = (props) =>{
    const {getContacts, contacts} = useContext(ContactContext)

    useEffect(() =>{
        getContacts()
    },[])

return(
    <div>
        <h3>Contacts</h3>
        <Link to={'/contacts/create'}>Create A New Contact</Link>
        {
            contacts.map(c => <Contact key={c.id} contact={c} props={props}/>)
        }
    </div>
)
}