import { getServerAuthSession } from "~/server/auth";

export default async function Page() {

  const sessions = await getServerAuthSession();

  return (
    <>
      {JSON.stringify(sessions)}
    </>
  );
}