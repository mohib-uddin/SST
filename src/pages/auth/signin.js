import React from 'react'
import {signIn} from "next-auth/react";
import { TextField,Button } from '@mui/material';
import logo from './logo.jpg'
import Image from 'next/image';
const UserObj={
    username:'',
    password:'',
    redirect:false,
}


const signin = () => {

    const NameChangeHandler=(e)=>{
        UserObj.username=e.target.value;
    }
    const PasswordChangeHandler=(e)=>{
        UserObj.password=e.target.value;
    }

    const SubmitHandler=async(e)=>{
          e.preventDefault();
          const res=await signIn("credentials",UserObj);
          console.log(res);
    }
  return (

    <div className='logincont'>

        <div className='logindesc'>
         <h2 style={{textAlign:'center',color:'white'}}>Sir Saqib Tuitions</h2>
        </div>
 <form  onSubmit={SubmitHandler} className='loginform'>
              
              <TextField style={{marginTop:'1rem'}} onChange={NameChangeHandler}  id="outlined-basic" label="Username" variant="outlined" />
              <TextField type='password' style={{marginTop:'1rem'}} onChange={PasswordChangeHandler}  id="outlined-basic" label="Password" variant="outlined" />
              <Button style={{marginTop:'1rem',    background: 'linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)'}} type='submit' variant="contained">Login</Button>

   </form>
    </div>
   
  )
}

export default signin;