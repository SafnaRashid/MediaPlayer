import SERVERURL from "./serverURL"
import commonAPI from "./commonAPI"


//saveVideoAPI-post http request,add component
export const saveVideoAPI=async(videoDetails)=>{
    return await commonAPI(`POST`,`${SERVERURL}/uploadVideos`,videoDetails)
}

//getAllVideosAPI -get method,called by view component,when component displays in browser inside its useEffect Hook
export const getAllVideosAPI=async()=>{
    return await commonAPI(`GET`,`${SERVERURL}/uploadVideos`,"")
}
//saveHistoryApi-post http method to http://localhost:3000/history called by videocard when we click on video
export const saveHistoryAPI=async(historyDetails)=>{
    return await commonAPI(`POST`,`${SERVERURL}/history`,historyDetails)
}

//getAllHistoryAPI-get http method request to http://localhost:3000/history called by history compnent when it open in browser
export const getAllHistoryAPI=async()=>{
    return await commonAPI(`GET`,`${SERVERURL}/history`,"")
}

//deleteHistoryAPI-delete method to http://localhost:3000/history called by history component when clicked on delete button 
export const deleteHistoryAPI=async(id)=>{
    return await commonAPI(`DELETE`,`${SERVERURL}/history/${id}`,{})
}

//removeVideoAPI-delete method to history  url called by videoCard component when clicked on delete button 
export const removeVideoAPI =async(id)=>{
    return await commonAPI(`DELETE`,`${SERVERURL}/uploadvideos/${id}`,{})
}
//saveCategory-Post request http://localhost:3000/categories called by category component when user click on add btn
//categoryDetails={categoryName,allVideos}
export const saveCategoryAPI =async(categoryDetails)=>{
    return await commonAPI(`POST`,`${SERVERURL}/categories`,categoryDetails)
}
//getAllCategoryAPI-get method, http://localhost:3000/categories called by category compnent when it loaded in browser
export const getAllCategoryAPI=async()=>{
    return await commonAPI(`GET`,`${SERVERURL}/categories`,{})
}
// deleteCategoryAPI -delete method to http://localhost:3000/categories/id called by category component  when clicked on delete button
export const deleteCategoryAPI=async(id)=>{
    return await commonAPI(`DELETE`,`${SERVERURL}/categories/${id}`,{})
}

// updateCategoryAPI -put method to http://localhost:3000/categories/id called by category component  when video drop over the category
export const updateCategoryAPI=async(categoryDetails)=>{
    return await commonAPI(`PUT`,`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}