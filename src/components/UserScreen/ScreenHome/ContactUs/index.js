import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "../../NavBar";
import "./style.css";
import { useLocation } from "react-router-dom";

export const ContactUs = () => {
  const form = useRef();
  const { state } = useLocation();

  const [isDialogShown, setIsDialogShown] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("gmail", "template_bbp6ivy", form.current, "UIL5eTIcKg7otEk_r")
      .then(
        (result) => {
          setIsDialogShown(true);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const createInput = ({ placeholder, setState, type = "text", name = "" }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={(e) => {
            setState(e.target.value);
          }}
          className="input"
        />
      </div>
    );
  };
  const buildAlertDialog = ({ bgColor, color, text, text2 }) => {
    setTimeout(() => {
      setIsDialogShown(false);
    }, 2500);
    return (
      <div id="Alert">
        <div style={{ backgroundColor: `${bgColor}` }}>
          <p>
            <strong style={{ color: `${color}` }}>{text}</strong>
            <br />
            <small style={{ color: `${color}` }}>{text2}</small>
          </p>
        </div>
      </div>
    );
  };
  return (
    <div>
      <NavBar />
      {isDialogShown ? (
        buildAlertDialog({
          bgColor: "green",
          color: "white",
          text: "Email is sended successfully :)",
          text2: state ? "We will contact you soon :)":"Thanks for your time",
        })
      ) : (
        <></>
      )}
      <div id="contact-us-div">
        <img src="https://usercontent.one/wp/www.alltopeverything.com/wp-content/uploads/2020/08/fast-food-chains-1024x640.png?media=1644168245" />
        <div>
          
        </div>
        <div id="contact-us-form">
          <div id="contact-us-form-inner">
            <h2>{state ? "JOIN US" : "FEEDBACK"} </h2>
            <hr />
            <br />

            {state ? (
              <div>
                <p>
                  <span> One step </span>
                  separates you from creating your restaurant and control its
                  flow, fill more tables and add your employees. Bring all your
                  orders ,meals and restaurant data into one place so you can do
                  what you want.
                </p>
                <br />
                <h4>What Should I Do?</h4>
                <p>
                  Send us your connection data and the details about your
                  restaurant using the form below then we will contact you as
                  soon as possible :)
                </p>
              </div>
            ) : (
              <p>
                Your feedback will help us to improve our site please send us your
                feedback and thank you for your time :)
              </p>
            )}

            <br />
            <form ref={form} onSubmit={sendEmail}>
              {createInput({
                placeholder: "First Name",
                type: "text",
                key: "FirstName",
                name: "fname",
              })}
              {createInput({
                placeholder: "Last Name",
                type: "text",
                key: "LastName",
                name: "lname",
              })}

              {createInput({
                placeholder: "Email",
                type: "email",
                name: "email",
              })}
              {createInput({
                placeholder: "Phone",
                type: "phone",
                name: "phone",
              })}
              <textarea
                placeholder={state?"Details About Your Restaurants":"Details About Your Feedback"}
                name="message"
              />

              <input className="input" id="submit" type="submit" value="Send" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
