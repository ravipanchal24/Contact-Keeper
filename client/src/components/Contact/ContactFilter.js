import React, { useContext, useRef, useEffect, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, []);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="filterBox">
      <input
        type="text"
        ref={text}
        onChange={onChange}
        placeholder="Filter Contacts..."
      />
      {filtered &&
        <i className="fa-solid fa-xmark-circle fa-lg" onClick={() => { text.current.value = ''; clearFilter(); }} /> }
    </div>
  );
};

export default ContactFilter;
