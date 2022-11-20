import React from "react";
import emailjs from "emailjs-com";

export default function EmailJS() {
    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_6m8e34d', 'template_zq8ufpg', e.target, 'R1lPD0MhKamSF5unB')
            .then((result) => {
                console.log(result.text);
                alert("Message sent successfully!");
            }, (error) => {
                console.log(error.text);
                alert("Message failed to send.");
            });
        e.target.reset()
    }

    return (
        <>
        <form onSubmit={sendEmail}>
            <div className="flex flex-col">
                <div>
                    <label>Name</label>
                    <input className="border" type="text" name="user_name" />
                </div>
                <div>
                    <label>Email</label>
                    <input className="border" type="email" name="user_email" />
                </div>
                <div>
                    <label>Message</label>
                    <textarea className="border" name="message" />
                </div>
                <div>
                    <input className="border" type="submit" value="Send" />
                </div>
            </div>
        </form>
        </>
    )
}