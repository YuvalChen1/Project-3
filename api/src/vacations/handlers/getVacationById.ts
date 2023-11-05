import { pool } from "../../database";

async function getVacationByIdApi(id: number) {
  const query = `SELECT * FROM vacations.vacations_table where id = ?;`;
  const results = await pool.execute(query, [id]);
  const [data] = results;
  return data;
}

export { getVacationByIdApi };
