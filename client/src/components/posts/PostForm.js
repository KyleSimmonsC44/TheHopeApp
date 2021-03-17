import React, {useContext, useState, useEffect} from "react"
import {PostContext} from "./PostProvider"

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
        <form>
            <h2 className="tagForm__title">{editMode ? "Edit Post" : "New Post"}</h2>
            <fieldset>
          <div className="form-group">
            <label htmlFor="title">Post Title: </label>
            <input type="text" name="title" required autoFocus className="form-control"
              placeholder="Post title"
              onChange={handleControlledInputChange}
              value={post.title}
            />
          </div>
        </fieldset>
            <fieldset>
          <div className="form-group">
            <label htmlFor="content">Post Content: </label>
            <textarea type="text" name="content" required autoFocus className="form-control"
              placeholder="Post Content"
              onChange={handleControlledInputChange}
              value={post.content}
            />
          </div>
        </fieldset>
        <button type="submit"
          onClick={evt => {
            evt.preventDefault()
            constructNewPost()
          }}
          className="btn btn-primary">
          {editMode ? "Submit Post" : "Save New Post"}
        </button>
        <button onClick={() => {
                    props.history.push(`/posts`)
                }}>Back
                </button>
        </form>
    )
}