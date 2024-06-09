import { buttonVariants } from "@/components/ui/Button";
import { toast } from "./use-toast";
import Link from "next/link";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Sign In required.",
      description: "Please sign in to continue.",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          onClick={() => dismiss()}
          className={buttonVariants({ variant: "outline" })}
        >
          Sign In
        </Link>
      ),
    });
  };

  return { loginToast };
};
