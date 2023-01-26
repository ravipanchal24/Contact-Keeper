import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useEffect } from 'react';
import Spinner from './../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return (
            <div style={{ padding: '70px' }}>
                <h2 style={{ noContactsToShow }}><i className='fa-regular fa-face-frown-open fa-bounce fa-lg' style={{ color: 'blue', verticalAlign: '-0.11em' }} /> No contacts to display</h2>
                <h3 style={{ marginLeft: '2em' }}>Please add some contacts</h3>
            </div>
        )
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null ?
                        filtered.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>)) :
                        contacts.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>))
                    }
                </TransitionGroup>
            ) : <Spinner />}

        </Fragment>
    )
}

const noContactsToShow = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
}
export default Contacts;