import React, { useContext } from "react"
import { PostContext } from "./PostProvider"
import {Link} from "react-router-dom"


export const Post = ({post, props}) =>{
    const {deletePost} = useContext(PostContext)    
    console.log(post)
    if(post.user === localStorage.getItem("app_user")){

        return(
            <div className="postCard">
            <h3>{post.title}</h3>
            <div className="buttonBox">

                <button className="contact-button" onClick={()=>{
                    deletePost(post.id)
                }}>
                Delete Post
            </button>
            <button className="contact-button" onClick={() =>{
                props.history.push({
                    pathname: `posts/edit/${post.id}`,
                    state:{chosenPost: post}
                })
            }}>
                Edit Post
            </button>
                </div>
            <button className="contact-button" onClick={() =>{
                props.history.push({
                    pathname: `posts/${post.id}`,
                    state:{chosenPost: post}
                })
            }}>
                View Post and Comments
            </button>
            </div>
        )
    }else{
        return(
            <div className="postCard">
            <h3>{post.title}</h3>
            <button className="contact-button" onClick={() =>{
                props.history.push({
                    pathname: `posts/${post.id}`,
                    state:{chosenPost: post}
                })
            }}>
                View Post and Comments
            </button>
            </div>
        )
    }
}