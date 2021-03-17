import React, { useContext } from "react"
import { PostContext } from "./PostProvider"
import {Link} from "react-router-dom"


export const Post = ({post, props}) =>{
    const {deletePost} = useContext(PostContext)    
    console.log(post)
    if(post.user === localStorage.getItem("app_user")){

        return(
            <div className="postCard">
            <h3>Post title : <Link to ={`/posts/${post.id}`}>{post.title}</Link></h3>
                <button onClick={()=>{
                deletePost(post.id)
            }}>
                Delete Post
            </button>
            <button onClick={() =>{
                props.history.push({
                    pathname: `posts/edit/${post.id}`,
                    state:{chosenPost: post}
                })
            }}>
                Edit Post
            </button>
            </div>
        )
    }else{
        return(
            <div className="postCard">
            <h3>Post title : <Link to ={`/posts/${post.id}`}>{post.title}</Link></h3>
            </div>
        )
    }
}