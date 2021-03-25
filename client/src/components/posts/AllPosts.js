import React, {useContext, useEffect, useState} from "react"
import {PostContext} from "./PostProvider"
import {Post} from "./Post"
import {Link, useHistory} from "react-router-dom"

export const AllPostList = (props) =>{
    const {deletePost, getPostsByCategoryId, posts} = useContext(PostContext)

    const history = useHistory()
    useEffect(() =>{
        getPostsByCategoryId()
    },[])

    return(
        <div>
            <h3 className="titleH3">All Community Posts</h3>
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