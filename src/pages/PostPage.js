import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import { Storage } from 'aws-amplify'
import { useEffect } from "react";

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { graphqlOperation } from 'aws-amplify';
import Slider from '@mui/material/Slider';
import{ API } from 'aws-amplify';
import {Auth} from 'aws-amplify';
import {DialogBox} from '../components/CommentDialog';
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

let counter = 0;
function PostPage() {
  const { postID } = useParams();
  const [image, setImage] = React.useState(String);
  const [title, setTitle] = React.useState(String);
  const [content, setContent] = React.useState(String);
  const [rating, setRating] = React.useState(10);
  const [remoteRating, setRemoteRating] = React.useState(0);
  const [submitChance, setSubmitChance] = React.useState(false);
  const [existingRatingPeople, setExistingRatingPeople] = React.useState([]);
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);

  let submitButton = submitChance ? "Submited" : "Submit";
  let ratingView = remoteRating > 0 ? remoteRating.toFixed(1) : 0;
  let counterView = counter > 0 ? counter : " ? ";
  
  async function fetchImages() {
    Storage.configure({level: "public"});
    let image = await Storage.get(postID);
    setImage(image);
  }

  async function fetchTitleAndDescription() {
    //use await to set the title and content
    console.log("PostID: " + postID);
    //fetch title
    Storage.configure("public");
    let post = graphqlOperation(queries.getPost, { id: postID });
    let title = await API.graphql(post).then(res => {
      return res.data.getPost.title;
    });
    setTitle(title);
    //fetch content
    let content = await API.graphql(post).then(res => {
      return res.data.getPost.content;
    });
    setContent(content);
    console.log("title"+title);
    let existingPeople = await API.graphql(post).then(res => {
      return res.data.getPost.ratingPeople;
    }).catch(err => console.log(err));
    console.log("existingPeople"+existingPeople);
    setExistingRatingPeople(existingPeople);
    
    if (existingPeople.includes(Auth.user.username)) {
      setSubmitChance(true);
    }

    else{
      console.log("error");
      counter = 0;
    }
  }
  function handleRating(rating, data) {
    setRating(data);
  }

  async function handleSubmit() {
    //get ratingCount from graphQL
    const counter = await API.graphql(
      graphqlOperation(queries.getPost, { id: postID })
    ).then(res => {
      return res.data.getPost.ratingCounter + 1;
    }).catch(err => {
      console.log(err);
    });

    const postVersion = await API.graphql(
      graphqlOperation(queries.getPost, { id: postID })
    ).then(res => {
      return res.data.getPost._version;
    }).catch(err => {
      console.log(err);
    });

    const submitRating = rating;
    const finalRating = (submitRating + remoteRating*(counter-1)) / (counter);
    await API.graphql(
      graphqlOperation(mutations.updatePost, {
        input: {
          id: postID,
          ratingCounter: counter,
          rating: finalRating,
          //updating the latest version of the post
          _version: postVersion,
          ratingPeople: existingRatingPeople ? [...existingRatingPeople, Auth.user.username] : [Auth.user.username],
        }
      })
    ).then(res => {
      return res.data.updatePost.rating;
    }).catch(err => {
      console.log(err);
    });
    setSubmitChance(true);
    queryRating();
  }

  async function queryRating(){
    let post = graphqlOperation(queries.getPost, { id: postID });
    let remote = await API.graphql(post).then(res => {
      return res.data.getPost.rating;
    }).catch(err => {
      console.log(err);
    });

    setRemoteRating(remote);
  }

  function handleOpenCommentDialog() {
    setDialogBoxOpen(true);
  }

  useEffect(() => {
    fetchImages();
    fetchTitleAndDescription();
    queryRating();
    // fetchComment();
  }, [])

  return (
    <Box sx={{ flexGrow: 1, pt:10}}>
      <Grid container spacing={1}
        sx ={{pt:3}}>
        <Grid item xs={0.5} />
        <Grid item xs={5.5}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            style={{ borderRadius: "5px", width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.5}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {title}
              </Typography>
              <Typography variant="body2">{content}</Typography>
              <Box width={300} sx = {{mx:"auto", pt:3}}>
              <Typography variant="body2">Drag the Bar to rate this person</Typography>
              <Slider defaultValue={50}
               aria-label="Default"
               valueLabelDisplay="auto"
               onChange = {handleRating}
               disabled = {submitChance}
               step = {0.1}
               min = {0}
               max = {10}/>
              </Box>
              <Button variant="contained" color="error" 
                onClick = {handleSubmit}
                disabled = {submitChance}>
                {submitButton}
              </Button>
              <Typography variant="h6" sx = {{pt:2, fontWeight: "bold"}}> Your Points: {rating} </Typography>
              <Typography variant="h6" sx = {{pt:2, fontWeight: "bold"}}> Original Points: {ratingView}</Typography>
              <Typography variant="h6" sx = {{pt:2, fontWeight: "bold"}}>{counterView} People have rated</Typography>

            </CardContent>
            <CardActions>
              <Button size="small" onClick = {handleOpenCommentDialog}>Comments</Button>
              <DialogBox 
                open = {dialogBoxOpen}
                setOpen = {setDialogBoxOpen}/>
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