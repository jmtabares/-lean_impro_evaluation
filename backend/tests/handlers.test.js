const { loginHandler, profileHandler, logoutHandler } = require("../handlers");

describe("Unit Tests for Handlers", () => {
  test("loginHandler returns token with correct credentials", () => {
    const req = {
      body: { email: "test@example.com", password: "1234" }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    loginHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      token: "fake-jwt-token",
      message: "Login successful!"
    });
  });

  test("loginHandler returns 401 with incorrect credentials", () => {
    const req = {
      body: { email: "wrong@example.com", password: "wrongpassword" }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    loginHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid credentials"
    });
  });

  test("profileHandler returns user data with valid token", () => {
    const req = {
      headers: { authorization: "Bearer fake-jwt-token" }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    profileHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      name: "John Doe",
      email: "test@example.com"
    });
  });

  test("profileHandler returns 403 with invalid token", () => {
    const req = {
      headers: { authorization: "Bearer invalid-token" }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    profileHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized"
    });
  });

  test("logoutHandler returns success message", () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    logoutHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Logged out successfully" });
  });
});