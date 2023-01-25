import React, { useContext, useEffect } from "react";
import Contacts from "./../Contact/Contacts";
import ContactForm from "../Contact/ContactForm";
import ContactFilter from "../Contact/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser(localStorage.getItem('token'));
    // eslint-disable-next-line
  }, [])
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>

      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
