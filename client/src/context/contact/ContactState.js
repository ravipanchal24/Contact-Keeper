import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Manish Panchal',
                email: 'manish@gmail.com',
                phone: '123465798',
                type: 'personal'
            },

            {
                id: 2,
                name: 'Nishu',
                email: 'nishu@gmail.com',
                phone: '1111111111',
                type: 'personal'
            },

            {
                id: 3,
                name: 'Monika Panchal',
                email: 'monika@gmail.com',
                phone: '8888888888',
                type: 'professional'
            }
        ],
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = (contact) => {
        contact.id = uuidv4(); // generate random ID for contact ID
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // Set current contact 
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Update contact

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;