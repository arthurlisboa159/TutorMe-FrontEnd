"use client"

import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = async () => {
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
    <div className="p-8">
      <Navbar />

      <p className="text-xl font-bold">Dúvidas Frequentes</p>
      <div className="border-t-2 border-gray-600 mb-6"></div>
      <h2 className="font-bold text-xl mb-4">
        Quais são as normas que regulamentam o Programa de Monitoria da UFSC e
        onde é possível encontrá-las?
      </h2>
      <p className="mb-4">
        Atualmente, o Programa de Monitoria da UFSC é regulamentado pela
        Resolução Normativa nº 53/CUn/2015, republicada e alterada pela
        Resolução Normativa nº 85/2016/CUn, de 30 de agosto de 2016. A Portaria
        nº 414/PROGRAD/2016 esclarece a aplicação do parágrafo 2°, do artigo 21,
        da mesma Resolução.
      </p>
      <p className="mb-4">
        Tanto a Resolução quanto a Portaria poderão ser encontradas na página
        eletrônica da Coordenadoria de Avaliação e Apoio Pedagógico (CAAP), em{" "}
        <a
          href="http://apoiopedagogico.prograd.ufsc.br/monitoria-3/"
          className="text-blue-500 underline"
        >
          http://apoiopedagogico.prograd.ufsc.br/monitoria-3/
        </a>{" "}
        ou no Sistema de registro de dados da Monitoria, em{" "}
        <a
          href="http://moni.sistemas.ufsc.br/"
          className="text-blue-500 underline"
        >
          http://moni.sistemas.ufsc.br/
        </a>
        .
      </p>

      <h2 className="font-bold text-xl mb-4">
        Como acontece a distribuição das bolsas de monitoria?
      </h2>
      <p className="mb-4">
        As bolsas de monitoria são distribuídas para os Centros de Ensino por
        uma Comissão Central de Distribuição, nomeada pela PROGRAD e composta
        por 02 representantes da PROGRAD, 03 representantes da CGRAD e 01
        representante discente. O processo anual de distribuição acontece de
        agosto a setembro, mediante regras determinadas em edital próprio e em
        conformidade com os critérios previstos no artigo 18 da Resolução
        Normativa nº 53/CUn/2015.
      </p>
      <p className="mb-4">
        A partir de então, a Direção de cada Centro de Ensino deverá nomear a
        sua Comissão Interna de Distribuição que, aplicando as regras constantes
        nos artigos 21 e 26 da mesma Resolução, deverão distribuir as bolsas de
        monitoria entre as disciplinas pleiteantes vinculadas a sua Unidade.
      </p>

      <h2 className="font-bold text-xl mb-4">
        Quais são os requisitos para ser monitor?
      </h2>
      <p className="mb-4">
        Para candidatar-se a vaga remunerada ou voluntária de monitor, o
        estudante deverá atender as seguintes condições: I- Estar matriculado
        regularmente em curso de graduação da UFSC; II- Ter cursado e obtido
        aprovação na disciplina com monitoria (ou equivalente) com nota mínima
        7,0 (sete); III- Comprovar, no Departamento de ensino, a compatibilidade
        entre os horários de suas atividades acadêmicas e os propostos para o
        desenvolvimento das atividades de monitoria; IV- Ter obtido, do
        professor supervisor, nota igual ou superior a 7,0 no exercício das
        atividades de monitoria no decorrer dos dois últimos semestres; V- Não
        ter recebido bolsa monitoria por um período igual ou superior a 4
        (quatro) semestres; VI- Não receber outras bolsas de ensino, estágio,
        pesquisa ou extensão, exceto os benefícios pecuniários destinados a
        promover a permanência dos estudantes nos cursos em que estiverem
        matriculados.
      </p>
    </div>
  );
};

export default page;
