import axios from "axios";
import { FC, useEffect, useState } from "react";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";

interface CommentsSectionProps {
  posId: any;
}

const CommentsSection: FC<CommentsSectionProps> = ({ posId }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `http://localhost:5165/api/posts/${posId}/comments`;
        const { data } = await axios.get(query);
        setComments(data.$values);

      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [posId]);

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <CreateComment postId={posId} />

      <div className="flex flex-col gap-y-6 mt-4">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            return <div key={topLevelComment.id} className="flex flex-col">
              <div className="mb-2">
                <PostComment comment={topLevelComment} isTutor={topLevelComment.isTutor} />
              </div>
            </div>
          })}
      </div>
    </div>
  );
};

export default CommentsSection;
