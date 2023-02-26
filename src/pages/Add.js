import React, { useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import  Router from 'next/router';

const Add = () => {
  const {status,data}=useSession();

      useEffect(()=>{
        if(status=='unauthenticated')
        {
          Router.replace("/auth/signin");
        }

      },[status])

  let Data={
    Name:'',
    FeeStatus:true,
    Fee:3000,
    Balance:0,
    Contact:'',
    Batch:'',
    FatherContact:'',
  }
  const NameChangeHandler=(e)=>{
    Data.Name=e.target.value;
  }
  const FeeChangeHandler=(e)=>{
    Data.Fee=e.target.value;

  }
  const ContactChangeHandler=(e)=>{
    Data.Contact=e.target.value;
  }
  const FatherContactChangeHandler=(e)=>{
    Data.FatherContact=e.target.value;
  }
  const BatchChangeHandler=(e)=>{
    Data.Batch=e.target.value;
  }
  


  const SubmitHandler=(e)=>{
    console.log(Data);
    e.preventDefault();
    let Options = {
      method:"POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body:JSON.stringify(Data)
    }

      fetch("/api/AddStudents", Options).then(res => {
        if (!res.ok) {
          throw Error('Failed To Fetch');
        }
        return res.json();
      }).then(data => {
       console.log(data);
      }).catch(err => {
       console.log(err.message);
      });

  }

  if(status=='authenticated')
  {

    return (
      <div>
          <Sidebar></Sidebar>
         <form onSubmit={SubmitHandler} className='StudentForm' >
         <TextField className='StudentInput' style={{marginTop:'1rem'}} onChange={NameChangeHandler} id="outlined-basic" label="Name" variant="outlined" />
         <TextField className='StudentInput'  style={{marginTop:'1rem'}} type='number' onChange={FeeChangeHandler} id="outlined-basic" label="Fee" variant="outlined" />
         <TextField  className='StudentInput' style={{marginTop:'1rem'}} onChange={ContactChangeHandler} id="outlined-basic" label="Contact" variant="outlined" />
         <TextField  className='StudentInput' style={{marginTop:'1rem'}} onChange={FatherContactChangeHandler} id="outlined-basic" label="FatherContact" variant="outlined" />
         <TextField  className='StudentInput' style={{marginTop:'1rem'}} onChange={BatchChangeHandler} id="outlined-basic" label="Batch" variant="outlined" />
  
         <Button className='submitbtn' type={'submit'} value='Add Student' variant="contained">Add Student</Button>
  
         </form>
  
      </div>
    )

  };
  return <div>Loading</div>

}

export default Add