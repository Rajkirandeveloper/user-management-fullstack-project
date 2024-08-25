const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors=require('cors')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);

pool.getConnection().then(() => {
  app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
}).catch((err) => console.log('Error connecting to the database', err));


// const express = require('express');
// const dotenv = require('dotenv');
// const pool = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/users', profileRoutes);

// pool.getConnection().then(() => {
//   app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
// }).catch((err) => console.log('Error connecting to the database', err));
