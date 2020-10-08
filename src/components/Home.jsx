import React,{useEffect,useState} from 'react'
import Profile from './Profile'
import TimeLine from './TimeLine'
import '../Home.css'
import { useStateValue } from '../StateProvider';
import Login from './Login';
import {db} from '../firebase';

function Home() {

  const [{user},dispatch] = useStateValue();


 
      return (
        <div>
          
          {user?<div className="home">
            
        <TimeLine />
        <Profile/>
      </div>:<Login/>}
      
      </div>
      )
}

export default Home
