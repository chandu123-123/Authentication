import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {app} from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { signinsuccess,signinfailure } from "../redux/user/userslice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [image,setimage]=useState()
  const {currentuser}= useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const fileref=useRef(null)
  const [imageerror,setimageerror]=useState(false)
  const [formdata,setformdata]=useState({})
 const [success,setsuccess]=useState(false)
   const [uploadProgress, setUploadProgress] = useState(0);

   useEffect( () => {
     if (image) {
      
        handleimage(image);
   
      // Access Firebase Storage
     }
   }, [image]);
const handleimage=async (image)=>{
setimageerror(false)
 const storage=getStorage(app)
 const storageRef = ref(storage,new Date().getTime()+ image.name)
  
 // Upload image to Firebase Storage
 const uploadTask =uploadBytesResumable(storageRef,image)

 // Update progress of upload
 uploadTask.on(
   'state_changed',
   (snapshot) => {
     // Get upload progress
     const progress = Math.round(
       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       
       );
       console.log(progress)
     setUploadProgress(progress);
   },
   (error) => {
     // Handle unsuccessful upload
     console.log("error")
     console.error('Error uploading image:', error);
     setimageerror(true)
     setsuccess(false)
   }, 
   () => {
     // Handle successful upload
     console.log('Image uploaded successfully');
   getDownloadURL(uploadTask.snapshot.ref).then(
       (downloadURL)=>{
        console.log(downloadURL)
        setformdata({...formdata,photo:downloadURL})
        setimageerror(false)
        setsuccess(true)
        
 
      }
    )
   }
   
 );
}


const updating= async ()=>{
  console.log(formdata)
  const res = await fetch(`https://back-e54v.onrender.com/api/auth/updating/${currentuser._id}`, {
    method: 'POST', // Corrected: 'post' -> 'POST'
    headers:{
      'Content-Type': 'application/json' ,
    },
    body: JSON.stringify({formdata}) // Convert form object to JSON string
  });
  const data= await res.json()
  console.log("the data is")
  console.log(data._doc)
  if(data.ok==false){
    
    dispatch(signinfailure(true))
  }
  if(data.ok){
    dispatch(signinsuccess(data._doc))
}
}


const deleting=async ()=>{
  
  const res = await fetch("http://localhost:3001/api/auth/deleting", {
    method: 'POST', // Corrected: 'post' -> 'POST'
    headers:{
      'Content-Type': 'application/json' ,
    },
    body: JSON.stringify({id:currentuser._id}) // Convert form object to JSON string
  });
  const data=await res.json();
  if(data.ok){
    console.log(data.msg)
    dispatch(signinsuccess(null))
  }
  else{
    console.log(data.msg)
  }
}

const change=(e)=>{
  setformdata({...formdata,[e.target.id]:e.target.value})
}

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-[3.5rem] text-center my-3 max-w-lg mx-auto">Profile</h1>
      <form className="flex flex-col justify-center gap-5 max-w-lg mx-auto" >
       <input type="file" hidden ref={fileref} accept="image/*" onChange={(e)=>{setimage(e.target.files[0])}}/>
         
       <img src={success?formdata.photo:currentuser.photo} alt="" onClick={()=>{fileref.current.click()}} className="h-24 w-24 self-center cursor-pointer
        rounded-full object-cover "/>
        <p className="text-center ">{
       imageerror?"error in uploading": uploadProgress>0&&uploadProgress<100?`uploading ${uploadProgress} %`:uploadProgress==100?<span className="text-green-400">image uplaoded successfully</span>:""
}</p>
    
        <input type="text" defaultValue={currentuser.username} id="username" onChange={change} placeholder="Username" className="bg-slate-100 p-4 text-center" />
        <input type="text" defaultValue={currentuser.email} placeholder="Email"  id="email" onChange={change} className="bg-slate-100 p-4 text-center" />

        <input type="text" placeholder="Password"   id="password" onChange={change} className="bg-slate-100 p-4 text-center" />        
        <button type="button" onClick={updating} className="bg-blue-800 text-white font-bold uppercase p-3 hover:opacity-95 rounded-lg text-[25px]">update</button>
      </form>
      <div className="flex justify-between mt-4 text-red-600">
        <span className="cursor-pointer" onClick={deleting}>Delete Account</span>
        <span className="cursor-pointer" onClick={()=>{dispatch(signinsuccess(null))}}>Sign out</span>

      </div>
    </div>
  )
}
