"use client"

import { FC, useEffect } from "react";
import { Schedule, columns } from "./columns";
import { DataTable } from "./data-table";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

async function getSchedules(): Promise<Schedule[]> {
  const data = [
    {
      "subject": "Sistemas Operacionais I",
      "tutorName": "Lucas Cardoso",
      "tutorContact": "lucas_cardoso07@hotmail.com",
      "tutoringLocation": "meet.google.com/caz",
      "tutoringTime": "TER 07:00-12:00;QUI 15:00-18:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "1"
    },
    {
      "subject": "Cálculo I",
      "tutorName": "Maria Mendes de Oliveira",
      "tutorContact": "mendes_maria5@yahoo.com",
      "tutoringLocation": "CFM-115",
      "tutoringTime": "QUI 10:00-12:00;SEX 14:00-18:00",
      "department": "MAT",
      "course": "Engenharia Mecânica",
      "id": "2"
    },
    {
      "subject": "Sistemas digitais",
      "tutorName": "Patricia Meyer",
      "tutorContact": "meyer.patricia@gmail.com",
      "tutoringLocation": "INE-412",
      "tutoringTime": "SEG 08:00-12:00;QUA 08:00-12:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "3"
    },
    {
      "subject": "Física I",
      "tutorName": "Gregorio Almeida",
      "tutorContact": "gregorio.almeida99@yahoo.com",
      "tutoringLocation": "CTC-105",
      "tutoringTime": "SEG 10:00-12:00;TER 14:00-18:00",
      "department": "FSC",
      "course": "Engenharia de Alimentos",
      "id": "4"
    },
    {
      "subject": "Física II",
      "tutorName": "Rodrigo Andrade",
      "tutorContact": "rodrigo_andrade@gmail.com",
      "tutoringLocation": "CTC-114",
      "tutoringTime": "SEG 10:00-12:00;TER 14:00-18:00",
      "department": "FSC",
      "course": "Engenharia Elétrica",
      "id": "5"
    },
    {
      "subject": "Linguagens Formais e Compiladores",
      "tutorName": "Alan Trivolini",
      "tutorContact": "trivolinialan93@gmail.com",
      "tutoringLocation": "INE-115",
      "tutoringTime": "QUA 10:00-12:00;QUI 14:00-18:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "6"
    },
    {
      "subject": "Cálculo III",
      "tutorName": "Marcos Surita",
      "tutorContact": "marcos.surita.889@yahoo.com",
      "tutoringLocation": "CFM-116",
      "tutoringTime": "QUA 10:00-12:00;QUI 14:00-18:00",
      "department": "MAT",
      "course": "Matemática",
      "id": "7"
    },
    {
      "subject": "Introdução à Estatística",
      "tutorName": "Maycon dos Santos",
      "tutorContact": "mayconsantos99@yahoo.com",
      "tutoringLocation": "meet.google.com/sda",
      "tutoringTime": "QUA 15:00-18:00;QUI 14:00-18:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "8"
    },
    {
      "subject": "Programação Orientada a objetos II",
      "tutorName": "Alyson Gomes",
      "tutorContact": "gomes.alyson12@gmail.com",
      "tutoringLocation": "meet.google.com/cre",
      "tutoringTime": "TER 08:00-12:00;SEX 14:00-18:00",
      "department": "INE",
      "course": "Sistemas de Informação",
      "id": "9"
    },
    {
      "subject": "Cálculo Numérico em Computadores",
      "tutorName": "Emily Hirthre",
      "tutorContact": "emily_mirthe82@hotmail.com",
      "tutoringLocation": "meet.google.com/gfs",
      "tutoringTime": "TER 07:00-12:00;QUI 14:00-18:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "10"
    },
    {
      "subject": "Estrutura de Dados",
      "tutorName": "Matheus Santino",
      "tutorContact": "matheussantino37@hotmail.com",
      "tutoringLocation": "CTC-105",
      "tutoringTime": "SEG 09:00-11:00;QUI 14:00-18:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "11"
    },
    {
      "subject": "Modelagem e Simulação",
      "tutorName": "Augusto Torres",
      "tutorContact": "torres_augusto17@gmail.com",
      "tutoringLocation": "INE-413",
      "tutoringTime": "TER 10:00-12:00;SEX 14:00-18:00",
      "department": "INE",
      "course": "Ciência da Computação",
      "id": "12"
    }
  ]


  return data;
}

export default async function Page() {
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

  const data = await getSchedules();

  return (
    <section className="py-6">
      <Navbar />

      <div className="container">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-600">
          Monitorias
        </h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
