import React, { useState } from 'react';

const API_URL = 'http://localhost:4000/contacts';

const styles = {
  container: {
    maxWidth: 420,
    margin: '40px auto',
    padding: 32,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  },
headingBox: {
  background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
  padding: '18px 0',
  borderRadius: 10,
  boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
  marginBottom: 32,
},
heading: {
  textAlign: 'center',
  margin: 0,
  color: '#fff',
  fontSize: 32,
  fontWeight: 700,
  letterSpacing: '1px',
  textShadow: '0 2px 8px rgba(0,0,0,0.10)'
},
  form: {
    display: 'flex',
    gap: 8,
    marginBottom: 20
  },
  input: {
    flex: 1,
    width: '92%',
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #cbd5e1',
    fontSize: 16
  },
  button: {
    padding: '8px 16px',
    borderRadius: 6,
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactName: {
    fontWeight: 500,
    color: '#334155'
  },
  contactEmail: {
    color: '#64748b',
    fontSize: 14
  },
  suggestionBox: {
    background: '#f1f5f9',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    marginTop: 4,
    padding: 8,
    position: 'absolute',
    zIndex: 10,
    width: 'calc(100% - 16px)'
  },
  suggestionItem: {
    padding: '6px 8px',
    cursor: 'pointer',
    borderRadius: 4,
    fontSize: 15
  }
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showContacts, setShowContacts] = useState(false);

  const fetchContacts = async (name = '') => {
    const url = name ? `${API_URL}?name=${encodeURIComponent(name)}` : API_URL;
    const res = await fetch(url);
    const data = await res.json();
    setContacts(data);
  };

  // Fetch suggestions as user types
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const url = `${API_URL}?name=${encodeURIComponent(value)}`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearch(name);
    setSuggestions([]);
    fetchContacts(name);
    setShowContacts(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchContacts(search);
    setShowContacts(true);
    setSuggestions([]);
  };

  const handleViewContacts = () => {
    fetchContacts();
    setShowContacts(!showContacts);
    setSuggestions([]);
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });
    setNewName('');
    setNewEmail('');
    fetchContacts();
    setShowContacts(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headingBox}>
        <h2 style={styles.heading}>Contact List</h2>
      </div>
      <form onSubmit={handleSearch} style={styles.form}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            style={styles.input}
            autoComplete="off"
          />
          {search && suggestions.length > 0 && (
            <div style={styles.suggestionBox}>
              {suggestions.map(s => (
                <div
                  key={s.id}
                  style={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(s.name)}
                >
                  {s.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" style={styles.button}>Search</button>
      </form>
      <form onSubmit={handleAddContact} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add</button>
      </form>
      <button style={styles.button} onClick={handleViewContacts}>
        {showContacts ? 'Hide Contacts' : 'View Contacts'}
      </button>
      <br/><br/>
      {showContacts && (
        <ul style={styles.list}>
          {contacts.map(c => (
            <li key={c.id} style={styles.listItem}>
              <span style={styles.contactName}>{c.name}</span>
              <span style={styles.contactEmail}>{c.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;