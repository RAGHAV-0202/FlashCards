const sendResponse = (code,error,data)=>{
    return {
        StatusCode : code , 
        message : error,
        data : data || "Success"
    }
}

export { sendResponse}