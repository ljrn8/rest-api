import React from "react";
import { useState } from "react";
import { getCustomer } from "../api/Customers";

export default function Verification() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [denied, setDenied] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    getCustomer(username)
      .then((customer) => {
        if (customer.password === password) {
          window.location.href = `/portal/${username}`;
        } else {
          setDenied("invalid password");
        }
      })
      .catch((e) => {
        // TODO bad coding -> exists request
        setDenied("username not found");
      });
  }

  return (
    <div className="Verification">
      <form onSubmit={handleSubmit}>
        <label>
          <h1>Log In</h1>
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {denied && <div style={{ color: "red" }}>{denied}</div>}
        <hr style={{ width: "100%", marginTop: "7vh" }} />
        <br />
        <input type="submit" />
        <br />
        <button
          id="registration-button"
          onClick={() => (window.location.href = "/registration")}
        >
          Create an account
        </button>
      </form>
    </div>
  );
}
