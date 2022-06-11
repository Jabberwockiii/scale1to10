import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { imageData } from "../database/ImageData";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import HoverRating from "./HoverRating";
import { Storage } from 'aws-amplify'
import { useEffect } from "react";
function PostPage() {
  let { postID } = useParams();
  const [images, setImages] = React.useState([]);
  console.log(postID);
  Storage.configure({level: "protected"});
  //get image by post id
  useEffect(() => {
    fetchImages()
  }, [])
  async function fetchImages() {
    // Fetch list of images from S3
    console.log("start fetching images");
    Storage.configure(
      {
        level: "protected",
      }
    )
    //get image by post id
    let s3images = await Storage.get(`${postID}`)
    console.log(s3images);
    setImages(s3images)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={0.5} />
        <Grid item xs={5.5}>
          <img
            src={images[0]}
            alt={123}
            loading="lazy"
            style={{ borderRadius: "20px", width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.5}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {123}
              </Typography>
              <Typography variant="body2">{123}</Typography>
              <HoverRating ratings={123} />
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </Box>
  );
};

export default PostPage;
