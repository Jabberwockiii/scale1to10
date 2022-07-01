import React from 'react';

import Paper from '@mui/material/Paper';

import Image from './static/4.png'; // Import using relative path


const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`
    }
};

export function Background() {
        return(
            <Paper style={styles.paperContainer}>
                
            </Paper>
        );
}