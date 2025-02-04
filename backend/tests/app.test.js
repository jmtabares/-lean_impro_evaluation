const request = require("supertest");
const express = require("express");
const app = require("../app"); // Adjust this if needed

beforeAll(() => {
    // Start the app before tests
    server = app.listen(3001);
  });
  
  afterAll(() => {
    // Close the server after tests to prevent hanging
    server.close();
  });

describe("Backend API Endpoints", () => {
  test("POST /login with valid credentials returns success", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "1234" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("Login successful!");
  });

  test("POST /login with invalid credentials returns 401", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "invalid@example.com", password: "wrongpassword" });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  test("GET /profile with valid token returns user profile", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      name: "John Doe",
      email: "test@example.com"
    });
  });

  test("GET /profile with invalid token returns 403", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer invalid-token");

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  test("POST /logout returns successful message", async () => {
    const response = await request(app).post("/logout");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
  });
});