import React,{useState,useEffect} from 'react'
import '../Suggestion.css'
import {useHistory} from 'react-router-dom'
import {db} from '../firebase'
import { useStateValue } from '../StateProvider';
import firebase from 'firebase'

function Suggestions() {
    const [{user},dispatch] = useStateValue();
    const history = useHistory();
    const follow = (e) =>{
        let id = e.target.id;
        
        

        db.collection('users').doc(user.id).get().then((data)=>{
            db.collection("users").doc(id).update({
           
                "followers":firebase.firestore.FieldValue.arrayUnion(data.data())
     
                
             }).then(()=>{
               console.log("Done Following")
             }).catch((error)=>{
                 console.log(error);
             })
        }).catch((error)=>{
            console.log(error);
        })

        db.collection("users").doc(id).get().then((data)=>{
            db.collection("users").doc(user.id).update({
                "followings":firebase.firestore.FieldValue.arrayUnion(data.data())
            }).then(()=>{
                db.collection("users").doc(user.id).get().then((data)=>{
                    dispatch({
                        type:"SET_USER",
                        user:data.data(),
                    })
                    window.top.location = window.top.location
                })
            })
        })
    }
    
    let profile_image = 'https://instagram.fblr16-1.fna.fbcdn.net/v/t51.2885-19/s150x150/118700811_143846950744661_8828280016858897958_n.jpg?_nc_ht=instagram.fblr16-1.fna.fbcdn.net&_nc_ohc=ktG_Mao-090AX8rWEuF&oh=e21a4171f742945a87227e6a8a186585&oe=5F8FAACA';
    const [suggestions,setSuggestions]= useState(null);
    useEffect(()=>{
        db.collection("users")
    .onSnapshot(function(doc) {
        let suggestions = [];
       doc.docs.map((data)=>{
           suggestions.push(data.data());
       })
       setSuggestions(suggestions.filter((item)=>item.email!=user.email && !user.followings.some(person => person.id === item.id)));
    })

    },[])

    console.log(suggestions);

    return (
        <div>{suggestions!=null? <div className="suggestions">
            <div className="suggestions-header">
                <strong>Suggesttions for You</strong>
                <a href="#">See All</a>
            
            </div>
            {suggestions ?
            <ul>
               {suggestions.map((suggestion) =>{
                   return  <li key={suggestion.id}><img src={suggestion.avatar} alt="u-image"/><strong>{suggestion.name}</strong><a href="#/" onClick={follow} id={suggestion.id}>Follow</a></li>
               })}
               
            </ul>:<p>No User Found!</p>}
        </div>:null}</div>
    )
}

export default Suggestions
