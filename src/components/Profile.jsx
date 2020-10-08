import React from 'react'
import '../Profile.css'
import Suggestions from './Suggestions';
import {Link,useHistory} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
function Profile() {
    const [{user},dispatch] = useStateValue();
    let profile_image = 'https://instagram.fblr16-1.fna.fbcdn.net/v/t51.2885-19/s150x150/118700811_143846950744661_8828280016858897958_n.jpg?_nc_ht=instagram.fblr16-1.fna.fbcdn.net&_nc_ohc=ktG_Mao-090AX8rWEuF&oh=e21a4171f742945a87227e6a8a186585&oe=5F8FAACA';
    const history = useHistory();
    if(!user){
        history.push('/login');
    }
    return (
        <div className="right_pane">{!user?null:<div>
        <div className="profile">
            <Link to={`/profile/${user.name}`} className="profile-box">
                <div className="box">
                <img src={user.avatar?user.avatar:'https://avatars.dicebear.com/api/avataaars/sammy.svg'} alt=""/>
                <div className="details">
                    <p className="username">{user.name}</p>
                    <p className="Name">{user.email}</p>
                </div>
               
            </div>
            </Link>
        </div>
        <Suggestions/>
        </div>}</div>
    )
}

export default Profile
