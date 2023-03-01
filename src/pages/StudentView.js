import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import Link from "next/link";

const StudentView = () => {
    let [ID,setID]=useState('');
    const IDChangeHandler=(e)=>{
          setID(e.target.value);
    }


  return (
    <div style={{display:'flex',flexDirection:'column',width:'30%',margin:'auto'}}>
        <TextField onChange={IDChangeHandler} placeholder='Enter Your Contact Number'></TextField>
        <Button className='submitbtn' type={'submit'} value='Add Student' variant="contained"><Link
                style={{textDecoration:'none',color:'white'}}
                href={{
                     pathname: "/StudentProgress",
                    query:{StudentContact:ID} , // the data
                    }}
                    >
                View Result
                      
        </Link></Button>

        
    </div>
  )
}

export default StudentView