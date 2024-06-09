"use client";

import { FC, use, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import type EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";
import { boolean, z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface EditorProps {
  subjectgroupName: string;
}

const Editor: FC<EditorProps> = ({ subjectgroupName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subjectgroupName,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },

        placeholder: "Qual a sua dúvida?",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          table: Table,
        },
      });
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { ref: titleRef, ...rest } = register("title");

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subjectgroupName,
    }: PostCreationRequest) => {

      var finalContent = JSON.stringify(content)
      const payload = {
        title,
        finalContent,
        subjectgroupName,
      };
      const token = localStorage.getItem("token");

      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data } = await axios.post(
        "http://localhost:5165/api/posts",
        payload
      );
      return data;
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
    onSuccess: () => {
      const _path = path.split('/').slice(0, -1).join('/')
      router.push(_path)
      router.refresh()
    }
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      subjectgroupName,
    };

    createPost(payload)
  }

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Error in creating post",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);
  return (
    <div className="mx-auto p-4 max-w-lg bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="subjectgroup-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);

              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Título"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
