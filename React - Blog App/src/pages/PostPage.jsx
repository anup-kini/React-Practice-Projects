import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import Base from '../components/Base'
import { loadPost } from '../services/post-service';
import {toast} from 'react-toastify';
import { BASE_URL } from '../services/helper';
const PostPage = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => {
        // load post of postId
        loadPost(postId).then(data => {
            console.log(data);
            setPost(data);
        }).catch(error=>{
            console.log(error)
            toast.error("Error from server !!")
        })
    },[])
  
    const printDate = (numbers) => {
        return new Date(numbers).toLocaleDateString();
    }
  return (
    <Base>
         <Container className='mt-4'>
             <Link to="/">Home</Link>
             <Row>
                <Col md={
                    {
                        size:12
                    }
                }>
                   <Card className='mt-3'>
                     {
                        (post) && (
                            <CardBody>
                                <CardText>Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b>  </CardText>
                                <CardText>
                                    <span className='text-muted'>{post.category.categoryTitle}</span>
                                </CardText>
                                <CardText className='mt-3' style={{fontSize:'20px'}}>
                                    {post.title}
                                </CardText>
                                <div className="image-container mt-4 shadow">
                                    <img className='img-fluid'
                                    style={{maxWidth:'50%'}} 
                                    src={BASE_URL+'/post/image/'+post.imageName} 
                                    alt="#"
                                    />
                                </div>
                                <CardText className='mt-5' dangerouslySetInnerHTML={{__html:post.content}}>

                                </CardText>
                            </CardBody>
                        )
                     }
                   </Card>  
                   

                </Col>
             </Row>
         </Container>
    </Base>
  )
}

export default PostPage