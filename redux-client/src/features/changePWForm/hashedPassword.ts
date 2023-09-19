import bcrypt from "bcryptjs"

export async function getHashedPassword(
  password: string,
  salt?: string,
): Promise<{ password: string; salt?: string }> {
  const saltRounds = 10
  const s = salt || bcrypt.genSaltSync(saltRounds)
  const hashed = await bcrypt.hash(password, s)
  return { password: hashed, salt: s }
}
