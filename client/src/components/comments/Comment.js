import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { CommentContext } from "./CommentProvider";

export const Comment = ({ comment, props }) => {
  const { deleteComment, editComment, comments } = useContext(CommentContext);

  const commentForm = useRef(null);
  const content = useRef(null);

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
          className="btn--release"
          onClick={() => {
            deleteComment(comment.id);
          }}
        >
          Delete Comment
        </button>

        <button
          onClick={() => {
            commentForm.current.showModal();
          }}
        >
          Edit Comment
        </button>

              <dialog ref={commentForm}>
          <form className="CommentForm">
            <h2 className="CommentForm__subject">Edit Comment</h2>

            <fieldset>
              <div className="form-group">
                <label htmlFor="commentContent">New Comment Content: </label>
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
                  updateComment(comment.id);
                  commentForm.current.close();
                }}
                className="btn btn-primary"
                >
              Save New Comment
            </button>
          </form>
        </dialog>
</> : <></>
}
      </div>
    </section>
  );
};
