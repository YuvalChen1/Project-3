import { signupSchema } from "../../route";
import bcrypt from "bcrypt";
import { pool } from "../../../database";
import { ResultSetHeader } from "mysql2";

interface IPayload {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default async function signUp(signUpPayload: IPayload): Promise<number> {
  const { email, firstName, lastName, password } = signUpPayload;
  const hashedPassword = await getHashedPassword(password);
  const query =
    "INSERT INTO `vacations`.`users` (`email`, `password`, `firstName`, `lastName`, `salt`) VALUES (?,?,?,?,?)";
  const result = await pool.execute(query, [
    email,
    hashedPassword.password,
    firstName,
    lastName,
    hashedPassword.salt,
  ]);
  const [data] = result;
  return (data as ResultSetHeader).insertId;
}

export async function getHashedPassword(
  password: string,
  salt?: string
): Promise<{ password: string; salt?: string }> {
  const saltRounds = 10;
  const s = salt || bcrypt.genSaltSync(saltRounds);
  const hashed = await bcrypt.hash(password, s);
  return { password: hashed, salt: s };
}
