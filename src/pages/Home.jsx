import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const API_URL = "https://playground.4geeks.com/contact/agendas/beatriz24BCN";

  
  const getContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE"
      });
      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="container mt-5">

      
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate("/add")}
        >
          Add new contact
        </button>
      </div>

      
      {contacts.length === 0 ? (
        <p>No contacts</p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="card mb-3 p-3 d-flex flex-row align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">

              
              <img
                src="https://i.pravatar.cc/100"
                className="rounded-circle me-3"
                alt=""
              />

              
              <div>
                <h5>{contact.name}</h5>

                <p className="mb-1">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {contact.address}
                </p>

                <p className="mb-1">
                  <i className="fas fa-phone me-2"></i>
                  {contact.phone}
                </p>

                <p className="mb-0">
                  <i className="fas fa-envelope me-2"></i>
                  {contact.email}
                </p>
              </div>
            </div>

            
            <div>
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => navigate(`/edit/${contact.id}`)}
              >
                ✏️
              </button>

              <button
                className="btn btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={() => setSelectedId(contact.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}

      
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              If you delete this thing the entire universe will go down!
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Oh no!
              </button>

              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deleteContact(selectedId)}
              >
                Yes baby!
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};