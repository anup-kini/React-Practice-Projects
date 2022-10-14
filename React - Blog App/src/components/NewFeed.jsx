import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Col, Row,Pagination,PaginationItem,PaginationLink, Container} from 'reactstrap'
import { loadAllPosts } from '../services/post-service'
import Post from './Post'

const NewFeed = () => {
    const[postContent,setPostContent] = useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    });
    useEffect(() => {
        loadAllPosts(0,5).then(data => {
            //console.log(data);
            setPostContent(data);
           // toast.success('Post loaded successfully')
        }).catch(error => {
            console.log(error);
        })
    },[])

    const changePage = (pageNumber=0,pageSize=5) => {
        if(pageNumber > postContent.pageNumber && postContent.lastPage){
            return;
        }

        if(pageNumber < postContent.pageNumber && postContent.pageNumber === 0){
            return;
        }
        loadAllPosts(pageNumber,pageSize).then(data => {
            setPostContent(data)
            window.scroll(0,0);
        }).catch(error => {
            toast.error('Error in loading posts')
        })
    }
  return ( 
    <div>
       <div className="container-fluid">
          <Row>
             <Col md={
                {
                    size:10,
                    offset:1
                }
             }>

               <h1>Blogs Count ({postContent?.totalElements})</h1>
              
               {
                 postContent?.content.map(
                    post => {return (
                        <Post key={post?.title} post={post}/>
                    )}
                 )
              } 
              <Container className='mt-3'>
              <Pagination size='lg'>
                <PaginationItem disabled={postContent.pageNumber === 0} 
                                onClick={() => changePage(postContent.pageNumber -1 )}>
                    <PaginationLink previous>
                       Previous
                    </PaginationLink>
                </PaginationItem>
                 {
                     [...Array(postContent.totalPages)].map((item,index) => (
                        <PaginationItem key={index} 
                                        onClick={() => changePage(index)} >
                            <PaginationLink >
                                {index+1}
                            </PaginationLink>
                        </PaginationItem>
                     ) )
                 }
                <PaginationItem disabled={postContent.lastPage} onClick={() => changePage(postContent.pageNumber + 1)}>
                    <PaginationLink next>
                     Next
                    </PaginationLink>
                </PaginationItem>
              </Pagination>
              </Container>
             </Col>
          </Row>
       </div>
    </div>
  )
}

export default NewFeed