"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubjectgroupPayload } from "@/lib/validators/subjectgroup";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import Navbar from "@/components/Navbar";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToast();
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const response = await axios.get('http://localhost:5165/api/users/isAuthenticated');

      } catch (error: any) {
        if (error.response.status === 401) {
          router.push('/login')
          return toast({
            title: "Erro",
            description: "Por favor, faça o login para continuar.",
            variant: "destructive",
          });
        } else if (error.response.status === 403) {
          return toast({
            title: "Erro",
            description: "Você não tem permissão para acessar esse recurso.",
            variant: "destructive",
          });
        } else {
          return toast({
            title: "Erro",
            description: "Por favor, entre em contato com o administrador do sistema.",
            variant: "destructive",
          });
        }
      }
    };

    fetchData();
  }, []);
  const { mutate: createSubjectgroup, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubjectgroupPayload = {
        name: input,
      };

      const token = localStorage.getItem("token");

      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data } = await axios.post(
        "http://localhost:5165/api/subject-group",
        payload
      );
      router.push(`/subjectgroup/${data.name}`);
      return data as string;

    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push('/login')
        return toast({
          title: "Erro",
          description: "Por favor, faça o login para continuar.",
          variant: "destructive",
        });
      } else if (error.response.status === 403) {
        return toast({
          title: "Erro",
          description: "Você não tem permissão para acessar esse recurso.",
          variant: "destructive",
        });
      } else {
        return toast({
          title: "Erro",
          description: "Por favor, entre em contato com o administrador do sistema.",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <Navbar />

      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Criar um novo grupo</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium pb-2">Nome:</p>

          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
            <p className="text-sm text-gray-500 mt-3">
              ATENÇÃO: Somente grupos criados pelos administradores do sistema são considerados
              oficiais.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length <= 3}
            onClick={() => createSubjectgroup()}
          >
            Criar grupo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
