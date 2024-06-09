"use client"

import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {

  const router = useRouter();

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
  return (
    <div className="flex flex-col items-start gap-6">
      <Navbar />

      <Editor subjectgroupName={params.slug} />

      <div className="w-full flex justify-center">
        <div className="w-1/2 flex justify-between">
          <Button type="submit" form="subjectgroup-post-form" className="w-full">
            Criar Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
