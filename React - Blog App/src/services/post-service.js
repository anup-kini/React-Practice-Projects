import { myAxios, privateAxios } from "./helper"

export const addPost = (postData) =>{
   // console.log(postData);
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
                  .then(response => response.data )
}

export const loadAllPosts = (pageNumber,pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate`).then(response => response.data);
}

// load single post of given id

export const loadPost = (postId) => {
    return myAxios.get("/posts/"+postId).then(response => response.data);
}