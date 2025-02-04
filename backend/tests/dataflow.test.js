const request = require("supertest");
const app = require("../app");

describe("Data Flow Validation", () => {
  let token;

  test("Successful login provides a token", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "1234" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("Login successful!");

    // Save token for subsequent tests
    token = response.body.token;
  });

  test("Accessing /profile with a valid token returns user data", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      name: "John Doe",
      email: "test@example.com"
    });
  });

  test("Accessing /profile without a token returns 403", async () => {
    const response = await request(app).get("/profile");

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

 test("Logging out invalidates access", async () => {
    const logoutResponse = await request(app).post("/logout");
    expect(logoutResponse.statusCode).toBe(200);
    expect(logoutResponse.body.message).toBe("Logged out successfully");

    const profileResponse = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(profileResponse.statusCode).toBe(403);
    expect(profileResponse.body.message).toBe("Unauthorized");
  }); 
});