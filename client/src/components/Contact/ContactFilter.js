import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
    // eslint-disable-next-line
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
        placeholder="Search Contacts..."
      />
      {filtered === null && 
        <i className="fa-solid fa-magnifying-glass fa-lg" />}
      {filtered &&
        <i className="fa-solid fa-xmark-circle fa-lg" onClick={() => { text.current.value = ''; clearFilter(); }} />}
    </div>
  );
};

export default ContactFilter;
