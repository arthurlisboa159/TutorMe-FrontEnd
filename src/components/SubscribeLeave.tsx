"use client";

import { FC, startTransition, useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubscribeLeaveProps {
  subjectGroupName: string;
  isSubscribed: boolean;
}

const SubscribeLeave: FC<SubscribeLeaveProps> = ({
  subjectGroupName,
  isSubscribed,
}) => {
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      try {
        if (token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;

          const { data } = await axios.post(
            `http://localhost:5165/api/subject-group/${subjectGroupName}/subscribe`
          );

          return data as string;
        } else {
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
        }
      } catch (err: any) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            toast({
              title: "Error while subscribing.",
              description: "You are already subscribed in this group",
              variant: "destructive",
            });
          } else if (err.response?.status === 401) {
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
          } else {
            toast({
              title: "Error in subscription",
              description: "It was not possibe to process your request",
              variant: "destructive",
            });
          }
        }
      }
    },
    onSuccess: () => {
      window.location.reload();
    },
  });


  return isSubscribed ? (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
      style={{ backgroundColor: "red" }}
    >
      Sair do grupo
    </Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
      style={{ backgroundColor: "green" }}
    >
      Entrar no grupo
    </Button>
  );
};

export default SubscribeLeave;
