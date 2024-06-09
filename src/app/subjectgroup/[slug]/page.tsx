"use client";

import MiniCreatePost from "@/components/MiniCreatePost";
import { buttonVariants } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import router from "next/router";
import { FC, useEffect, useState } from "react";
import ErrorPage from "next/error";
import SubscribeLeave from "@/components/SubscribeLeave";
import { format } from "date-fns";
import { text } from "stream/consumers";
import PostFeed from "@/components/PostFeed";
import Navbar from "@/components/Navbar";
import { MdVerified } from "react-icons/md";
import ReactTooltip from "react-tooltip";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  const [groupName, setGroupName] = useState<string>("");
  const { slug } = params;

  const [createdAt, setCreatedAt] = useState<any>(null);
  const [postsCount, setPostsCount] = useState<any>(null);
  const [memberCount, setMembersCount] = useState<any>(null);
  const [creatorName, setCreatorName] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState<any>(null);
  const [isOfficial, setIsOfficial] = useState<any>(null);

  const [posts, setPosts] = useState<any>(null);
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

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          const { data: data1 } = await axios.get(
            `http://localhost:5165/api/subject-group/${slug}`
          );
          setCreatedAt(data1.createdAt);
          setPostsCount(data1.numberOfPosts);
          setMembersCount(data1.numberOfSubscribers);
          setCreatorName(data1.creator);
          setIsOfficial(data1.isOfficial);

          const { data: data2 } = await axios.get(
            `http://localhost:5165/api/subscription/${slug}/isSubscribed`
          );

          const { data: data3 } = await axios.get(
            `http://localhost:5165/api/posts?limit=2&page=1&subjectGroupName=${slug}`
          );

          setPosts(data3.$values);
          setIsSubscribed(!!data2.isSubscribed);
        }
      } catch (err: any) {
        if (err.response.status === 404) {
          router.push('error')
        }

      }
    })();

  }, []);

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-1">
      <Navbar />
      <div className="flex items-center">
        <h1 className="font-bold text-3xl md:text-4xl h-14">
          {decodeURIComponent(slug)}
        </h1>
        {isOfficial && (
          <MdVerified
            title="Grupo oficial."
            className="text-black-500 cursor-pointer ml-2"
            style={{ fontSize: "35px", marginTop: "-15px" }}
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="md:col-span-1">
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-slate-950">
            <div className="px-6 py-4 bg-gray-100">
              <p className="font-semibold text-xl py-3">Resumo</p>
            </div>
            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-semibold text-zinc-600">Criado em:</dt>
                <dt className="text-gray-700">
                  {format(new Date(createdAt), "dd/MM/yyyy")}
                </dt>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-semibold text-zinc-600">Posts:</dt>
                <dt className="text-gray-700">{postsCount}</dt>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-semibold text-zinc-600">Membros:</dt>
                <dt className="text-gray-700">{memberCount}</dt>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="font-semibold text-zinc-600">Criado por:</dt>
                <dt className="text-gray-700">{creatorName}</dt>
              </div>
            </dl>
          </div>
          <div className="flex justify-center mt-4">
            <SubscribeLeave
              subjectGroupName={slug}
              isSubscribed={isSubscribed}
            ></SubscribeLeave>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              className={buttonVariants({
                variant: "outline",
                className: `w-full mb-6 text-black bg-gray-300 border-black border-2 rounded-md py-2 px-4 block text-center`,
              })}
              href={`/subjectgroup/${slug}/createpost`}
            >
              <span className="text-black">Criar Post</span>
            </Link>
          </div>
        </div>
        <div className="md:col-span-3 md:col-start-2 md:col-end-4 w-full">
          <div className="flex justify-center items-center h-full w-full">
            {/* <MiniCreatePost /> */}
            <PostFeed initialPosts={posts} subjectGroupName={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
