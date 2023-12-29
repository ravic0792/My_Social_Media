import  { createContext, useEffect, useReducer, useState } from "react";

export const PostList=createContext({
   postList:[],
   addPost:()=>{},
   deletePost:()=>{},
   
});

const postListReducer=(currPostList,action)=>{

  let newPostList=currPostList;
  if(action.type==="DELETE_POST"){
      newPostList=newPostList.filter((post)=>{
      return post.id!=action.payload.postId
    });
  }else if(action.type==="ADD_POST"){
     newPostList=[action.payload , ...newPostList];
  }else if(action.type==="ADD_POSTS"){
   newPostList=action.payload.posts;
  }

  return newPostList;
}

const PostListProvider=({children})=>{

  const [postList,dispatchPostList]=useReducer(postListReducer,[]);



function addPost(post){
   console.log(post)
   dispatchPostList({
    type:"ADD_POST",
    payload:post
   });

}

function addInitialPosts(posts){
  dispatchPostList({
      type:"ADD_POSTS",
      payload:{
        posts
      }
  });
}

function deletePost(postId){
   const actionDelete={
    type:"DELETE_POST",
    payload:{
      postId,
    }
   }
   dispatchPostList(actionDelete)
}




return <PostList.Provider value={{postList,addPost,deletePost}}>{children}</PostList.Provider>

}



export default PostListProvider;

