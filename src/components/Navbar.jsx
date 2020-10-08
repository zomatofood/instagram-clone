import React from 'react';
import '../Navbar.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import { useStateValue } from '../StateProvider';

function Navbar() {
    let brand = 'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png';
    let profile_image = 'https://instagram.fblr16-1.fna.fbcdn.net/v/t51.2885-19/s150x150/118700811_143846950744661_8828280016858897958_n.jpg?_nc_ht=instagram.fblr16-1.fna.fbcdn.net&_nc_ohc=ktG_Mao-090AX8rWEuF&oh=e21a4171f742945a87227e6a8a186585&oe=5F8FAACA';
    const [{user},dispatch] = useStateValue();
    const history = useHistory();
    return (
        <>{!user?null:
        <div className="navbar">
            <div className="brand">
                <Link to="/"><img src={brand} alt=""/></Link>
            </div>
            <div className="search">
            <i className="material-icons">search</i><input type="text" placeholder="Search"/>
            </div>
            <div className="options">
                <i className="material-icons">home</i>
                <i className="material-icons-outlined">send</i>
                <i className="material-icons-outlined">explore</i>
                <i className="material-icons">favorite_border</i>
                <i className="material-icons" onClick={()=>history.push('/new')}>add</i>
                <Link to={`/profile/${user.name}`} className="nav-user-img"><img src={user.avatar?user.avatar:'https://avatars.dicebear.com/api/avataaars/sammy.svg'} alt=""/></Link>
            </div>
        </div>}</>


    )
}

export default Navbar
