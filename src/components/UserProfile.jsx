import React,{useState,useEffect} from 'react'
import '../UserProfile.css'
import {useHistory} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import {auth,db} from '../firebase'

function UserProfile() {
    const [{user},dispatch] = useStateValue();
    const [userpost,setUserPost] = useState([]);
    let history = useHistory();
   if(user){
    db.collection("posts").where("post_by", "==", user.name)
    .onSnapshot(function(querySnapshot) {

        let posts = []
        querySnapshot.docs.forEach((post)=>{
            posts.push({id:post.id,data:post.data()});
        })
        setUserPost(posts);
        
    });
   }
    

    function logout(){
        auth.signOut();
        dispatch({
          type:"SET_USER",
          user:null
        })
        history.push('/login');

    }
    return (
        <div>{user&& <div><div className="profile">
            <div className="user-image">
                <img src={user.avatar} alt=""/>
            </div>
            <div className="profile--info">
                <div className="basic--info">
                    <h4>{user.name}</h4>
                    <button onClick={logout} style={{"color": "#000"}}>Logout</button>
                </div>
                <div className="follower__info">
                    <p><strong>0</strong> posts</p>
                    <p><strong>{user.followers.length}</strong> followers</p>
                    <p><strong>{user.followings.length}</strong> following</p>
                </div>
                <div className="username">
                    <h3>{user.email}</h3>
                </div>
            </div>
        </div>
        <hr style={{"maxWidth":"850px","color":"#ccc"}}/>

        <div className="user__post" style={{"maxWidth":"850px"}}>
            {userpost.map((post)=>{
                return <div className="post__box">
                <img src={post.data.image} alt=""/>
            </div>
            })}
            
        </div>
        </div>}</div>
    )
}

export default UserProfile
