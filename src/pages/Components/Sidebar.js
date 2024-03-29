import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import { Paper } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GridViewIcon from '@mui/icons-material/GridView';
import QuizIcon from '@mui/icons-material/Quiz';
import GradingIcon from '@mui/icons-material/Grading';
const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />


      <List >
        {[<Link className='link' href='/Add' >Add Students</Link>, <Link className='link' href='/GetStudents' >Get Students</Link>,  <Link className='link' href='/Tests' >Add A Test</Link>, <Link className='link' href='/ViewTest' >View Tests</Link>].map((text, index) => (
          <ListItem  className='list-item' key={index} disablePadding>
            <ListItemButton>
            <ListItemIcon className='icon'>
                {index=== 0 && <PersonAddIcon />}
                {index=== 1 &&<GridViewIcon />}
                {index=== 2 &&<QuizIcon />}
                {index=== 3 &&<GradingIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>



      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box style={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >  
      
        <Toolbar style={{background: '#24252A',color:'white'}}>
          {/*background: "linear-gradient(to right, #E100FF, #7F00FF)"*/}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sir Saqib Tuitions
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
        
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
         <Paper
        style={{ background: '#24252A',height:'100%' }} // set your desired background color
        elevation={0} // remove the default box shadow
        square // remove the default rounded corners
      >
                  {drawer}

      </Paper>

        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
          open
        >
           <Paper
        style={{ background: '#0355FF',color:'black',height:'100%' }} // set your desired background color
        elevation={0} // remove the default box shadow
        square // remove the default rounded corners
      >
                  {drawer}

      </Paper>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;