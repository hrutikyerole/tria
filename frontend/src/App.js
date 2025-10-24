import { useState, useEffect, useMemo } from 'react';
import { UserPlus, Users, Mail, Phone, Search, X } from 'lucide-react';
import './App.css';

const API_URL = 'https://tria-6akbyk07q-hrutiks-projects-3ec64f20.vercel.app/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const query = searchQuery.toLowerCase();
    return contacts.filter(
      c =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.job_title.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  return (
    <div className="fullscreen-bg">
      <div className="main-content">
        <div className="header-enhanced">
          <div className="header-icon-enhanced">
            <Users size={40} color="#2563eb" />
          </div>
          <div className="header-texts">
            <h1 className="contact-heading">Contact List</h1>
            <p className="contact-count">
              {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
            </p>
          </div>
        </div>

        <div className="search-add-section">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={18} /> Add Contact
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="no-results">
            <Search size={40} color="gray" />
            <h3>No contacts found</h3>
            <p>Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="contacts-grid">
            {filteredContacts.map(contact => (
              <div key={contact.id} className="contact-card">
                <img src={contact.avatar_url} alt={contact.name} />
                <div>
                  <h3>{contact.name}</h3>
                  <p className="job">{contact.job_title}</p>
                  <p className="company">{contact.company}</p>
                  <a href={`mailto:${contact.email}`} className="email">
                    <Mail size={14} /> {contact.email}
                  </a>
                  {contact.phone && (
                    <div className="phone">
                      <Phone size={14} /> {contact.phone}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <AddContactModal onClose={() => setIsModalOpen(false)} onAdded={fetchContacts} />
        )}
      </div>
    </div>
  );
}

function AddContactModal({ onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    job_title: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', email: '', phone: '', company: '', job_title: '' });
    onAdded();
    onClose();
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Add New Contact</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {['name', 'email', 'phone', 'company', 'job_title'].map((field) => (
            <input
              key={field}
              required={field === 'name' || field === 'email'}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.replace('_', ' ').toUpperCase()}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
          ))}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
