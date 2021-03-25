import React, {useContext, useState, useEffect, useRef} from "react"
import { useHistory, useParams } from "react-router"
import {ContactContext} from "./ContactProvider"

export const ContactForm = (props) =>{
    const {addContact, updateContact, contacts, getContacts} = useContext(ContactContext)
    const chosenContact = props.location ? props.location.state.chosenContact : {}

    const history = useHistory()
    const [contact, setContact] = useState({
        id: chosenContact.id,
        name: chosenContact.name,
        relationship: chosenContact.relationship,
        contact: chosenContact.contact
    })

    const params = useParams()

    const editMode = params.hasOwnProperty("id")
    
    const handleControlledInputChange = (event) => {
        const newContact = Object.assign({}, contact)
        newContact[event.target.name] = event.target.value
        setContact(newContact)
    }

    const constructNewContact = () =>{
        if(editMode){
            updateContact(contact)
            
        } else {
            addContact({
                name: contact.name,
                relationship: contact.relationship,
                contact: contact.contact
            })
        }
    }
    return (
      <main className={editMode ? "centerForm" : <></>}>

        <form className={editMode ? "dataForm-div" : "modalForm-div"}>
        <div className="title">{editMode ? "Update Contact" : "Add Contact"}</div>
        <div className="fields">

          <div className="username">
            <input type="text" name="name" required autoFocus className="form-control"
              placeholder="Contact name"
              onChange={handleControlledInputChange}
              defaultValue={chosenContact.name}
              />
          </div>
          <div className="username">
            <input type="text" name="relationship" required autoFocus className="form-control"
              placeholder="Contact Relationship"
              onChange={handleControlledInputChange}
              defaultValue={chosenContact.relationship}
              />
          </div>
          <div className="username">
            <input type="text" name="contact" required autoFocus className="form-control"
              placeholder="Contact Information"
              onChange={handleControlledInputChange}
              defaultValue={chosenContact.contact}
              />
              </div>
          </div>
       
        
        <button type="submit"
          onClick={evt => {
            evt.preventDefault()
            constructNewContact()
            history.push("/contacts")
          }}
          className="dataForm-button">
          {editMode ? "Submit Contact" : "Save New Contact"}
        </button>
        {editMode ? <button className="dataForm-button" onClick={()=>{history.push("/contacts")}}>Close Form</button>:<></>}

      </form>
            </main>
    )
    
}