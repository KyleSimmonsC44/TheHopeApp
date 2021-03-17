import React, {useState, useEffect, useContext} from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) =>{
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState([])

    const getPostsByCategoryId = () =>{
        return fetch(`http://localhost:8000/posts?category_id=${localStorage.getItem(categoryId)}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`
            }
            .then(res => res.json())
            .then(setPosts)
        })
    }

    const getPostsByUserToken = () =>{
        return fetch(`http://localhost:8000/posts?category_id=${localStorage.getItem(categoryId)}&user_token=${localStorage.getItem("app_user")}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`
            }
            .then(res => res.json())
            .then(setPosts)
        })
    }

    const getSinglePost = id =>{
        return fetch(`http://localhost:8000/posts/${id}`,{
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`
            }
            .then(res => res.json())
            .then(setPost)
        })
    }

    const addPost = (post) =>{
        return fetch("http://localhost:8000/posts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("app_user")}`
            },
            body: JSON.stringify(post)
        })
        .then((res)=>res.json())
        .then(()=>getPostsByCategoryId())
    }

    const updatePost = (post) =>{
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("app_user")}`
            },
            body: JSON.stringify(post)
        })
        .then(getPostsByCategoryId)
    }

    const deletePost = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE",
            headers:{
                Authorization: `Token ${localStorage.getItem("app_user")}`
            }
        })
            .then(getPosts)
    }

    return(
        <PostContext.Provider value={{
            posts, setPosts, post, setPost, updatePost, deletePost, addPost, getPostsByCategoryId, getPostsByUserToken, getSinglePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}