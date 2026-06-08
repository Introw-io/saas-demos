export type UserContext = {
  email: string;
};

export async function resolveUserContext(): Promise<UserContext> {
  return {
    email: "embed@introw.io",
  };
}
