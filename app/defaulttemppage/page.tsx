import { auth } from "@/auth";

const DefaultRedirect = async () => {
  const session = await auth();
  return (
    <>
      <div>Login successfull</div>
      <p>{JSON.stringify(session)}</p>
    </>
  );
};

export default DefaultRedirect;
