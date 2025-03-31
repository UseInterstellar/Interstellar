const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Track active users
let activeUsers = {};

app.post('/login', (req, res) => {
  const username = req.body.username;

  if (activeUsers[username]) {
    return res.status(403).send('User is already logged in');
  }

  req.session.username = username;
  activeUsers[username] = true;
  res.send('Login successful');
});

app.post('/logout', (req, res) => {
  const username = req.session.username;

  if (username) {
    delete activeUsers[username];
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Logout failed');
      }
      res.send('Logout successful');
    });
  } else {
    res.send('No user logged in');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
