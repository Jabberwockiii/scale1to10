// src/App.js
import React, { useState, useEffect } from 'react';
import { graphqlOperation, Storage } from 'aws-amplify'
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
import * as queries from '../graphql/queries';
import { API } from 'aws-amplify';
import Pagination from '@mui/material/Pagination';
import {Image} from "@aws-amplify/ui-react";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.zhihu.com/people/xu-zhi-kang-75">
        徐志康@知乎
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
var imageDict = {};
var titleDict = {};
function Gallery() {
  //images hook
  const [images, setImages] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  useEffect(() => {
    fetchImages();
  }, [])

  function handlePageChange(event, value) {
    setPage(value);
    setStart((value - 1) * 10);
    setEnd(value * 10);
    fetchImages();
  }

  async function fetchImages() {
      // Fetch list of images from S3
    Storage.configure({level: "public",})
    let s3images = await Storage.list('')
    setCount(Math.ceil(s3images.length/10));
      // Get presigned URL for S3 images to display images in app
    s3images = await Promise.all(s3images.filter((image, idx) => idx >= start && idx <= end).map(async image => {
      const signedImage = await Storage.get(image.key)
      imageDict[signedImage] = image.key;
      const post = await graphqlOperation(queries.getPost, { id: image.key });
      const title = await API.graphql(post).then(res => {
        return res.data.getPost.title;
      }).catch(err => console.log(err));

      if (title !== null) {
        titleDict[signedImage] = title;
      }
      else{
        titleDict[signedImage] = 'Judge me if you like me'
      }
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
                pt={12}
                bold = {true}
              >
              <Image src={require('../NYLife360.jpg')} style={{width: '100%'}}/>
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
               Match Up!
               </Typography>
               <Typography variant="h5" align="center" color="text.secondary" paragraph>
              </Typography>
              <Link color="inherit" href="https://www.zhihu.com/people/xu-zhi-kang-75">About Us</Link>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 10 }} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={5}>
              {images.map((image) => (
                <Grid item key={image} xs={12} sm={6} md={4}>
                  <Card md={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <RouterLink to={`/post/${imageDict[image]}`}>
                  <CardMedia component="img" md={{pt: '10%',}} image={image} alt="random"/>
                  </RouterLink>
                    <CardContent>{titleDict[image]}</CardContent>
                  </Card>
                  <CardActions md={{display:'flex', pb:'1%'}} >
                      <RouterLink to={`/post/${imageDict[image]}`}
                      style={{ textDecoration: 'none' }}>
                      <Button size="small">View</Button>
                      </RouterLink>
                      <Button size="small">Report</Button>
                    </CardActions>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx = {{display:'flex', justifyContent:'center'}}>
          <Pagination page = {page} count = {count} onChange = {handlePageChange} />
        </Box>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Matchup
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Match Up!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
      );
    }
}
  return (<PhotoList />);
}
export default Gallery;