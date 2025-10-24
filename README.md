# tria

<div>

<h1>Tria – Contact List Application</h1>

<p>This repository contains a full-stack contact list application, split into two folders:</p>
<ul>
  <li><strong>frontend/</strong>: The React client application.</li>
  <li><strong>backend/</strong>: The server API application.</li>
</ul>

<h2>🎯 Overview</h2>
<p>The goal of this project was to build a contact-list experience where users can view, search, and manage contacts via a clean UI (frontend) backed by a REST API (backend). This application demonstrates separation of concerns, frontend-backend interaction, and componentised development.</p>

<h2>📦 Tech Stack</h2>
<ul>
  <li>Frontend: React (with appropriate tooling as per <code>frontend/package.json</code>).</li>
  <li>Backend: Node.js / Express (or similar) – see <code>backend/package.json</code> for details.</li>
  <li>Data interaction: REST APIs between frontend & backend.</li>
  <li>Styling / UI: (mention your choice – Tailwind CSS / CSS Modules / Styled Components) as reflected in the code.</li>
</ul>

<h2>🚀 Getting Started</h2>
<ol>
  <li>Clone the repository:<br>
  <code>git clone https://github.com/hrutikyerole/tria.git</code></li>
  <li>Navigate into the directory:<br>
  <code>cd tria</code></li>
  <li>Install dependencies for frontend:<br>
  <code>cd frontend && npm install</code></li>
  <li>Install dependencies for backend:<br>
  <code>cd ../backend && npm install</code></li>
  <li>Start both servers (in separate terminals):<br>
    <ul>
      <li>Frontend: <code>npm start</code> (or appropriate script in frontend folder)</li>
      <li>Backend: <code>npm run dev</code> (or the designated backend start script)</li>
    </ul>
  </li>
  <li>Open your browser to the frontend (e.g., <code>http://localhost:3000</code> or as configured) and ensure the backend API is reachable.</li>
</ol>

<h2>📁 Folder Structure</h2>
<pre>
tria/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── …
└── backend/
    ├── src/
    ├── routes/
    ├── models/
    ├── package.json
    └── …
</pre>

<h2>🧠 Key Implementation Notes</h2>
<ul>
  <li>The frontend consumes API endpoints exposed by the backend to fetch, search, and manage contacts.</li>
  <li>Component design: Reusable UI components in the React frontend allow extensibility.</li>
  <li>API design: The backend provides RESTful endpoints (CRUD) for contacts.</li>
  <li>Separation: Keeping frontend and backend in separate folders ensures clarity and deploy-readiness.</li>
</ul>

<h2>📋 Assumptions & Scope</h2>
<ul>
  <li>The contacts data includes basic contact fields (e.g., name, email, phone number).</li>
  <li>Authentication/authorization is **not** (or only minimally) implemented depending on assignment scope.</li>
  <li>Data persistence may use in-memory, file-based or simple DB depending on backend implementation.</li>
  <li>Focus was on frontend functionality, responsive design, and clean API interaction.</li>
</ul>

<h2>🏆 Learnings & Takeaways</h2>
<p>Through this project you will highlight your experience with:</p>
<ul>
  <li>React component architecture and state management.</li>
  <li>Frontend-backend integration via REST APIs.</li>
  <li>Maintaining a clean folder structure and deployment readiness.</li>
  <li>Writing clean, maintainable code aiming for production quality.</li>
</ul>

<h2>👤 Author</h2>
<p><strong>Hrutik Yerole</strong></p>
<p>GitHub: <a href="https://github.com/hrutikyerole">github.com/hrutikyerole</a></p>

<h2>📝 License</h2>
<p>This project is open-source and available under the MIT Licence (see the <code>LICENSE</code> file).</p>

</div>
