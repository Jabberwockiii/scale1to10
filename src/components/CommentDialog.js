// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { API, SortDirection } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { graphqlOperation } from 'aws-amplify';
import { TextField } from '@mui/material';
import {v4 as uuid}from 'uuid';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Auth } from 'aws-amplify';
import {useParams} from 'react-router-dom';
import { Divider, Avatar, Grid, Paper, Card } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
const PostContext = React.createContext();

function CommentsCard(){
  const [comments, setComments] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  //postId is an Object {postID: "postID"}
  const postId = useContext(PostContext);
  const postID = postId.postID;
  async function fetchComments(){
    const byDate = await graphqlOperation(queries.byDate, { postID: postID});
    const comments = await API.graphql(byDate).then(res => {
      setNextToken(res.data.byDate.nextToken);
      console.log(res.data.byDate.nextToken);
      return res.data.byDate.items;
    });
    setComments(comments);
  };
  useEffect(() => {
    fetchComments();
  }
  , []);
  return(
    <div>
      {comments.map((comment) => (
        <Paper>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid item xs zeroMinWidth >
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user}</h4>
            <p style={{ textAlign: "left" }}>
              {comment.text}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {(comment.createdAt).slice(0,10)}
            </p>
          </Grid>
        </Grid>
        </Paper>
      ))}
      <Divider />
    </div>
    );
}
function AlertBox(props) {
  useEffect(() => {
    setTimeout(() => {
      props.setAlertOpen(false);
    }
    , 2000)});
  if (props.open){
    return(
      <Alert severity="success">
        Comment added successfully!
      </Alert>
    );
  }
  if(props.fail){
    return(
      <Alert severity="error">
        Comment failed to add! Try later
      </Alert>
    );
  }
  return null;
}

function LoadProgressCircle(props){
  if(props.open){
    return(
      <CircularProgress size = {30}/>
    );
  }
  return null;
}
export function DialogBox({open, setOpen}) {
  //comments should include a user name, a comment, and a timestamp  
  const [postID, setPostID] = useState(useParams());
  const [comments, setComments] = useState([]);
  const [inputField, setInputField] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [failAlertOpen, setFailAlertOpen] = useState(false);
  const [progessCircle, setProgressCircle] = useState(false);

  function handleClose(e){
    setOpen(false);
  }

  function keyPress(e){
    if(e.keyCode === 13){
       handleCreateComment();
       // put the login here
    }
 }

  async function handleCreateComment(){
    console.log("create comment");
    //create a comment using graph ql 
    await API.graphql(graphqlOperation(mutations.createComment, 
        {input: {
          id: uuid(),
          user: Auth.user.username,
          text: inputField,
          postID: postID.postID,
          }, }))
        .then(res => {setTimeout(() => {
          setAlertOpen(true);
          setProgressCircle(false);
          setInputField('');
          setOpen(true);
          }
          , 3000)})
        .catch(err => {setTimeout(() => {
          setFailAlertOpen(true);
          }
          , 3000)});
    setProgressCircle(true);
    setInputField('');
    
  }

  return(
    <div>
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
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
            Create Your Comments
          </Typography>
          <Button autoFocus color="inherit" onClick = {handleCreateComment}>
            Create
          </Button>
        </Toolbar>
      </AppBar>    
      <div style={{ padding: 14 }} className="App">
      <h1>Comments</h1>
      <Typography variant="h6" gutterBottom>
        Be nice and Judge people politely
      </Typography>
      <TextField
        autoFocus
        defaultValue="Yes, We judge"
        id="standard-basic"
        label="Input Your Comment"
        fullWidth
        onChange = {(e) => {setInputField(e.target.value)}}
        value = {inputField}
        onKeyDown = {keyPress}
      />
    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    <LoadProgressCircle open = {progessCircle} />
    <AlertBox open = {alertOpen} fail = {failAlertOpen} setAlertOpen = {setAlertOpen} setFailAlertOpen = {setAlertOpen}/>        
    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      <Paper style={{ padding: "" }}>
        </Paper>
        <PostContext.Provider value = {postID}>
        <CommentsCard/>
        </PostContext.Provider>
        </div>
        </Dialog>
        </div>
        );
    }
