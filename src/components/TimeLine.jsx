import React,{useContext,useState,useEffect} from 'react'
import Post from './Post'
import { useStateValue } from "../StateProvider";
import '../TimeLine.css'
import {db} from '../firebase';

function TimeLine() {
    const [posts,setPosts] = useState([]);
    const [{user},dispatch] = useStateValue();


    useEffect(()=>{
        db.collection("posts").get().then((data)=>{
          let post_items = [];
          data.docs.forEach((doc)=>{
            post_items.push({key:doc.id,data:doc.data()});
            
    
          })
    
          setPosts(post_items.filter((item)=>{return !user.followers.some(person => person.id === item.key.id) || item.data.post_by===user.name}));
          
          
        })
      },[])
    return (
        <div className="timeline">
           
            {/* <Post/>
            <Post/>
            <Post/> */}
            {posts.map((post)=>{
                return <Post username={post.data.post_by} post_image={post.data.image} id={post.key} key={post.key} author_image={post.data.author_avatar} likes={post.data.liked_by} content={post.data.content} author_avatar={post.author_avatar} comments={post.data.comments}/>
            })}
            
            
            
        </div>
    )
}

export default TimeLine
