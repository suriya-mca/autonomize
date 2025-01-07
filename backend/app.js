const express = require('express');
const bodyParser = require('body-parser');
const { initTable } = require('./models/userModel');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Initialize database tables
initTable().then(() => console.log('Tables initialized'));

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
