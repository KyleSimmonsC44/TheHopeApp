import React, {useContext, useState, useEffect} from "react"
import {PostContext} from "./PostProvider"
import "./PostForm.css"

export const PostForm = (props) =>{
    const {addPost, updatePost, posts, getPosts} = useContext(PostContext)
    const chosenPost = props.location.state ? props.location.state.chosenPost : {}

    const [post, setPost] = useState({
        id: chosenPost.id,
        title: chosenPost.title,
        content: chosenPost.content,
        categoryId: localStorage.getItem("categoryId")
    })

    const editMode = props.match.params.hasOwnProperty("id")
    
    const handleControlledInputChange = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const constructNewPost = () =>{
        if(editMode){
            updatePost(post)
            .then(() => props.history.push("/posts"))
        } else {
            addPost({
                title: post.title,
                content: post.content,
                categoryId: localStorage.getItem("categoryId")
            }).then(()=> props.history.push("/posts"))
        }
    }

    console.log(props)
    return(
      <main className="dataFormCSS">

        <form className="dataForm-div">
          <div className="title">{editMode ? "Edit Post" : "New Post"}</div>
          <div className="fields">
          <div className="username">
            <input type="text" name="title" required autoFocus className="form-control"
              placeholder="Post title"
              onChange={handleControlledInputChange}
              value={post.title}
              />
          </div>
          <div className="password">
            <textarea type="text" name="content" required autoFocus className="form-control"
              placeholder="Post Content"
              onChange={handleControlledInputChange}
              value={post.content}
              />
          </div>
        <button  className="dataForm-button"
          onClick={evt => {
            evt.preventDefault()
            constructNewPost()
          }}>
          {editMode ? "Submit Post" : "Save New Post"}
        </button>
        <button className="dataForm-button" onClick={() => {
          props.history.push(`/posts`)
        }}>Back
                </button>
                </div>
        </form>
        </main>
    )
}