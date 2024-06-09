"use client";

import { format } from "date-fns";
import { FC, useRef } from "react";
import { MdSchool } from "react-icons/md";

interface PostCommentProps {
  comment: any;
  isTutor: any;
}

const PostComment: FC<PostCommentProps> = ({ comment, isTutor }) => {
  const commentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="ml-2 flex items-center gap-x-2">
        <p className="text-sm font-medium text-gray-900">{comment.username}</p>
        <p className="max-h-40 truncate text-xs text-zinc-500">
          {isTutor && (
            <span className="flex items-center">
              <MdSchool
                title="Monitor"
                className="text-black cursor-pointer"
                style={{ fontSize: "18px", marginRight: "0px" }}
              />
              <p className="text-sm" style={{ marginLeft: "10px", marginTop: "-4px" }}>•</p>
              <span style={{ marginLeft: "7px" }} >{format(new Date(comment.createdAt), "dd/MM/yyyy")}</span>
            </span>
          )}
        </p>
      </div>

      <p className="text-sm text-zinc-900 mt-2 ml-2">{comment.text}</p>
    </div>
  );
};

export default PostComment;
