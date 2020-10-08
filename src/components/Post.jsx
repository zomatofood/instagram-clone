import React,{useState,useEffect} from 'react'
import '../Post.css';
import {db} from '../firebase';
import firebase from 'firebase'
import { useStateValue } from '../StateProvider';
import {useHistory} from 'react-router-dom'

function Post({username,post_image,likes,content,author_image,id,comments}) {
    const [{user},dispatch] = useStateValue();
    const [comment,setComment] = useState('');
    const [prevComment,setPrevComment] = useState([]);
    const history = useHistory();
    const handlikes = (e) =>{
        let post_id = e.target.id;

        db.collection('posts').doc(post_id).update({
            "liked_by":firebase.firestore.FieldValue.arrayUnion(user.name)
        }).then(()=>{
            history.push('/');
        })

    }

    useEffect(()=>{
        setPrevComment(comments);
        console.log(prevComment);
    },[]);



    const handleComment = (event)=>{
            let post_id = event.target.id;

            db.collection('posts').doc(post_id).update({
                "comments":firebase.firestore.FieldValue.arrayUnion({post_by:user.name,content:comment})
                
            }).then(()=>{
                setPrevComment(...prevComment,{post_by:user.name,content:comment});
            })
    }
    return (
        <div className="post">
            
            <div className="post__header">
                <div className="user__details">
                    <img src={author_image} alt=""/>
                    <h4>{username}</h4>
                </div>

                <div className="post__controls">
                        <a href="#/">Unfollow</a>
                        <a href="#/">Report</a>
                    </div>
            </div>
            <div className="post__content">
                    <p>{content}</p>
                </div>
                {!likes.includes(user.name)?<div className="post__image" onDoubleClick={handlikes}>
                <img src={post_image} alt="post__image_alter" id={id}/>
            </div>:<div className="post__image">
                <img src={post_image} alt="post__image_alter" id={id}/>
            </div>}
            <div className="post__footer">
                <div className="controls">
                    {likes.includes(user.name)?<i className="material-icons" style={{"color":"red"}}>favorite</i>:<i className="material-icons">favorite_border</i>}
                    <i className="material-icons">chat</i>
                    <i className="material-icons">send</i>
                </div>
                
                <p className="likes">{likes.length} Likes</p>
                <div className="post__comments">
                    {prevComment.map((comment)=>{
                        return <span><strong>{comment.post_by}</strong> {comment.content}</span>
                    })}
                </div>
                <div className="comment__input">
                    
                    <input type="text" placeholder="Add a comment..." value={comment} onChange={(event)=>setComment(event.target.value)}/>
                    <a onClick={handleComment} id={id} style={{"cursor":"pointer"}}>Post</a>
                </div>
            </div>
        </div>
    )
}

export default Post
