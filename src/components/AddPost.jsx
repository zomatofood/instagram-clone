import React,{useState} from 'react'
import '../New.css'
import {storage,db} from '../firebase'
import { useStateValue } from '../StateProvider';
import {useHistory} from 'react-router-dom'

function AddPost() {
    const [{user},dispatch] = useStateValue();
    const [content,setContent]  = useState('');
    const history = useHistory();
    const [isUploaded,setUploaded] = useState(false);
    const [progress,setProgress] = useState(0);

    const handleUpload = (url) =>{
        db.collection('posts').doc().set({
            "content":content,
            "author_id":user.id,
            "post_by":user.name,
            "image":url,
            "created_at":new Date().getTime(),
            "liked_by":[],
            "author_avatar":user.avatar,
            "comments":[],
            "reports":[]
        }).then(()=>{
            history.push('/');
        }).catch((error)=>{
            console.log(error);
        })
    }

    function uploadPicture(e){
        const file = e.target.files[0];
        let allowed_files = ["image/jpeg","image/jpg","image/png"];
        console.log(file.name);
        if(allowed_files.includes(file.type))
        {
            const storegRef = storage.ref(`images/${file.name}`)
            let task=storegRef.put(file)
            task.on('state_changed',(snapshot)=>{
                let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(progress);
                setProgress(progress);
            },(error)=>{
                console.log(error);
            },()=>{
                task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    handleUpload(downloadURL);
                  });
            })

        }
        else{
            console.log("Image file Required!");
        }
        
    }

    return (
        <div className="post__add">
            <div className="post__new">
                <h1>Add a New Post</h1>
                <div className="post__new__content">
    <textarea name="" id="" cols="30" rows="10"  onChange={(event)=>setContent(event.target.value)}>{content}</textarea>
                </div>
                {content.length>20 &&<div className="post__new__photo">
                <input type="file" id="upload" hidden onChange={uploadPicture}/>
    {progress?<label for="upload">Uploading {Math.round(progress)} %</label>:<label for="upload">Choose Image</label>}
                </div>}
                
            </div>
        </div>
    )
}

export default AddPost
