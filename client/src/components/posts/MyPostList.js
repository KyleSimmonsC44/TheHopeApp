import React, {useContext, useEffect, useState} from "react"
import {PostContext} from "./PostProvider"
import {Post} from "./Post"
import {Link} from "react-router-dom"

export const MyPostList = (props) =>{
    const {deletePost, getPostsByUserToken, posts, setPosts} = useContext(PostContext)

    useEffect(() =>{
        getPostsByUserToken()
    },[])

    return(
        <div>
            <h3>Your Posts in This Community</h3>
            <Link to="/posts/create">Create A New Post</Link>
            {
                posts.map(p => <Post key={p.id} post={p} props={props}/>)
            }
        </div>
    )
}