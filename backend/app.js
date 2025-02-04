const express = require("express");
const cors = require("cors");
const { loginHandler, profileHandler, logoutHandler } = require("./handlers");
console.log({ loginHandler, profileHandler, logoutHandler });
const app = express();
app.use(cors());
app.use(express.json());

// Define routes and use the handlers
app.post("/login", loginHandler);
app.get("/profile", profileHandler);
app.post("/logout", logoutHandler);

// Export the app for testing purposes
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
  const PORT = 3001;
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
}