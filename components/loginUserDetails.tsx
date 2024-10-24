import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const LoginDetails = async () => {
  const session = await auth();
  return (
    <>
      <div>Login successfull</div>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/");
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default LoginDetails;
