import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import JoditEditor from 'jodit-react';
import { useRef } from 'react'
import { addPost } from '../services/post-service'
import { getCurrentUserDetail } from '../auth'
import {toast} from 'react-toastify';
const AddPost = () => {
     const [categories,setCategories] = useState([]);
     const  editor = useRef(null);
     const [user, setUser] = useState(undefined);
     
     const [post, setPost] = useState({
          title:'',
          content:'',
          categoryId:''
      });
    
    useEffect(() => {

         setUser(getCurrentUserDetail())
         loadAllCategories().then(
            (data) => {
                console.log(data)
                setCategories(data);
            }
         ).catch(
            error => console.log(error)
         )
    },
    []);

    const changeHandler = (event) =>{
        setPost({
            ...post,[event.target.name] : event.target.value
        })
    }

    const contentFieldChanged = (data) =>{
        setPost({
          ...post,'content':data
        })
    }

    const createPost = (event) =>{

          event.preventDefault();
          
          //console.log(post);
          if(post.title.trim() === ''){
            toast.error('post title is required!!')
            return;
          }
          if(post.content.trim() === ''){
            toast.error('post content is required!!')
            return;
          }
          if(post.categoryId === ''){
            toast.error('select some category !!')
            return;
          }
            //Submit the form on server
            post['userId'] = user.id;
            addPost(post).then(response => {
               toast.success('Post Created')
               setPost({
                  title:'',
                  content:'',
                  categoryId:''
               })
                  //console.log(post);
            }).catch(error =>{
               toast.error('Some Error thrown creating post')
                 //console.log(error);
            })

    }

    const resetPostForm = () =>{
      setPost({
         title:'',
         content:'',
         categoryId:''
      })
    }

  return (
    <div className='wrapper'>
        <Card className='shadow-sm border-0 mt-2'>
            <CardBody>
                 <h3>Whats going on in your mind</h3>
                  {/* {JSON.stringify(post)} */}
                 <Form onSubmit={createPost}>
                     <div className='my-3'>
                        <Label for='title'>Post Title</Label>
                        <Input type='text' id='title' name='title'
                        placeholder='Enter Here'
                        value={post.title}
                        className='rounded-0'
                        onChange={changeHandler}/>
                     </div>
                     <div className='my-3'>
                        <Label for='content'>Post Content</Label>
                        {/* <Input type='textarea' id='content'
                        placeholder='Enter Here'
                        className='rounded-0'
                        style={{height:'200px'}}/> */}
                        <JoditEditor
			                ref={editor}
                            value={post.content}
                            onChange={contentFieldChanged}
                            tabIndex={1} // tabIndex of textarea
                            // onChange={changeHandler}
		                />
                     </div>
                     <div className='my-3'>
                        <Label for='category'>Category</Label>
                        <Input type='select' id='category'
                        placeholder='Enter Here'
                        className='rounded-0'
                        onChange={changeHandler}
                        name="categoryId"
                        defaultValue={0}   
                        >

                            <option disabled value={0}>--Select Category--</option>
                           {
                              categories.map(category => {
                                 return ( <option value={category.categoryId} key={category.categoryId}>
                                     {category.categoryTitle}
                                  </option>)
                              })
                           }

                        </Input>
                     </div>
                     <Container className='text-center'>
                         <Button color='primary' className='rounded-0' type='submit'>
                            Create Post
                         </Button>
                         <Button color='danger' className='rounded-0 ms-2' onClick={resetPostForm}>
                            Reset Content
                         </Button>
                     </Container>
                 </Form>
                 
            </CardBody>
        </Card>
    </div>
  )
}

export default AddPost