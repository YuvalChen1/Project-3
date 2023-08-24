import { pool } from "../../database";

async function deleteVacationSubscribeApi(userId: number, vacationId: number) {
  const query =
    "DELETE FROM vacations.followers where userId = ? and vacationId = ? ;";
  const results = await pool.execute(query, [userId, vacationId]);
  const [data] = results;
  return data;
}

export { deleteVacationSubscribeApi };
