import { pool } from "../../../database";
import { getHashedPassword } from "../../../auth/handlers/signup";

async function changePasswordApi(password: string, userId: number) {

  const query = `
    UPDATE vacations.users 
    SET 
      password = ?,
      salt = ?
    WHERE id = ?;
  `;
  const hashedPassword = await getHashedPassword(password);
  const results = await pool.execute(query, [
    hashedPassword.password,
    hashedPassword.salt,
    userId,
  ]);
  const [data] = results;
  return data;
}

export { changePasswordApi };
