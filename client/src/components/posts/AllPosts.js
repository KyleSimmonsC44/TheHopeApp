import React, {useContext, useEffect, useState} from "react"
import {PostContext} from "./PostProvider"
import {Post} from "./Post"
import {Link} from "react-router-dom"

export const AllPostList = (props) =>{
    const {deletePost, getPostsByCategoryId, posts} = useContext(PostContext)

    useEffect(() =>{
        getPostsByCategoryId()
    },[])

    return(
        <div>
            <h3>All Community Posts</h3>
            <Link to="/posts/create">Create A New Post</Link>
            {
                posts.map(p => <Post key={p.id} post={p} props={props}/>)
            }
        </div>
    )
}