import { type User } from "@clerk/nextjs/dist/api";
export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username || "unknown", // fallback: user.externalAccounts.find((account) => account.provider === "github")
    fullname:
      user.firstName && user.lastName && user.lastName.length > 0
        ? `${user.firstName} ${user.lastName}`
        : user.firstName,
    profileImageUrl: user.profileImageUrl,
  };
};
