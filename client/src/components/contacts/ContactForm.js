import React, {useContext, useState, useEffect} from "react"
import {ContactContext} from "./ContactProvider"

export const ContactForm = (props) =>{
    const {addContact, updateContact, contacts, getContacts} = useContext(ContactContext)
    const chosenContact = props.location.state ? props.location.state.chosenContact : {}

    const [contact, setContact] = useState({
        id: chosenContact.id,
        name: chosenContact.name,
        relationship: chosenContact.relationship,
        contact: chosenContact.contact
    })

    const editMode = props.match.params.hasOwnProperty("id")
    
    const handleControlledInputChange = (event) => {
        const newContact = Object.assign({}, contact)
        newContact[event.target.name] = event.target.value
        setContact(newContact)
    }

    const constructNewContact = () =>{
        if(editMode){
            updateContact(contact)
            .then(() => props.history.push("/contacts"))
        } else {
            addContact({
                name: contact.name,
                relationship: contact.relationship,
                contact: contact.contact
            }).then(()=> props.history.push("/contacts"))
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
        <button onClick={() => {
                    props.history.push(`/contacts`)
                }}>Back
                </button>
      </form>
    )
    
}