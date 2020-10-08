import React,{useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TimeLine from './components/TimeLine';
import Profile from './components/Profile'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './components/Home';
import UserProfile from './components/UserProfile'
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import {auth,db} from './firebase'
import AddPost from './components/AddPost';

function App() {
  const [{},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log(authUser);
      if(authUser)
      {
          // dispatch({
          //   type:"SET_USER",
          //   user:authUser
          // })
          db.collection("users").doc(authUser.uid).get().then((data)=>{
            if(data.exists){
                console.log(data.data());
                dispatch({
            type:"SET_USER",
            user:data.data()
          })
                }
            
        })
      }
      else{
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  },[])
  return (
    
      <Router>
      <Navbar/>
     <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/profile/:profile_name" component={UserProfile}></Route>
        <Route path="/login" exact component={Login}/>
        <Route path="/new" exact component={AddPost}/>
        </Switch>
    </Router>
  );
}

export default App;