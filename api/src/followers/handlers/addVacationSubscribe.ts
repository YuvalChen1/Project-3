import { pool } from "../../database";

async function addVacationSubscribeApi(userId: number, vacationId: number) {
  const query =
    "INSERT INTO vacations.followers (userId, vacationId) VALUES (?, ?)";
  const results = await pool.execute(query, [userId, vacationId]);
  const [data] = results;
  return data;
}

export { addVacationSubscribeApi };
