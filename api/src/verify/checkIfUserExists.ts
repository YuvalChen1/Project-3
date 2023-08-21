import { pool } from "../database";

async function ifUserExistsByEmailApi(email: string) {
  if (!email) throw new Error();
  const query = `SELECT * from vacations.users where email = ?`;
  const results = await pool.execute(query, [email]);
  const [data] = results;

  return (data as any).length !== 0;
}

export { ifUserExistsByEmailApi };
