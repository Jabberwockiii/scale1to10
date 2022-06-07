// src/App.js
import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify'
import { withAuthenticator} from '@aws-amplify/ui-react'
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { graphqlOperation } from 'aws-amplify';

import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function Album() {
  //images hook
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchImages()
  }, [])
  async function fetchImages() {
      // Fetch list of images from S3
    Storage.configure(
      {
        level: "protected",
      }
    )
    let s3images = await Storage.list('')
      // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key)
      return signedImage
    }))
    setImages(s3images)
  }
  function generatePopWindow(e){

  }
  function onChange(e) {
    if (!e.target.files[0]) return
    Storage.configure({level: "protected",})
    const file = e.target.files[0];
      // upload the image then fetch and rerender images
    const photo_id = uuid()
    Storage.put(photo_id, file).then (() => fetchImages())
    Storage.configure({level: "public",})
    Storage.put(photo_id, file).then (() => fetchImages())
    // two photos were stored one in public and one in protected
    // Use API to create a post with the photo_id
    API.graphql(graphqlOperation(mutations.createPost, {input: {images : photo_id + '.png'}}))
  }  
const theme = createTheme();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

class PhotoList extends React.Component{
    render(){
      return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Share a Picture to find something new about yourself
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                You are anxious about your appearance but we can help, get some feedback from your friends.
                And see how attractive you are 
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained"><input
                type="file"
                accept='image/png'
                onChange={onChange}
                />Upload a Photo to rate</Button>
                {/*some miracle here*/}
                <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Open full-screen dialog
                </Button>
                <Dialog
                  fullScreen
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Transition}
                >
                  <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Sound
                      </Typography>
                      <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <List>
                    <ListItem button>
                      <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                      />
                    </ListItem>
                  </List>
                </Dialog>
                </div>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {images.map((image) => (
                <Grid item key={image} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={image}
                      alt="random"
                    />
                  </Card>
                  <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                  </CardActions>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
      );
    }
}
  //final return 
  return (<PhotoList />);
}
export default withAuthenticator(Album);