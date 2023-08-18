import { pool } from "../../database";

async function deleteVacationByIdApi(id: number) {
  const query = `DELETE FROM vacations.vacations_table where id = ?;`;
  const results = await pool.execute(query, [id]);
  const [data] = results;
  return data;
}

export { deleteVacationByIdApi };
