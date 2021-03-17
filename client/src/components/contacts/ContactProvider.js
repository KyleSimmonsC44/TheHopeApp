import React, {useState, useEffect, useContext} from "react"

export const ContactContext = React.createContext()

export const ContactProvider = (props) =>{
    const [contacts, setContacts] = useState([])

    const getContacts = () =>{
        return fetch("http://localhost:8000/contacts",{
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`
            },
        })
            .then(res => res.json())
            .then((res)=>setContacts(res))
    }

    const updateContact = (contact) =>{
        return fetch(`http://localhost:8000/contacts/${contact.id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("app_user")}`
            },
            body: JSON.stringify(contact)
        })
        .then(getContacts)
    }

    const addContact = (contact) =>{
        return fetch("http://localhost:8000/contacts",{
            method:"POST",
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        .then((res)=>res.json())
        .then(()=>getContacts())
    }

    const deleteContact = (id) =>{
        return fetch(`http://localhost:8000/contacts/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`
            },
        })
        .then(()=>getContacts())
    }

    return(
        <ContactContext.Provider value={{
            deleteContact, addContact, updateContact, getContacts, contacts, setContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}