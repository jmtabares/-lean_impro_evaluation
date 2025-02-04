const request = require("supertest");
const app = require("../app");

describe("Security Tests - SQL Injection Prevention", () => {
  it("should return 401 for SQL injection attempt on login", async () => {
    const res = await request(app).post("/login").send({
      email: "' OR 1=1 --",
      password: "1234",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});

describe("Security Tests - XSS Prevention", () => {
    it("should prevent XSS in email input", async () => {
      const res = await request(app).post("/login").send({
        email: "<script>alert('XSS')</script>",
        password: "1234",
      });
      expect(res.statusCode).toBe(401); // Should not execute JavaScript; treated as invalid credentials
    });
  });

  describe("Security Tests - Authorization", () => {
    it("should return 403 when accessing /profile without valid token", async () => {
      const res = await request(app)
        .get("/profile")
        .set("Authorization", "Bearer invalid-token");
  
      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Unauthorized");
    });
  });  
  describe("Security Tests - CSRF Prevention Test", () => {
    it("should reject requests from unauthorized origins", async () => {
        const res = await request(app)
          .post("/login")
          .set("Origin", "http://malicious.com")
          .send({ email: "test@example.com", password: "1234" });
        expect(res.statusCode).toBe(403); 
      });
  });

  