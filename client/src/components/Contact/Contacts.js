import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return (
            <div style={{ padding: '70px' }}>
                <h2 style={{ style }}><i className='fa-regular fa-face-frown-open fa-bounce fa-lg' style={{ color: 'blue', padding: '0' }} /> No contacts to display</h2>
                <h3 style={{ marginLeft: '2em' }}>Please add some contacts</h3>
            </div>
        )
    }
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ?
                    filtered.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>)) :
                    contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>))
                }
            </TransitionGroup>
        </Fragment>
    )
}

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
}
export default Contacts;