//hello world 
import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import {API} from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
//import authentication from './authentication';

async function pushImgToS3(file, filename){
    //console 
    console.log("pushImgToS3");
    if (file === null) return
    await Storage.put(filename, file, {
        level: 'protected',
        contentType: 'image/*'
    })
        .then(result => console.log(result.key))
        .catch(err => console.log(err));
   }
   console.log("OK!");
class NewPost extends Component {
    // render a button to upload a new post by using insert
    //constructor 
    //handleAdd
    handleAdd = async (event) => {
        //indicate it happens by console.log
        console.log("handleAdd")
        event.preventDefault();
        const file = event.target.files[0];
        //upload the file to S3
        pushImgToS3(file, file.name);
    }
    render() {
        // render a button to upload a new post by using insert
        return( 
            <Box>
            <input
                accept="image/*"
                id="button-add-picture"
                multiple
                type="file"
                onChange={this.handleAdd}
            />
            <label htmlFor="button-add-picture">
            </label>
            <Button variant="contained" color="primary" onClick={this.handleAdd}>
                Add Post to Database and upload to S3
            </Button>
        </Box>
        )
    }

}
export default withAuthenticator(NewPost);