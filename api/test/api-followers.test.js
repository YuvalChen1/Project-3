const { expect } = require("chai");
const axios = require("axios");
const { getTokenForNonAdmin, connection } = require("./utils");

const url = "http://localhost:4000";

const dummyUser = {
  firstName: "Test",
  lastName: "Test",
  email: "test1234@gmail.com",
  password: "1111",
  role: "user",
  salt: "1111",
};

describe("POST /add follower", function () {
  it("add follower success", async function () {
    const query =
      "INSERT INTO vacations.`users`(firstName, lastName, email, password, role, salt) VALUES (?,?,?,?,?,?);";
    const connectionResult = await connection().execute(query, [
      dummyUser.firstName,
      dummyUser.lastName,
      dummyUser.email,
      dummyUser.password,
      dummyUser.role,
      dummyUser.salt,
    ]);
    const { insertId } = connectionResult[0];
    const Token = getTokenForNonAdmin();
    const result = await axios.post(
      `${url}/followers/new`,
      {
        userId: insertId,
        vacationId: 1,
      },
      {
        headers: { authorization: Token },
      }
    );
    expect(result.status).equal(200);
    const query2 = `DELETE FROM vacations.users WHERE id = ?;`;
    await connection().execute(query2, [insertId]);
  });

  it("add follower fail (invalid token)", async function () {
    try {
      const query =
        "INSERT INTO vacations.`users`(firstName, lastName, email, password, role, salt) VALUES (?,?,?,?,?,?);";
      const connectionResult = await connection().execute(query, [
        dummyUser.firstName,
        dummyUser.lastName,
        dummyUser.email,
        dummyUser.password,
        dummyUser.role,
        dummyUser.salt,
      ]);
      const { insertId } = connectionResult[0];
      const Token = getTokenForNonAdmin();
      await axios.post(
        `${url}/followers/new`,
        {
          userId: insertId,
          vacationId: 1,
        },
        {
          headers: { authorization: Token + 1 },
        }
      );
      throw new Error("error");
    } catch (error) {
      const userId = JSON.parse(error.config.data).userId;
      expect(error?.response.status).equal(401);
      const query2 = `DELETE FROM vacations.users WHERE id = ?;`;
      await connection().execute(query2, [userId]);
    }
  });
});

describe("Delete /delete follower", function () {
  it("delete follower success", async function () {
    const query =
      "INSERT INTO vacations.`users`(firstName, lastName, email, password, role, salt) VALUES (?,?,?,?,?,?);";
    const connectionResult = await connection().execute(query, [
      dummyUser.firstName,
      dummyUser.lastName,
      dummyUser.email,
      dummyUser.password,
      dummyUser.role,
      dummyUser.salt,
    ]);
    const { insertId } = connectionResult[0];
    const query2 =
      "INSERT INTO vacations.`followers`(userId, vacationId) VALUES (?,?);";
    await connection().execute(query2, [insertId, 1]);
    const Token = getTokenForNonAdmin();
    const result = await axios.delete(`${url}/followers/delete`, {
      data: {
        userId: insertId,
        vacationId: 1,
      },
      headers: { authorization: Token },
    });
    const query3 = `DELETE FROM vacations.users WHERE id = ?;`;
    await connection().execute(query3, [insertId]);
    expect(result.status).equal(200);
  });

  it("delete follower fail (invalid token)", async function () {
    try {
      const query =
        "INSERT INTO vacations.`users`(firstName, lastName, email, password, role, salt) VALUES (?,?,?,?,?,?);";
      const connectionResult = await connection().execute(query, [
        dummyUser.firstName,
        dummyUser.lastName,
        dummyUser.email,
        dummyUser.password,
        dummyUser.role,
        dummyUser.salt,
      ]);
      const { insertId } = connectionResult[0];
      const query2 =
        "INSERT INTO vacations.`followers`(userId, vacationId) VALUES (?,?);";
      await connection().execute(query2, [insertId, 1]);
      const Token = getTokenForNonAdmin();
      await axios.delete(`${url}/followers/delete`, {
        data: {
          userId: insertId,
          vacationId: 1,
        },
        headers: { authorization: Token + 1 },
      });
      throw new Error("error");
    } catch (error) {
      const userId = JSON.parse(error.config.data).userId;
      expect(error?.response.status).equal(401);
      const query = `DELETE FROM vacations.users WHERE id = ?;`;
      await connection().execute(query, [userId]);
    }
  });
});
