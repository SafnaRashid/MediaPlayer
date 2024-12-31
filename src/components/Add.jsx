
import react, { useState } from 'react';
import { Button,Modal ,FloatingLabel,Form,ModalBody,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import { saveVideoAPI } from '../services/allAPI';

const Add = ({setAddResponseFromHome}) => {
    {/*state create for video */}
    const [InvalidYoutubeLink,setInvalidYoutubeLink]=useState(false)
    const [VideoDetails,setVideoDetails]=useState({
      caption:"",imgUrl:"",youtubeLink:""
    })
    console.log(VideoDetails);
    
     {/*Modal state */}
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const extractEmbedLinkFromYoutubeLink=(userInputYoutubeLink)=>{
    //steps to create embed code from youtube link
    if(userInputYoutubeLink.includes("https://www.youtube.com/watch?v=")){
          console.log(userInputYoutubeLink.split("v=")[1].slice(0,11));
        const videoId=userInputYoutubeLink.split("v=")[1].slice(0,11)
        setInvalidYoutubeLink(false)
        setVideoDetails({...VideoDetails,youtubeLink:`https://www.youtube.com/embed/${videoId}`})
    }else{
      setInvalidYoutubeLink(true)
      setVideoDetails({...VideoDetails,youtubeLink:""})
    }
  }

  //store video details 
  const handleUploadVideo=async()=>{
    //object destructuring
    const {caption,imgUrl,youtubeLink}=VideoDetails
    if(caption && imgUrl && youtubeLink){
       try {
        const result=await saveVideoAPI(VideoDetails)
       console.log(result);
       if(result.status>=200 && result.status<300){
        alert("Video uploaded successfully!!")
        handleClose()
        //pass the result to view component
        setAddResponseFromHome(result)

       }else{
        console.log(result);
        
       }
       } catch (err) {
        console.log(err);
        
       }
       
    }else{
      alert("Please Fill the Form!!!")
    }
  }

  return (
    <>
    <div className='d-flex align-items-center '>
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
    </div>
  
  {/*Modal*/}
  <Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton>
    <Modal.Title>Upload Video Details!!!</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* floating label */}
    <div className='border rounded p-3'>
    <FloatingLabel controlId="floatingCaption" label="Caption">
        <Form.Control onChange={e=>setVideoDetails({...VideoDetails,caption:e.target.value})} type="text" placeholder="Video Caption" />
      </FloatingLabel>

      <FloatingLabel  className='mt-2'controlId="floatingUrl" label="Video Image Url">
        <Form.Control onChange={e=>setVideoDetails({...VideoDetails,imgUrl:e.target.value})}  type="text" placeholder="Video Image Url" />
      </FloatingLabel>

      <FloatingLabel  className='mt-2' controlId="floatingCaption" label="video Youtube Link">
        <Form.Control  onChange={e=>extractEmbedLinkFromYoutubeLink(e.target.value)}type="text" placeholder="video Youtube Link " />
      </FloatingLabel>
      {
        InvalidYoutubeLink &&
        <div className='text-danger fw-bolder'>Invalid Youtube Link</div>
      }
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button onClick={handleUploadVideo} variant="primary">Add</Button>
  </Modal.Footer>
</Modal>
</>
  )
}

export default Add