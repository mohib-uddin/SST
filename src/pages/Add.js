import React, { useEffect,useState } from 'react'
import Sidebar from './Components/Sidebar'
import TextField from '@mui/material/TextField';
import { Button,Box,MenuItem,Select,FormControl,InputLabel} from '@mui/material';
import { useSession } from 'next-auth/react';
import  Router from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

  

let Data={
  Name:'',
  FeeStatus:true,
  Fee:3000,
  Balance:0,
  Contact:'',
  FatherContact:'',
}


const Add = () => {
  const {status,data}=useSession();

      useEffect(()=>{
        if(status=='unauthenticated')
        {
          Router.replace("/auth/signin");
        }

      },[status])

    


    const [StdBatch,setBatch]=useState('IX');
    const [StdMajor,setMajor]=useState('CS');


  

    const BatchChange=(e)=>{
       setBatch(e.target.value);
    }
    const MajorChange=(e)=>{
      setMajor(e.target.value);
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


  const SubmitHandler=(e)=>{
    const Payload={
      ...Data,
      Batch:StdBatch,
      Major:StdMajor,
    }
    console.log(Payload);
    e.preventDefault();
    let Options = {
      method:"POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body:JSON.stringify(Payload)
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

         <Box sx={{ minWidth: 120 }} style={{marginTop:'1rem'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={StdBatch}
              label="Batch"
              onChange={BatchChange}
            >
              <MenuItem value={'IX'}>IX</MenuItem>
              <MenuItem value={'X'}>X</MenuItem>
              <MenuItem value={'XI'}>XI</MenuItem>
              <MenuItem value={'XII'}>XII</MenuItem>
    
            </Select>
          </FormControl>
        </Box>

         <Box sx={{ minWidth: 120 }} style={{marginTop:'1rem'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={StdMajor}
              label="Major"
              onChange={MajorChange}
            >
              <MenuItem value={'PE'}>Pre Engineering</MenuItem>
              <MenuItem value={'CS'}>Computer Science</MenuItem>
              <MenuItem value={'PM'}>Pre Medical</MenuItem>
              <MenuItem value={'Gen'}>General</MenuItem>
    
            </Select>
          </FormControl>
        </Box>
         <Button className='submitbtn' type={'submit'} value='Add Student' variant="contained">Add Student</Button>
  
         </form>
  
      </div>
    )

  };
  return       <CircularProgress style={{color:'#3D4E81',margin:'auto',marginTop:'2rem'}} />


}

export default Add