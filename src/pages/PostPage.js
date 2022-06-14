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
let postVersion = 0;
function PostPage() {
  let { postID } = useParams();
  const [image, setImage] = React.useState(String);
  const [title, setTitle] = React.useState(String);
  const [content, setContent] = React.useState(String);
  const [rating, setRating] = React.useState(10);
  const [remoteRating, setRemoteRating] = React.useState(0);
  const [submitChance, setSubmitChance] = React.useState(false);
  const [existingRatingPeople, setExistingRatingPeople] = React.useState([]);
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);
  const [comment, setComment] = React.useState([]);
  let submitButton = submitChance ? "Submited" : "Submit";
  let ratingView = remoteRating > 0 ? remoteRating.toFixed(1) : 0;
  let counterView = counter > 0 ? counter : " ? ";
  Storage.configure({level: "public"});
  //get image by post id
  useEffect(() => {
    fetchImages();
    fetchTitleAndDescription();
    queryRating();
    // fetchComment();
  }, [])
  // async function fetchComment() {
  //   console.log("whats up", postID)
  //   let post = graphqlOperation(queries.getPost, { id: postID });
  //   let comments = await API.graphql(post).then(res => {
  //     return res.data.getPost.comments.items;
  //   });
    
  //   setComment([comments[0]]);
  //   //print the comment text
  //   console.log("items");
  //   console.log(comments[1]);
  // }
  
  async function fetchImages() {
    let image = await Storage.get(postID);
    setImage(image);
  }
  async function fetchTitleAndDescription() {
    let post = graphqlOperation(queries.getPost, { id: postID });
    let title = await API.graphql(post).then(res => {
      return res.data.getPost.title;
    });
    let content = await API.graphql(post).then(res => {
      return res.data.getPost.content;
    });
    let existingPeople = await API.graphql(post).then(res => {
      return res.data.getPost.ratingPeople;
    });
    setExistingRatingPeople(existingPeople);
    if (existingPeople.includes(Auth.user.username)) {
      console.log(Auth.user.username);
      setSubmitChance(true);
    }
    else{
      counter = 0;
    }
    setTitle(title);
    setContent(content);
  }
  function handleRating(rating, data) {
    setRating(data);
  }

  async function handleSubmit() {
    //get ratingCount from graphQL
    counter = await API.graphql(
      graphqlOperation(queries.getPost, { id: postID })
    ).then(res => {
      return res.data.getPost.ratingCounter;
    });
    postVersion = await API.graphql(
      graphqlOperation(queries.getPost, { id: postID })
    ).then(res => {
      return res.data.getPost._version;
    });
    counter = counter + 1;
    console.log("counter: " + counter);
    console.log("postVersion: " + postVersion);
    //update ratingCount in graphQL
    const submitRating = rating;
    let finalRating = (submitRating + remoteRating*(counter-1)) / (counter);
    let updateRating = await API.graphql(
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
      console.log("upload status");
      return res.data.updatePost.rating;
    }).catch(err => {
      console.log(err);
    });
    console.log("After rating"+ updateRating);
    setSubmitChance(true);
    queryRating();
  }
  async function queryRating(){
    let post = graphqlOperation(queries.getPost, { id: postID });
    let remote = await API.graphql(post).then(res => {
      return res.data.getPost.rating;
    }
    );
    setRemoteRating(remote);
  }
  function handleOpenCommentDialog() {
    setDialogBoxOpen(true);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
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
              <Typography varHiant="body2">{content}</Typography>
              <Box width={300} sx = {{mx:"auto", pt:3}}>
              <Typography varHiant="body2">Drag the Bar to rate this person</Typography>
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
              <Typography varHiant="h4" sx = {{pt:2, fontWeight: "bold"}}> Your Points: {rating} </Typography>
              <Typography varHiant="h4" sx = {{pt:2, fontWeight: "bold"}}>Original Points:{ratingView}</Typography>
              <Typography varHiant="h4" sx = {{pt:2, fontWeight: "bold"}}>{counterView} People have rated</Typography>

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