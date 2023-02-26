import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import { TextField,Button} from '@mui/material'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from "next/link";
import { Line,Bar, Chart} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useRouter } from 'next/router';
import { textAlign } from '@mui/system';
import { useSession } from 'next-auth/react';
import  Router  from 'next/router';

const StudentProgress=()=>{

  const {status,dData}=useSession();

  //States For The Visualization
  const [Label,setLabel]=useState([]);
  const [Data,setData]=useState([]);
  const [ID,setID]=useState([]);
  const [row,setRow]=useState();
  const [Subject,setSubject]=useState();

  
const router = useRouter();
const data = router.query;
console.log(data.StudentName);


const handleChange=(event)=>
{
    setData('');
    setLabel('');
    setID('');
   row.Tests.map((e)=>{

      if(e.Subject==event.target.value)
      {
        setData(current=>[...current,e.ObtainedMarks]);
        setLabel(current=>[...current,e.MaxMarks])
        setID(current=>[...current,e.date])
      }

    })

}



  useEffect(()=>{
    if(status=='unauthenticated')
    {
      Router.replace("/auth/signin");
    }
    else
    {
      FetchApi();
    }

  },[status])

  const FetchApi=async()=>{
    let Options = {
      method:"PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body:JSON.stringify({Name:data.StudentName})
    }
    fetch("/api/GetAStudentQuery", Options).then(res => {
        if (!res.ok) {
          throw Error('Failed To Fetch');
        }
        return res.json();
      }).then(data => {
       Visualize(data.students)
      }).catch(err => {
       console.log(err.message);
      });
  }






  const Visualize=(res)=>{
    
    setRow(res);
    if(res)
    {
      res.Tests.map((e)=>{
        setData(current => [...current, (e.ObtainedMarks/e.MaxMarks)*100]);
        setLabel(current=>[...current,e.MaxMarks])
        setID(current=>[...current,e.date])
        })
    }


   
             


  }

 
 

   
    



const columns = [
        {
          field: 'Title',
          headerName: 'Title',
          width: 150,
          editable: true,
          flex:1,
        },
        
        {
            field: 'Instructor',
            headerName: 'Instructor',
            width: 150,
            editable: true,
            flex:1,
        },

        {
            field: 'Subject',
            headerName: 'Subject',
            width: 150,
            editable: true,
            flex:1,
        },

        {
            field: 'Date',
            headerName: 'Date',
            width: 150,
            editable: true,
            flex:1,
        },
        {
            field: 'MaxMarks',
            headerName: 'MaxMarks',
            width: 150,
            editable: true,
            flex:1,
        },
        {
            field: 'ObtainedMarks',
            headerName: 'ObtainedMarks',
            width: 150,
            editable: true,
            flex:1,
        },
        {
          flex:1,
          field: 'Status',
          headerName: 'Status',
          renderCell:(cellValues)=>{return(
  
            (cellValues.row.ObtainedMarks/cellValues.row.MaxMarks<0.5) ? <p style={{color:'red'}}>Fail</p> : <p style={{color:'green'}}>Pass</p>
        ) },
          width: 150,
        },


      ];
 

      if(status=='authenticated')
      {

        return(

          <div>
              <Sidebar></Sidebar>
              <Box sx={{ height: 400, width: '100%' }}>
               {row&&<h2 style={{textAlign:'center'}} >{row.Name}</h2>}
  
  
          {row&& 
                  <DataGrid
                  className='datagrid'
                  rows={row.Tests}
                  columns={columns}
                  getRowId={(row) => row.Title}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
              />}
          </Box>
  
  
          <Box style={{ width: '20%',margin:'auto',marginTop:'4rem' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Subject}
              label="Subject"
              onChange={handleChange}
            >
              <MenuItem value={'Maths'}>Maths</MenuItem>
              <MenuItem value={'Chemistry'}>Chemistry</MenuItem>
              <MenuItem value={'Physics'}>Physics</MenuItem>
              <MenuItem value={'Computer'}>Computer</MenuItem>
    
            </Select>
          </FormControl>
  
        </Box>
  
  
  
              <div className='visualization'>
              <Line
                        datasetIdKey='id'
                        data={{
                          labels: Label,
                          datasets: [
                            {
                              id: ID,
                              label: '',
                              data: Data,
                            },
                          
                          ],
                        }}
                      />
              </div>
  
  
  
             
             
  
          </div>
         
      );


      }
   
     return <div>Loading</div>
}

export default StudentProgress;