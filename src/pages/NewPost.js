// src/App.js
import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify'
import { withAuthenticator} from '@aws-amplify/ui-react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
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
//This is very dangerous 
var imageDict = {};
function Gallery() {
  //images hook
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchImages()
  }, [])
  async function fetchImages() {
      // Fetch list of images from S3
    Storage.configure({level: "public",})
    let s3images = await Storage.list('')
    console.log("s3 images: ",s3images);
      // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(s3images.map(async image => {
      const signedImage = await Storage.get(image.key)
      imageDict[signedImage] = image.key;
      return signedImage;
    }))
    setImages(s3images);
  }
const theme = createTheme();
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
              pt: 0,
              pb: 0,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom = {true}
                pt={8}
              >
                Rate your friends
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Here are some pictures you can rate and comment on.
              </Typography>
              <RouterLink to="/rule"
              style = {{textDecoration:"none"}}>
              <Button variant="h5" align="center" color="error" >
                rating rule 
              </Button>
              </RouterLink>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          <Button variant="contained" color="error">
            See more
          </Button>
          <Container sx={{ py: 10 }} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={5}>
              {images.map((image) => (
                <Grid item key={image} xs={12} sm={6} md={4}>
                  <Card md={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <RouterLink to={`/post/${imageDict[image]}`}>
                  <CardMedia component="img" md={{pt: '10%',}} image={image} alt="random"/>
                  </RouterLink>
                    <CardContent> What do you think about this person?</CardContent>
                  </Card>
                  <CardActions md={{display:'flex', pb:'1%'}} >
                      <RouterLink to={`/post/${imageDict[image]}`}
                      style={{ textDecoration: 'none' }}>
                      <Button size="small">Rate</Button>
                      </RouterLink>
                      <Button size="small">Report</Button>
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
export default withAuthenticator(Gallery);