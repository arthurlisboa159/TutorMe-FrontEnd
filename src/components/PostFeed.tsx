"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "./Post";

interface PostFeedProps {
  initialPosts: any[];
  subjectGroupName: string;
}

const PostFeed: FC<PostFeedProps> = ({ subjectGroupName }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const [x, setX] = useState<any>(null);
  const [commentNumber, setCommentNumber] = useState<any>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {

      const token = localStorage.getItem("token");

      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const query = `http://localhost:5165/api/posts?limit=2&page=${pageParam}&subjectGroupName=${subjectGroupName}`;

      const { data } = await axios.get(query);

      setX(data.$values);

      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  return (
    <ul className="flex flex-col col-span-6 space-y-6 w-full">
      {x !== null && x.length > 0 ? (
        <>
          {x.map((item, index) => {
            if (index === x.length - 1) {
              return (
                <li key={item.id} ref={ref}>
                  <Post postId={item.id} groupName={subjectGroupName} title={item.title} creator={item.user.fullName} createdAt={item.createdAt} content={item.content} />
                </li>
              )
            } else {
              return <Post postId={item.id} groupName={subjectGroupName} title={item.title} creator={item.user.fullName} createdAt={item.createdAt} content={item.content} />
            }
          })}
          {/* 
          <h1>{x[0].title}</h1>
          <Post /> */}
        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Este grupo ainda não possui posts.</p>
      )}
    </ul>
  );
};

export default PostFeed;
