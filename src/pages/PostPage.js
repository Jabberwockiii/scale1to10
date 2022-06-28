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
import { graphqlOperation } from 'aws-amplify';
import Slider from '@mui/material/Slider';
import{ API } from 'aws-amplify';
import {Auth} from 'aws-amplify';
import {DialogBox} from '../components/CommentDialog';
//static import
const image1Female = require('../static/female/1female.png');
const image1Male = require('../static/male/1male.png');
const image2Female = require('../static/female/2female.png');
const image2Male = require('../static/male/2male.png');
const image3Female = require('../static/female/3female.png');
const image3Male = require('../static/male/3male.png');
const image4Female = require('../static/female/4female.png');
const image4Male = require('../static/male/4male.png');
const image5Female = require('../static/female/5female.png');
const image5Male = require('../static/male/5male.png');
const image6Female = require('../static/female/6female.png');
const image6Male = require('../static/male/6male.png');
const image7Female = require('../static/female/7female.png');
const image7Male = require('../static/male/7male.png');
const image8Female = require('../static/female/8female.png');
const image8Male = require('../static/male/8male.png');
const image9Female = require('../static/female/9female.png');
const image9Male = require('../static/male/9male.png');
const image10Female = require('../static/female/10female.png');
const image10Male = require('../static/male/10male.png');
//end of the static 
let counter = 0;
function PostPage() {
  const { postID } = useParams();
  const [image, setImage] = React.useState(String);
  const [title, setTitle] = React.useState(String);
  const [content, setContent] = React.useState(String);
  const [rating, setRating] = React.useState(5);
  const [remoteRating, setRemoteRating] = React.useState(0);
  const [submitChance, setSubmitChance] = React.useState(false);
  const [existingRatingPeople, setExistingRatingPeople] = React.useState([]);
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);
  const [imageFemale, setImageFemale] = React.useState(image5Female);
  const [imageMale, setImageMale] = React.useState(image5Male);

  let submitButton = submitChance ? "Submited" : "Submit";
  let ratingView = remoteRating > 0 ? remoteRating.toFixed(1) : 0;
  let counterView = counter;
  
  async function fetchImages() {
    Storage.configure({level: "public"});
    const image = await Storage.get(postID);
    setImage(image);
  }
  
  async function fetchTitleAndDescription() {
    //use await to set the title and content
    //fetch title
    Storage.configure("public");
    const post = await graphqlOperation(queries.getPost, { id: postID });
    const existingPeople = await API.graphql(post).then(res => {
      if(res.data.getPost.ratingPeople !== undefined) {
        return res.data.getPost.ratingPeople;
      }
      return [];
    }).catch(err => console.log(err));
    console.log("existingPeople"+existingPeople);
    setExistingRatingPeople(existingPeople);
    counter = existingPeople.length;
    if (existingPeople.includes(Auth.user.username)) {
      setSubmitChance(true);
    }
    else{
      console.log("error");
      counter = 0;
    }

    const title = await API.graphql(post).then(res => {
      if(res.data.getPost.title !== null){
        return res.data.getPost.title;
      }
      else{
        return "No Title";
      }
    });
    setTitle(title);
    //fetch content
    let content = await API.graphql(post).then(res => {
      if(res.data.getPost.content !== null){
        return res.data.getPost.content;
      }
      else{
        return "No Content";
      }
    });
    setContent(content);  }
  function handleRating(rating, data) {
    setRating(data);
    if(data>1 && data<=2){
      setImageFemale(image1Female);
      setImageMale(image1Male);
    }
    if(data>2 && data<=3){
      setImageFemale(image2Female);
      setImageMale(image2Male);
    }
    if(data>3 && data<=4){
      setImageFemale(image3Female);
      setImageMale(image3Male);
    }
    if(data>4 && data<=5){
      setImageFemale(image4Female);
      setImageMale(image4Male);
    }
    if(data>5 && data<=6){
      setImageFemale(image5Female);
      setImageMale(image5Male);
    }
    if(data>6 && data<=7){
      setImageFemale(image6Female);
      setImageMale(image6Male);
    }
    if(data>7 && data<=8){
      setImageFemale(image7Female);
      setImageMale(image7Male);
    }
    if(data>8 && data<=9){
      setImageFemale(image8Female);
      setImageMale(image8Male);
    }
    if(data>9 && data<10){
      setImageFemale(image9Female);
      setImageMale(image9Male);
    }
    if(data===10){
      setImageFemale(image10Female);
      setImageMale(image10Male);
    }

  }

  async function handleSubmit() {
    //get ratingCount from graphQL
    const counter =  existingRatingPeople.length;
    console.log(counter);
    counterView = counter;
    const postVersion = await API.graphql(
      graphqlOperation(queries.getPost, { id: postID })
    ).then(res => {
      return res.data.getPost._version;
    }).catch(err => {
      console.log(err);
    });
    const submitRating = rating;
    const finalRating = (submitRating + remoteRating*(counter-1)) / (counter);
    console.log(postID)
    await API.graphql(
      graphqlOperation(mutations.updatePost, {
        input: {
          id: postID,
          ratingCounter: counter + 1,
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
  }, [])

  return (
    <Box sx={{ flexGrow: 1, pt:10}}>
      <Grid container spacing={1}
        sx ={{pt:3}}
        key = {1}>
        <Grid item xs={0.5} key ={2}/>
        <Grid item xs={5.5} key = {3}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            style={{ borderRadius: "5px", width: "100%" }}
          />
        </Grid>
        <Grid item xs={5.5} key = {4}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {title}
              </Typography>
              <Typography variant="body2">{content}</Typography>
              <Box width={300} sx = {{mx:"auto", pt:3}}>
              <Typography variant="body2">Drag the Bar to rate this person</Typography>
              <Slider defaultValue={5}
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
              <Typography variant="h6" sx = {{pt:2, fontWeight: "bold"}}>{counterView > 0 ? counterView : '?'} People have rated</Typography>

            </CardContent>
            <img alt='image1' style={{ width: '40%' }} src={String(imageFemale)} /> 
            <img alt='image1' style={{ width: '50%' }} src={String(imageMale)} />                 
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