import React from 'react'

const emailValidation = (email)=>{
    const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if(testEmail===false){
        return "enter correct email"
    }
     
        return null
        
    }
    export default emailValidation