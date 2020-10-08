import React,{useState} from 'react'
import '../Login.css'
import {auth,provider,db} from '../firebase.js'
import {Link,useHistory} from 'react-router-dom'
import { useStateValue } from '../StateProvider';

function Login() {
    let brand = 'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png';
    const [state,dispatch] = useStateValue();
    const [{user}] = useStateValue();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

   
    function Login(e){
        e.preventDefault();
       auth.signInWithPopup(provider).then((result)=>{
        
           db.collection("users").doc(result.user.uid).get().then((data)=>{
               if(data.exists){
                   history.push('/');
                   
              
               }
               else{
                return db.collection('users').doc(result.user.uid).set({
                    id:result.user.uid,
                    avatar:result.user.photoURL,
                    name:result.user.displayName,
                    email:result.user.email,
                    isVerified:result.user.emailVerified,
                    followers:[],
                    followings:[],
                    location:'Kolkata'
                }).then(()=>{
                    history.push('/');
                   
                });
               }
           })
       }).catch((error)=>{
           console.log(error);
       })
    }
    if(user){
        history.push('/');
    }
    
        return (
            <div>
            <div className="login">
                <h2>Instagram</h2>
                    <form>
                    <button onClick={Login}>Login with Google</button>
                </form>
            </div>
            </div>
    
        )
    
    
}

export default Login
