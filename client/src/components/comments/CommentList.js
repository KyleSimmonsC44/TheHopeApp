import React, { useContext, useEffect, useState } from "react";
import { Comment } from "./Comment";
import { CommentContext } from "./CommentProvider";

export const CommentList = (props) => {
  const { postComments, comments, getCommentsByPostId } = useContext(
    CommentContext
  );
  const { filteredComments, setComments } = useState([]);
  useEffect(() => {
    console.log(props.match.params.id);
    getCommentsByPostId(parseInt(props.match.params.id));
  }, [comments]);

  useEffect(() => {}, []);

  return (
    <div className="commentList">
      {postComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
