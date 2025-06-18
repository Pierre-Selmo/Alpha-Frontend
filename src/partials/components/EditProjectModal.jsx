/* Genererad med hjälp av chatgpt */

import React, { useState, useEffect } from "react";

const EditProjectModal = ({ project, onClose, onProjectUpdated }) => {
  const [form, setForm] = useState({
    id: "",
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: 0,
    clientId: "",
    statusId: 1,
    userId: ""
  });

  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setForm({
      id: project.id,
      projectName: project.projectName,
      description: project.description || "",
      startDate: project.startDate.slice(0, 10),
      endDate: project.endDate.slice(0, 10),
      budget: parseFloat(project.budget),
      clientId: project.client?.id || project.clientId || "",
      statusId: project.status?.id || project.statusId || 1,
      userId: project.user?.id || project.userId || ""
    });
  }, [project]);

  useEffect(() => {
    const fetchClientsAndUsers = async () => {
      try {
        const [clientsRes, usersRes] = await Promise.all([
          fetch("https://alphabackend-btcxbbekfmdmeaa7.northeurope-01.azurewebsites.net/api/clients", {
            headers: { "x-api-key": "my-super-secret-key" }
          }),
          fetch("https://alphabackend-btcxbbekfmdmeaa7.northeurope-01.azurewebsites.net/api/users", {
            headers: { "x-api-key": "my-super-secret-key" }
          })
        ]);

        const [clientsData, usersData] = await Promise.all([
          clientsRes.json(),
          usersRes.json()
        ]);

        setClients(clientsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Fel vid hämtning av klienter/användare:", err);
      }
    };

    fetchClientsAndUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://alphabackend-btcxbbekfmdmeaa7.northeurope-01.azurewebsites.net/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "my-super-secret-key"
        },
        body: JSON.stringify(form)
        
      });

      if (!res.ok) throw new Error("Misslyckades uppdatera projekt");

      onProjectUpdated(form);
      onClose();
    } catch (err) {
      console.error("Fel:", err.message);
      alert("Det gick inte att uppdatera projektet.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Edit Project</h2>
          <button className="btn-close" onClick={onClose}></button>
        </header>

        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
                placeholder="Projektnamn"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Beskrivning"
              />
            </div>

            <div className="form-group">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <select name="clientId" value={form.clientId} onChange={handleChange} required>
                <option value="">Välj klient</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select name="userId" value={form.userId} onChange={handleChange} required>
                <option value="">Välj projektägare</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select name="statusId" value={form.statusId} onChange={handleChange} required>
                <option value={3}>Not Started</option>
                <option value={1}>In Progress</option>
                <option value={2}>Completed</option>
              </select>
            </div>

            <button className="btn btn-submit" type="submit">
              Save Changes
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProjectModal;
