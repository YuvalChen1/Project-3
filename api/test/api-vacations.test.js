const { expect } = require("chai");
const axios = require("axios");
const {
  getTokenForAdmin,
  getTokenForNonAdmin,
  connection,
} = require("./utils");

const url = "http://localhost:4000";

describe("GET /vacations", function () {
  it("get vacations success", async function () {
    const adminToken = getTokenForAdmin();
    const result = await axios.get(`${url}/vacations`, {
      headers: { authorization: adminToken },
    });
    expect(result.status).equal(200);
  });

  it("get vacations fail (invalid token)", async function () {
    try {
      const adminToken = getTokenForAdmin();
      await axios.get(`${url}/vacations`, {
        headers: { authorization: adminToken + 1 },
      });
      throw new Error("error");
    } catch (error) {
      expect(error?.response.status).equal(401);
    }
  });
});

describe("POST /vacations/new", function () {
  it("add new vacation (admin) success", async function () {
    const dummyVacation = {
      destination: "Add New Vacation Test",
      description: "Add New Vacation Test",
      startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      price: 1234,
      image: "url/image.jpg",
    };
    const adminToken = getTokenForAdmin();
    const result = await axios.post(`${url}/vacations/new`, dummyVacation, {
      headers: { authorization: adminToken },
    });
    expect(result.status).equal(200);
  });

  it("add new vacation (admin) fail (token)", async function () {
    try {
      const dummyVacation = {
        id: 31,
        destination: "Add New Vacation Test",
        description: "Add New Vacation Test",
        startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        price: 1234,
        image: "url/image.jpg",
      };
      const regularTokenForAdmin = getTokenForNonAdmin();
      await axios.post(`${url}/vacations/new`, dummyVacation, {
        headers: { authorization: regularTokenForAdmin },
      });
      throw new Error("Not Admin");
    } catch (error) {
      expect(error?.response.status).equal(403);
    }
  });
  it("add new vacation (admin) fail (zod)", async function () {
    try {
      const dummyVacation = {
        id: 31,
        destination: "Add New Vacation Test",
        description: "Add New Vacation Test",
        startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        price: 1234444,
        image: "url/image.jpg",
      };
      const adminToken = getTokenForAdmin();
      await axios.post(`${url}/vacations/new`, dummyVacation, {
        headers: { authorization: adminToken },
      });
      throw new Error("Error");
    } catch (error) {
      expect(error?.response.status).equal(500);
    }
  });
});

describe("PUT /vacations/edit", async function () {
  it("edit vacation (admin) success", async function () {
    const dummyVacation = {
      destination: "Edit Vacation Test",
      description: "Edit Vacation Test",
      startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      price: 555,
      image: "url/image.jpg",
    };
    const query =
      "INSERT INTO vacations.`vacations_table`(destination, description, startDate, endDate, price, image) VALUES (?,?,?,?,?,?);";
    const result = await connection().execute(query, [
      dummyVacation.destination,
      dummyVacation.description,
      dummyVacation.startDate,
      dummyVacation.endDate,
      dummyVacation.price,
      dummyVacation.image,
    ]);
    const { insertId } = result[0];

    const adminToken = getTokenForAdmin();
    const editResult = await axios.put(
      `${url}/vacations/edit`,
      {
        destination: dummyVacation.destination,
        description: dummyVacation.description,
        startDate: dummyVacation.startDate,
        endDate: dummyVacation.endDate,
        price: dummyVacation.price,
        image: dummyVacation.image,
        id: insertId,
      },
      {
        headers: { authorization: adminToken },
      }
    );
    expect(editResult.status).equal(200);
    const query2 = `DELETE FROM vacations.vacations_table WHERE id = ?;`;
    await connection().execute(query2, [insertId]);
  });

  it("edit vacation (admin) fail (token)", async function () {
    try {
      const dummyVacation = {
        destination: "Edit Vacation Test",
        description: "Edit Vacation Test",
        startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        price: 555,
        image: "url/image.jpg",
      };
      const regularToken = getTokenForNonAdmin();
      await axios.put(
        `${url}/vacations/edit`,
        {
          destination: dummyVacation.destination,
          description: dummyVacation.description,
          startDate: dummyVacation.startDate,
          endDate: dummyVacation.endDate,
          price: dummyVacation.price,
          image: dummyVacation.image,
          id: 1,
        },
        {
          headers: { authorization: regularToken },
        }
      );
      throw new Error("Error");
    } catch (error) {
      expect(error?.response.status).equal(403);
    }
  });

  it("edit vacation (admin) fail (zod)", async function () {
    try {
      const dummyVacation = {
        destination: "Edit Vacation Test",
        description: "Edit Vacation Test",
        startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        price: 55555,
        image: "url/image.jpg",
      };
      const adminToken = getTokenForAdmin();
      await axios.put(
        `${url}/vacations/edit`,
        {
          destination: dummyVacation.destination,
          description: dummyVacation.description,
          startDate: dummyVacation.startDate,
          endDate: dummyVacation.endDate,
          price: dummyVacation.price,
          image: dummyVacation.image,
          id: 1,
        },
        {
          headers: { authorization: adminToken },
        }
      );
      throw new Error("Error");
    } catch (error) {
      expect(error?.response.status).equal(500);
    }
  });
});

describe("DELETE /vacations/delete", function () {
  it("delete vacation (admin) success", async function () {
    const dummyVacation = {
      destination: "Delete Test",
      description: "Delete Test",
      startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      price: 555,
      image: "url/image.jpg",
    };
    const query =
      "INSERT INTO vacations.`vacations_table`(destination, description, startDate, endDate, price, image) VALUES (?,?,?,?,?,?);";
    const result = await connection().execute(query, [
      dummyVacation.destination,
      dummyVacation.description,
      dummyVacation.startDate,
      dummyVacation.endDate,
      dummyVacation.price,
      dummyVacation.image,
    ]);
    const { insertId } = result[0];

    const adminToken = getTokenForAdmin();
    const deleteResult = await axios.delete(
      `${url}/vacations/delete?id=${insertId}`,
      {
        headers: { authorization: adminToken },
      }
    );
    expect(deleteResult.status).equal(200);
  });
  it("delete vacation (admin) fail (token)", async function () {
    try {
      const regularToken = getTokenForNonAdmin();
      await axios.delete(`${url}/vacations/delete?id=${1}`, {
        headers: { authorization: regularToken },
      });
      throw new Error("Error");
    } catch (error) {
      expect(error?.response.status).equal(403);
    }
  });
});
