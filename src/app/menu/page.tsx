"use client"

import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
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
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <h1 className="font-bold text-3xl md:text-4xl text-center">
        O que você quer fazer?
      </h1>
      <div className="mt-10 overflow-hidden mx-auto max-w-md rounded-lg border border-zinc-500 order-first md:order-last">
        <div className="bg-slate-300 px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            Escolha uma opção abaixo:
          </p>
        </div>

        <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <Link
            className={buttonVariants({
              className: "w-full mt-4 mb-6",
            })}
            href="/subjectgroup/create"
          >
            Criar um novo grupo
          </Link>

          <Link
            className={buttonVariants({
              className: "w-full mt-4 mb-6",
            })}
            href="/schedules"
          >
            Consultar monitorias existentes
          </Link>

          <Link
            className={buttonVariants({
              className: "w-full mt-4 mb-6",
            })}
            href="/tutoring"
          >
            Quero ser um monitor!
          </Link>
        </div>
      </div>
    </>
  );
}


export default Page;