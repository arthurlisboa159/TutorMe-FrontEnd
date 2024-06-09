"useClient";

import { FC, useState } from "react";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CreateCommentProps {
  postId: any
  replyToId?: any
}

const CreateComment: FC<CreateCommentProps> = ({postId, replyToId}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };
      const token = localStorage.getItem("token");

      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data } = await axios.post(
        `http://localhost:5165/api/posts/comment`,
        payload
      );
    },

    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push('/login')
        return toast({
          title: "Erro",
          description: "Por favor, faça o login para continuar.",
          variant: "destructive",
        });
      } else if (error.response.status === 403){
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
      window.location.reload();
      setInput("");
    },
  });

  return (
    <div className="grid gap-1.5 ml-2 mr-2">
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Adicione um comentário..."
        />
        <div className="mt-2 flex justify-end">
          <Button isLoading={isLoading} disabled={input.length === 0} onClick={() => comment({postId, text:input, replyToId})}>
            Comentar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
