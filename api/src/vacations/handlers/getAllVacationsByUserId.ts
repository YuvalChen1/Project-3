import { pool } from "../../database";

async function getAllVacationsByUserIdApi(userId: number) {
  const query = `SELECT v.*, 
  COUNT(f.vacationId) AS subscribers,
  MAX(f.userId = ?) AS isSubscribed
FROM vacations.vacations_table AS v
LEFT JOIN vacations.followers AS f ON v.id = f.vacationId
GROUP BY v.id
ORDER BY v.startDate;`;
  const results = await pool.execute(query, [userId]);
  const [data] = results;
  return data;
}

export { getAllVacationsByUserIdApi };
