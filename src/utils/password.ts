import bcrypt from "bcrypt";

export async function hashPassword(
  plaintextPassword: string,
  saltRounds: number
): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);

    return hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      // Handle error if it's an instance of Error
      throw new Error(`Error hashing password: ${error.message}`);
    } else {
      // Handle error if it's of type unknown
      throw new Error(`Unknown error occurred while hashing password`);
    }
  }
}
