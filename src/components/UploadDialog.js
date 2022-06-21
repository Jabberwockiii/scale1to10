// src/App.js
import React, { useState } from 'react';
import { Storage } from 'aws-amplify'
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { graphqlOperation } from 'aws-amplify';
import { TextField } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Auth } from 'aws-amplify';
export function DialogBox({open, setOpen}) {
  const [TitleField, setTitleField] = useState('');
  const [DescriptionField, setDescriptionField] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  function handleClose(e){
    setOpen(false);
  }
  async function upload(file) {
    console.log(file);
    const photo_id = uuid();
    console.log("Uploading...");
    Storage.configure({level: "protected",})
    // upload the image then fetch and rerender images
    console.log(file)
    Storage.put(photo_id, file);
    Storage.configure({level: "public",})
    Storage.put(photo_id, file);
    //API
    const result = await API.graphql(graphqlOperation(mutations.createPost, {input: {
                  id: photo_id,
                  user: Auth.user.username,
                  images: photo_id,
                  content : DescriptionField,
                  title: TitleField,
                  ratingPeople : [Auth.user.username],
                  }}))
                  .then(console.log("success", photo_id, DescriptionField))
                  .catch(err => console.log(err));
    console.log("go through the result");
    return result;
  }
  async function handleCreatePost(e){
    console.log(currentImages);
    let file = await fetch(currentImages).then(r => r.blob());
    console.log("Here is the blob")
    console.log(file);
    setOpen(false);
    upload(file).then(res => {
      window.location.reload();
    });
    
  }
  function setImageURL(e){
    const file = e.target.files[0];
    console.log(file);
    // createObjectURL of all images using a loop
    const imageURL = URL.createObjectURL(file);
    setCurrentImages(imageURL);
  }
  return(
                    <div>
                    <Dialog
                      fullWidth
                      width = "lg"
                      open={open}
                      onClose={handleClose}
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
                            Create Your Post
                          </Typography>
                          <Button autoFocus color="inherit" onClick={handleCreatePost}>
                            Create
                          </Button>
                        </Toolbar>
                      </AppBar>
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Add a title
                        </Typography>
                        <TextField
                          autoFocus
                          defaultValue="Default Value"
                          id="standard-basic"
                          label="Title"
                          fullWidth
                          onChange = {(e) => {setTitleField(e.target.value)}}
                        />
                        <Typography variant="h6" gutterBottom>
                          Add a description
                        </Typography>
                        <TextField
                          autoFocus
                          defaultValue="Default Value"
                          id="standard-basic"
                          label="Description"
                          fullWidth
                          onChange = {(e) => {setDescriptionField(e.target.value)}}
                        />
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="h6" gutterBottom>
                            Add a photo
                          </Typography>
                          <input
                            type="file"
                            accept='image/png'
                            onChange={(e) => {setImageURL(e)}}
                          />
                          {/** render the uploaded image with flex size*/}
                          <img src={currentImages} style={{width: '100%'}}/>
                        </Box>
                      </Box>
                    </Dialog>
                    </div>
                    );
          }
