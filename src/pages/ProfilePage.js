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
import { TextField } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Auth } from 'aws-amplify';
import {DialogBox} from '../components/UploadDialog';
import {Link as RouterLink} from 'react-router-dom';
import { WindowSharp } from '@mui/icons-material';
var imageDict = {};
function Album(){
  const [open, setOpen] = useState(false);

  function PhotoList(){
    const [photos, setPhotos] = useState([]);
    function handleClickOpen(e){
      setOpen(true);
    }
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
    const theme = createTheme();
    useEffect(() => {
      fetchImages()
    }, [])
    async function handleDeletePost(id){
      //delete it in S3
      Storage.configure({level: "protected",})
      console.log("This is the key" + id);
      await Storage.remove(id).then(() => {console.log("Deleted")}).catch(err => {console.log(err)});
      await API.graphql(graphqlOperation(mutations.deletePost, {input: {id: id}}))
      fetchImages();
    }
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
        imageDict[signedImage] = image.key;
        return signedImage;
      }))
      setPhotos(s3images)
    }
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
                <Button
                variant="contained"
                color="primary"
                component="label"
                onClick={handleClickOpen}
                >
                Upload a Photo to rate
                </Button>
                <DialogBox 
                open = {open}
                setOpen = {setOpen}
                />
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {photos.map((image) => (
                <Grid item key={image} xs={12} sm={6} md={4}>
                  <Card
                    sm={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sm={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={image}
                      alt="random"
                    />
                  </Card>
                  <CardActions>
                  <RouterLink to={`/post/${imageDict[image]}`}
                    style={{ textDecoration: 'none' }}>
                      <Button size="small">View</Button>
                  </RouterLink>
                      <Button size="small" onClick = {handleDeletePost(imageDict[image])}>Delete</Button>
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
  return(<PhotoList/>);
}
export default withAuthenticator(Album);