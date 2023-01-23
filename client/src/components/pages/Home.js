import React from "react";
import Contacts from "./../Contact/Contacts";
import ContactForm from "../Contact/ContactForm";
import ContactFilter from "../Contact/ContactFilter";

const Home = () => {
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
