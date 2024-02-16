const config = {
  challenge: true,
  users: {
    // username: 'password', you can add multiple users.
  },
};

// Assigning properties dynamically
config.users[process.env.USER1] = process.env.USER1P;
config.users[process.env.USER2] = process.env.USER2P;
config.users[process.env.USER3] = process.env.USER3P;
config.users.interstellar = 'password';

export default config;
