import React, { useContext, useEffect, useState, useRef } from "react";
import { CommentContext } from "../comments/CommentProvider";
import { PostContext } from "./PostProvider";

export const PostDetails = props =>{
  const { getSinglePost, deletePost, post, setPost, posts } = useContext(PostContext);
  const { addComment } = useContext(CommentContext);

  const content = useRef(null);


  useEffect(() =>{
      const postId = parseInt(props.match.params.id)

      getSinglePost(postId)
  },[posts])

  
  const constructNewComment = () => {
    {
      addComment({
        content: content.current.value,
        user: localStorage.getItem("app_user"),
        postId: parseInt(props.match.params.id),
      });
    }
  };

  const commentForm = useRef(null);
  return(
      <>
            <dialog ref={commentForm}>
        <form className="CommentForm">
          <h2 className="CommentForm__subject">New Comment</h2>

          <fieldset>
            <div className="form-group">
              <label htmlFor="commentContent">Comment Content: </label>
              <input
                type="text"
                id="commentContent"
                ref={content}
                className="form-control"
                rows="5"
                cols="70"
              />
            </div>
          </fieldset>
          <button
            type="submit"
            onClick={(evt) => {
              evt.preventDefault(); // Prevent browser from submitting the form
              constructNewComment();
              commentForm.current.close();
            }}
            className="btn btn-primary"
          >
            Save Comment
          </button>
        </form>
      </dialog>
      <section className="postDetail">
          <h3 className="post__title">{post.title}</h3>
          <div className="post__title">{post.content}</div>
          <button
          onClick={() => {
            commentForm.current.showModal();
          }}
        >
          Add Comment
        </button>
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
        </>
  )
}