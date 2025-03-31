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

let activeUsers = {};

app.post('/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const username = req.body.username;

  if (activeUsers[username]) {
    console.log('User already logged in:', username);
    return res.status(403).send('User is already logged in');
  }

  req.session.username = username;
  activeUsers[username] = true;
  console.log('User logged in:', username);
  res.send('Login successful');
});

app.post('/logout', (req, res) => {
  const username = req.session.username;
  console.log('Logout attempt:', username);

  if (username) {
    delete activeUsers[username];
    req.session.destroy(err => {
      if (err) {
        console.log('Logout failed:', err);
        return res.status(500).send('Logout failed');
      }
      console.log('User logged out:', username);
      res.send('Logout successful');
    });
  } else {
    res.send('No user logged in');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
