import UserAuthForm from "@/components/UserAuthForm";
import { GraduationCap } from "lucide-react";

const Page = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <GraduationCap className="mx-auto h-12 w-12" />
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>

        <UserAuthForm />

      </div>
    </div>
  );

}

export default Page;