//rafce
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {getAllHistoryAPI,deleteHistoryAPI} from '../services/allAPI'


const History = () => {

const [allVideoHistory,setAllVideoHistory]=useState([])

useEffect(()=>{
  getAllHistory()
},[])

const getAllHistory=async()=>{
  try {
    const result=await getAllHistoryAPI()
    if(result.status>=200 && result.status<300){
      setAllVideoHistory(result.data)
    }else{
      console.log(result);
      
    }
  } catch (err) {
    console.log(err);
    
  }
}

const removeHistory=async(id)=>{
  try {
    await deleteHistoryAPI(id)
    getAllHistory()
  } catch(err) {
    console.log(err);
    
  }
}


  return (
    <div style={{paddingTop:'100px'}}>
      <div className='d-flex justify-content-between container'>
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to home</Link>
      </div>

      {/* table */}
      <table className='container'>
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>TimeSamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
         {
          allVideoHistory?.length>0?
          allVideoHistory?.map((videoDtails,index)=>(
            <tr key={videoDtails?.id}>
            <td>{index+1}</td>
            <td>{videoDtails?.caption}</td>
            <td>{videoDtails?.youtubeLink}</td>
            <td>{videoDtails?.timeStamp}</td>
            <td><button onClick={()=>removeHistory(videoDtails?.id)} className='btn'><i class="fa-solid fa-trash text-danger " ></i></button></td>
           </tr>
          )):
       <div className='fw-bolder text-danger'>You didn't watch any video yet!!</div>
         }
        </tbody>

      </table>
    </div>
  )
}

export default History