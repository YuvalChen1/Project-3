import { pool } from "../../database";

async function getAllVacationsApi() {
  const query = `SELECT * from vacations.vacations_table`;
  const results = await pool.execute(query);
  const [data] = results;
  return data;
}

export { getAllVacationsApi };
