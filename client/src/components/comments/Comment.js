import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { CommentContext } from "./CommentProvider";
import "./Comment.css"
export const Comment = ({ comment, props }) => {
  const { deleteComment, editComment, comments } = useContext(CommentContext);

  const commentForm = useRef(null);
  const content = useRef(null);
  const history = useHistory()

  const updateComment = () => {
    {
      editComment({
        id: comment.id,
        content: content.current.value,
        user: comment.user,
        postId: comment.post.id,
        created_on: comment.created_on,
      });
    }
  };
  console.log(comment);
  return (
    <section className="comment">
      <div className="comment_name">
        <div className="commentContent">{comment.content}</div>
        { comment.user.key === localStorage.getItem("app_user") ?
        <>
        <button
          className="contact-button"
          onClick={() => {
            deleteComment(comment.id);
          }}
        >
          Delete Comment
        </button>

        <button
        className="contact-button"
          onClick={() => {
            commentForm.current.showModal();
          }}
        >
          Edit Comment
        </button>

              <dialog className="dataForm-div" ref={commentForm}>
          <form className="modalForm-div">
            <h2 className="CommentForm__subject">Edit Comment</h2>
            <div className="fields">
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
              </div>
            <button
              className="dataForm-button"
              type="submit"
              onClick={(evt) => {
                  evt.preventDefault(); // Prevent browser from submitting the form
                  updateComment(comment.id);
                  commentForm.current.close();
                }}
                >
                  
              Save Comment
            </button>
        <button className="dataForm-button" onClick={()=>{commentForm.current.close();}}>Back</button>

          </form>
        </dialog>
</> : <></>
}
      </div>
    </section>
  );
};
