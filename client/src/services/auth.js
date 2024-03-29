//Auth service to handle the requests & responses to the server
const PORT = 8000;
const Host = "192.168.1.5";

export async function authLogin(username, password) {
  const response = await fetch(`http://${Host}:${PORT}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
}
export async function registerUser(
  username,
  password,
  confirmPassword,
  type,
  token
) {
  console.log(token);
  console.log("--------");
  const response = await fetch(`http://${Host}:${PORT}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username,
      password,
      confirmPassword,
      type,
    }),
  });
  const data = await response.json();
  return data;
}

export async function getUser(token) {
  const response = await fetch(`http://${Host}:${PORT}/api/v1/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getClasses(token) {
  const response = await fetch(`http://${Host}:${PORT}/api/v1/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
