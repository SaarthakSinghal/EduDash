import { auth } from "@clerk/nextjs/server";

export const getUtils = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return { role, userId };
};
