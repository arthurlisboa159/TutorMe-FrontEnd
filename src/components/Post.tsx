import { format } from "date-fns";
import { FC } from "react";
import PostContent from "./PostContent";
import { MessagesSquareIcon } from "lucide-react";
import CommentsSection from "./CommentsSection";

interface PostProps {
  postId: any;
  groupName: any;
  title: any;
  creator: any;
  createdAt: any;
  content: any;
}

const Post: FC<PostProps> = ({
  postId,
  groupName,
  title,
  creator,
  createdAt,
  content,
}) => {
  const contentSemAspas = content.replace(/^"(.*)"$/, "$1");

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 w-full">
        <div className="text-gray-500">
          <h2 className="font-semibold text-2xl mb-2 text-black">{title}</h2>
          <p className="text-sm">
            {creator} • {format(new Date(createdAt), "dd/MM/yyyy")}
          </p>
          {/* Linha horizontal */}
          <hr className="my-4 border-t border-gray-300" />

          <PostContent content={contentSemAspas} />
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
        <a className="w-fit flex items-center gap-2">
          <MessagesSquareIcon className="h-4 w-4" /> Comentários
        </a>
      </div>

      <CommentsSection posId={postId} />
    </div>
  );
};

export default Post;
