const validUser = { email: "test@example.com", password: "1234" };

// Login handler
const loginHandler = (req, res) => {
  const { email, password } = req.body;

  if (email === validUser.email && password === validUser.password) {
    return res.json({ token: "fake-jwt-token", message: "Login successful!" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

// Profile handler
const profileHandler = (req, res) => {
  const token = req.headers.authorization;

  if (token === "Bearer fake-jwt-token") {
    return res.json({ name: "John Doe", email: validUser.email });
  }

  return res.status(403).json({ message: "Unauthorized" });
};

// Logout handler
const logoutHandler = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  loginHandler,
  profileHandler,
  logoutHandler,
};