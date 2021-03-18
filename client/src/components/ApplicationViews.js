import React from "react";
import { Route } from "react-router-dom";
import { RehabList } from "./rehab/RehabList";
import { RehabProvider } from "./rehab/RehabProvider";
import {RehabDetails} from "./rehab/RehabDetail"
import { CategoryProvider } from "./categories/CategoryProvider";
import { CategoryList } from "./categories/CategoryList";
import { ContactProvider } from "./contacts/ContactProvider";
import { ContactList } from "./contacts/ContactList";
import { ContactForm } from "./contacts/ContactForm";
import { PostProvider } from "./posts/PostProvider";
import { AllPostList } from "./posts/AllPosts";
import { MyPostList } from "./posts/MyPostList";
import { PostForm } from "./posts/PostForm";
import { PostDetails } from "./posts/PostDetail";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentList } from "./comments/CommentList";

export const ApplicationViews = (props) => {
    return (
      <>
        <main
          style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem",
          }}
        >
        <RehabProvider>
          <Route exact path="/emergency" render={(props)=><RehabList {...props}/>}/>
          <Route exact path="/rehab/:id(\d+)" render={(props) => <RehabDetails {...props}/>}/>
        </RehabProvider>
        <CategoryProvider>
          <Route exact path="/category" render={(props)=><CategoryList {...props}/>}/>
        </CategoryProvider>
        <ContactProvider>
          <Route exact path="/contacts" render={(props)=><ContactList {...props}/>}/>
          <Route exact path="/contacts/create" render={(props)=><ContactForm {...props}/>}/>
          <Route exact path="/contacts/edit/:id(\d+)" render={(props)=><ContactForm {...props}/>}/>
        </ContactProvider>
        <PostProvider>
          <CommentProvider>

        <Route exact path="/posts" render={(props)=><AllPostList {...props}/>}/>
          <Route exact path="/myposts" render={(props)=><MyPostList {...props}/>}/>
          <Route exact path="/posts/edit/:id(\d+)" render={(props)=><PostForm {...props}/>}/>
          <Route exact path="/posts/create" render={(props)=><PostForm {...props}/>}/>
          <Route exact path="/posts/:id(\d+)" render={(props)=><PostDetails {...props}/>}/>
          <Route
              exact
              path="/posts/:id(\d+)"
              render={(props) => <CommentList {...props} />}
              />
              </CommentProvider>
        </PostProvider>
        </main>
        </>
        )}