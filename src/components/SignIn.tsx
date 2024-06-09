import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <GraduationCap className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to TutorMe?{' '}
          <Link href='/sign-up' className="hover:text-zinc-800 text-sm underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
