import RegisterForm from "@/components/register-form";

const RegisterPage = () => {
  return (
    <div className="bg-purple-600 h-screen flex flex-col items-center justify-center">
      <p className="text-4xl bold uppercase text-red-700 bg-red-400">
        don't forget to delete this path
      </p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
