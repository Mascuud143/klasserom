import React from "react";

import { registerUser } from "../services/auth";

export default function Admin({ userClass }) {
  console.log(userClass);
  async function createUser(e) {
    e.preventDefault();
    const { username, password, confirmPassword, type } = e.target;
    const token = localStorage.getItem("token");
    console.log(token);
    const user = await registerUser(
      username.value,
      password.value,
      confirmPassword.value,
      type.value,
      token
    );

    console.log(user);
  }

  return (
    <div>
      <h1>Admin</h1>

      <h2>Lag ny brukere</h2>
      <form onSubmit={createUser} action="#">
        <label htmlFor="username">Brukernavn</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirm-password" />
        <label htmlFor="type">type</label>
        <select name="type" id="type">
          <option value="TEACHER">TEACHER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit">Lag ny bruker</button>
      </form>
    </div>
  );
}
