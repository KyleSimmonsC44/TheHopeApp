import React, { useContext, useEffect, useState, useRef } from "react";
import { CommentContext } from "../comments/CommentProvider";
import { PostContext } from "./PostProvider";
import "./PostDetail.css"

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
            <dialog className="dataForm-div" ref={commentForm}>
        <form className="CommentForm">
          <h2 className="CommentForm__subject">New Comment</h2>
  
            <div className="username">
              <input
                type="text"
                id="commentContent"
                ref={content}
                className="form-control"
                rows="5"
                cols="70"
              />
            </div>
          <button

            type="submit"
            onClick={(evt) => {
              evt.preventDefault(); // Prevent browser from submitting the form
              constructNewComment();
              commentForm.current.close();
            }}
            className="dataForm-button"
          >
            Save Comment
          </button>
          <button className="dataForm-button" onClick={()=>{commentForm.current.close();}}>Back</button>
        </form>
      </dialog>
      <div className="centerCard">

      <section className="postDetailCard">
          <h3 className="post__title">{post.title}</h3>
          <div className="post__title">{post.content}</div>
          <button
          className="contact-button"
          onClick={() => {
            commentForm.current.showModal();
          }}
          >
          Add Comment
        </button>
          {post.user === localStorage.getItem("app_user") ?
          <div className="buttonBox">
          <button
          className="contact-button"
          onClick={() => {
            props.history.push(`/posts/edit/${post.id}`);
          }}
          >
      Edit Post!
    </button> 
    <button className="contact-button" onClick={() => {
      deletePost(post.id).then(() => {
        props.history.push("/posts");
      });
    }}
    >
          Delete Post
        </button></div> : <></> }
        </section>
          </div>
        </>
  )
}