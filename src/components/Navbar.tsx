"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import SearchBar from "./SearchBar";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = "";
      router.push("/login");
    },
  });

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-300 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/menu" className="flex gap-2 items-center">
          <GraduationCap className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            TutorMe
          </p>
        </Link>

        <SearchBar />

        <Button isLoading={isLoading} onClick={() => logout()}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
