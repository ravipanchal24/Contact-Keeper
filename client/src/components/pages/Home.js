import React from "react";
import Contacts from "./../Contact/Contacts";
import ContactForm from "../Contact/ContactForm";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>

      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
