import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "./PostProvider";

export const PostDetails = props =>{
  const { getSinglePost, deletePost, post, setPost, posts } = useContext(PostContext);

  useEffect(() =>{
      const postId = parseInt(props.match.params.id)

      getSinglePost(postId)
  },[posts])

  return(
      <section className="postDetail">
          <h3 className="post__title">{post.title}</h3>
          <div className="post__title">{post.content}</div>
          {post.user === localStorage.getItem("app_user") ?
          <>
          <button
          onClick={() => {
              props.history.push(`/posts/edit/${post.id}`);
            }}
            >
      Edit Post!
    </button> 
    <button onClick={() => {
            deletePost(post.id).then(() => {
              props.history.push("/posts");
            });
          }}
        >
          Delete Post
        </button></> : <></> }
        </section>
  )
}