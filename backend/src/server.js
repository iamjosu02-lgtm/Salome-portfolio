const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio backend is running',
    status: 'ok'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    service: 'portfolio-backend',
    status: 'healthy'
  });
});

app.get('/api/profile', (req, res) => {
  res.json({
    fullName: 'Salome Rajabu Rashidi',
    role: 'Data Science Student',
    focus: ['Machine Learning', 'Cloud Computing', 'Frontend Development'],
    bio: [
      'Salome is a dedicated Data Science learner with strong interest in machine learning, cloud technologies, and modern web development.',
      'She enjoys building polished digital experiences, working with data, and delivering practical solutions that create real value.',
      'Her focus is to grow into a professional who combines technical depth, creativity, and consistent execution in every project.'
    ]
  });
});

app.get('/api/skills', (req, res) => {
  res.json({
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Git & GitHub',
      'Cloud Deployment'
    ]
  });
});

app.get('/api/contact', (req, res) => {
  res.json({
    email: 'salomerajabu387@gmail.com',
    phone: '0679708416',
    location: 'Tanzania'
  });
});

app.listen(PORT, () => {
  console.log(`Backend API is running on port ${PORT}`);
});
