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
        <form className="contactForm">
        <h2 className="contactForm__title">{editMode ? "Update Contact" : "Add Contact"}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Contact Name: </label>
            <input type="text" name="name" required autoFocus className="form-control"
              placeholder="Contact name"
              onChange={handleControlledInputChange}
              defaultValue={chosenContact.name}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="relationship">Contact Relationship: </label>
            <input type="text" name="relationship" required autoFocus className="form-control"
              placeholder="Contact Relationship"
              onChange={handleControlledInputChange}
              defaultValue={chosenContact.relationship}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="contact">Contact Information: </label>
            <input type="text" name="contact" required autoFocus className="form-control"
              placeholder="Contact Information"
              onChange={handleControlledInputChange}
              defaultValue={chosenContact.contact}
            />
          </div>
        </fieldset>
       
        
        <button type="submit"
          onClick={evt => {
            evt.preventDefault()
            constructNewContact()
          }}
          className="btn btn-primary">
          {editMode ? "Submit Contact" : "Save New Contact"}
        </button>
        
      </form>
    )
    
}