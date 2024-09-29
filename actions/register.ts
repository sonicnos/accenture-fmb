"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return { success: "User created" };
};
