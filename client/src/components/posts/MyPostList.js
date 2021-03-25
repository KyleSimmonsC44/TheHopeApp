import React, {useContext, useEffect, useState} from "react"
import {PostContext} from "./PostProvider"
import {Post} from "./Post"
import {Link, useHistory} from "react-router-dom"

export const MyPostList = (props) =>{
    const {deletePost, getPostsByUserToken, posts, setPosts} = useContext(PostContext)
    const history = useHistory()

    useEffect(() =>{
        getPostsByUserToken()
    },[])

    return(
        <div>
            <h3 className="titleH3">Your Posts in This Community</h3>
            <div className="buttonDiv">

            <button className="contactForm-button" onClick={() =>{history.push("/posts/create")}}>Create A New Post</button>
            </div>
            <div className="contacts-div">
            {
                posts.map(p => <Post key={p.id} post={p} props={props}/>)
            }
            </div>
        </div>
    )
}