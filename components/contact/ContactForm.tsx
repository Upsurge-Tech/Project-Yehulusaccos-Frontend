import React, { useState } from "react";
import Spinner from "./Spinner";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const tContactForm = useTranslations("ContactUs.ContactForm");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const ButtonText = tContactForm("Button");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/mwkggpqv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          city,
          reason,
          message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFullname("");
        setEmail("");
        setPhone("");
        setCity("");
        setReason("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg p-8">
      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/f/mwkggpqv"
        method="POST"
      >
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">
            {tContactForm("FullName")}
          </label>
          <input
            type="text"
            placeholder="Your fullname"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 shadow-sm rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">{tContactForm("Email")}</label>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 shadow-sm bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">
            {tContactForm("PhoneNumber")}
          </label>
          <input
            type="tel"
            placeholder="Your phone number"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">{tContactForm("City")}</label>
          <input
            type="text"
            placeholder="Your city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">
            {tContactForm("Reason")}
          </label>
          <input
            type="text"
            placeholder="Your reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">
            {tContactForm("YourMessage")}
          </label>
          <textarea
            placeholder="Your message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded"
        >
          {loading ? <Spinner /> : ButtonText}
        </button>
      </form>
      {status && (
        <div
          className={`mt-4 md:text-lg text-md text-center ${status === "success" ? "text-primary" : "text-red-600"}`}
        >
          {status === "success"
            ? "Your response has been recorded successfully!"
            : "Failed to send message."}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
