const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); 
app.use(express.json());

let contacts = [
    { id: 1, name: 'Hrutik Yerole', email: 'hrutik@gmail.com' },
    { id: 2, name: 'Nikhil Yadav', email: 'nikhil@gmail.com' }
];

app.get('/', (req, res) => {
    res.send('Contact API is running');
});

// Get all contacts or search by name (prefix match)
app.get('/contacts', (req, res) => {
    const { name } = req.query;
    if (name) {
        const filtered = contacts.filter(c =>
            c.name.toLowerCase().startsWith(name.toLowerCase())
        );
        res.json(filtered);
    } else {
        res.json(contacts);
    }
});

// Add a new contact
app.post('/contacts', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email required' });
    }
    const newContact = {
        id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
        name,
        email
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});