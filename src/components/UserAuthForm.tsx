"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import jwt_decode from "jwt-decode";

const Page = () => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [decodedToken, setDecodedToken] = useState<any>(null);

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        email: inputEmail,
        password: inputPassword,
      };

      try {
        const response = await axios.post(
          "http://localhost:5165/api/users/login",
          payload
        );
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem("token", newToken);
        const decoded = jwt_decode(newToken);
        setDecodedToken(decoded);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        router.push('/menu');
      } catch {
        toast({
          title: "Falha no login",
          description: "Email e/ou senha incorreto(s).",
          variant: "destructive",
        });
      }
    },

  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg shadow-xl space-y-6">
        <div>
          <p className="text-lg font-medium pb-2">Email:</p>

          <div className="relative">
            <Input
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="pl-6"
            />
          </div>

          <p className="text-lg font-medium pb-2 pt-2">Senha:</p>

          <div className="relative">
            <Input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            isLoading={isLoading}
            disabled={inputEmail.length === 0 || inputPassword.length === 0}
            onClick={() => login()}
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
