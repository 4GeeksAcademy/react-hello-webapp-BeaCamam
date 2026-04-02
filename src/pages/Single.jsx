import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Single = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = "https://playground.4geeks.com/contact/agendas/beatriz24BCN";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const getSingleContact = async () => {
    if (!id) return;

    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();

      const contact = data.contacts.find(c => c.id == id);

      if (contact) {
        setFormData({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSave = async () => {
    try {
      if (id) {
        
        await fetch(`${API_URL}/contacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      } else {
        
        await fetch(`${API_URL}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      }

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleContact();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {id ? "Edit contact" : "Add a new contact"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="form-control mb-3"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        className="form-control mb-3"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="form-control mb-3"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        className="form-control mb-3"
        value={formData.address}
        onChange={handleChange}
      />

      <button
        className="btn btn-primary w-100"
        onClick={handleSave}
      >
        Save
      </button>

      <p
        className="mt-3 text-center"
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/")}
      >
        or get back to contacts
      </p>
    </div>
  );
};
