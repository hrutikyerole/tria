const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://tria-y9dq.vercel.app/', credentials: true
}));
app.use(express.json());

let contacts = [
  {
    id: 1,
    name: 'Hrutik Yerole',
    email: 'hrutik@gmail.com',
    phone: '+91 99999 11111',
    company: 'IIT Kharagpur',
    job_title: 'Student',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hrutik%20Yerole'
  },
  {
    id: 2,
    name: 'Nikhil Yadav',
    email: 'nikhil@gmail.com',
    phone: '+91 88888 22222',
    company: 'Microsoft',
    job_title: 'SWE II',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil%20Yadav'
  },
  {
    id: 3,
    name: 'Yash Priyadarshy',
    email: 'yash@gmail.com',
    phone: '+91 77777 33333',
    company: 'Google',
    job_title: 'SWE Intern',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yash%20Priyadarshy'
  },
  {
    id: 4,
    name: 'Anirban Halder',
    email: 'anirban@gmail.com',
    phone: '+91 88888 22233',
    company: 'Zepto',
    job_title: 'SDE Intern',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anirban%20Halder'
  },
  {
    id: 5,
    name: 'Dhatrik Sharma',
    email: 'dhatrik@gmail.com',
    phone: '+91 88888 33333',
    company: 'Amazon',
    job_title: 'SWE I',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dhatrik%20Sharma'
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Contact API is running');
});

// Get all contacts or search
app.get('/contacts', (req, res) => {
  const { name } = req.query;
  if (name) {
    const filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filtered);
  } else {
    res.json(contacts);
  }
});

// Add contact
app.post('/contacts', (req, res) => {
  const { name, email, phone, company, job_title } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const avatar_url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  const newContact = {
    id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
    name,
    email,
    phone: phone || '',
    company: company || '',
    job_title: job_title || '',
    avatar_url
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
