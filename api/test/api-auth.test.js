const { expect } = require("chai");
const axios = require("axios");
const { connection } = require("./utils");

const url = "http://localhost:4000";

describe("POST /auth/sign-up", function () {
  it("Create new user Success ", async function () {
    const dummyUser = {
      email: `email${Date.now()}@gmail.com`,
      password: "1234",
      firstName: "Yuval",
      lastName: "Chen",
    };
    const result = await axios.post(`${url}/auth/sign-up`, dummyUser);
    expect(result.status).equal(200);
    const query = `DELETE FROM vacations.users WHERE email = ?;`;
    await connection().execute(query, [dummyUser.email]);
  });
  it("Create new user With bad request (Password) ", async function () {
    try {
      const dummyEmail = `email${Date.now()}@gmail.com`;
      const dummyUser = {
        email: dummyEmail,
        password: "123",
        firstName: "Yuval",
        lastName: "Chen",
      };
      await axios.post(`${url}/auth/sign-up`, dummyUser);
      throw new Error("TEST FAILED");
    } catch (error) {
      expect(error?.response.status).equal(400);
    }
  });
  it("Create new user User already exist ", async function () {
    try {
      const dummyEmail = `email${Date.now()}@gmail.com`;
      const dummyUser = {
        email: dummyEmail,
        password: "1234",
        firstName: "Yuval",
        lastName: "Chen",
      };
      const result1 = await axios.post(`${url}/auth/sign-up`, dummyUser);
      expect(result1.data.message).equal("user successfully added!");
      await axios.post(`${url}/auth/sign-up`, dummyUser);
      throw new Error("TEST FAILED");
    } catch (error) {
      const email = JSON.parse(error.config.data).email;
      expect(error?.response.status).equal(409); 
      const query = `DELETE FROM vacations.users WHERE email = ?;`;
      await connection().execute(query, [email]);
    }
  });
});

describe("POST /auth/login", function () {
  it("Login with user Success ", async function () {
    const dummyUser = {
      email: `root@root.com`,
      password: "1234",
      firstName: "Test",
      lastName: "Test",
    };

    const resultLogin = await axios.post(`${url}/auth/login`, {
      email: dummyUser.email,
      password: dummyUser.password,
    });
    expect(typeof resultLogin.data.token).equal("string");
  });
  it("Login with user unauthorized", async function () {
    try {
      const dummyUser = {
        email: `email${Date.now()}gmail.com`,
        password: "1234",
        firstName: "Yuval",
        lastName: "Chen",
      };
      await axios.post(`${url}/auth/login`, {
        email: dummyUser.email,
        password: dummyUser.password,
      });
      throw new Error("TEST FAILED");
    } catch (error) {
      expect(error?.response.status).equal(401);
    }
  });
});
