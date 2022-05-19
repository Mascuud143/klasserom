//class service to handle the requests & responses to the server

export async function createClass(token, { name, school, room }) {
  const response = await fetch(`http://127.0.0.1:8080/api/v1/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      school,
      room,
      klasseKode: null,
    }),
  });
  const data = await response.json();
  return data;
}
export async function getClasses(token) {
  const response = await fetch(`http://127.0.0.1:8080/api/v1/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
export async function joinClass(code) {
  const response = await fetch(`http://127.0.0.1:8080/api/v1/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function createStudent(token, name, classId) {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/classes/${classId}/students/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
      }),
    }
  );
  const data = await response.json();
  return data;
}

export async function getClass(token, className) {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/classes/${className}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
export async function getStudents(token, className) {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/classes/${className}/students/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
export async function saveGroups(token, title, members, className) {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/classes/${className}/groups/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        members: members,
      }),
    }
  );
  const data = await response.json();
  return data;
}
export async function getGroups(token, className) {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/classes/${className}/groups/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
