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
  function onChange(e) {
    if (!e.target.files[0]) return
    Storage.configure({level: "protected",})
    const file = e.target.files[0];
      // upload the image then fetch and rerender images
    Storage.put(uuid(), file).then (() => fetchImages())
    Storage.configure({level: "public",})
    Storage.put(uuid(), file).then (() => fetchImages())
  }  
const theme = createTheme();

//A react component that displays a list of images
//it fetches the images from S3 and displays them
//it also allows the user to upload new images
//it uses the react hooks to manage the state
class PhotoList extends React.Component{
    render(){
      return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
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
                <Button variant="outlined">Secondary action</Button>
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