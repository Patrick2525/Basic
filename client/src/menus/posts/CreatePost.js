import React from 'react'
import axios from 'axios';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';


function CreatePost(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
        setState({
            id: null,
            title: '',
            type: '',
            inSertedDate: '',
            isDeleted: false,
            deletedDate: null
        })
    };

    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addBoard()
        setState({
            id: null,
            title: '',
            type: '',
            inSertedDate: '',
            isDeleted: false,
            deletedDate: null
        })
        props.stateRefresh();
        setOpen(false);
    }

    const addBoard = () => {
        const url = 'posts/';
        axios.post(url, {
            title: state.title,
            type: state.type
            })
            .then(response => {
                //console.log(response);
                //console.log("client post 정상처리!");
                props.stateRefresh();
            })
            .catch(err => {
                //console.log("client post 에러발생!");
                console.log(err);
            })
    }    

    const types = [
        {
          value: 'HTML',
          label: 'HTML',
        },
        {
          value: 'CSS',
          label: 'CSS',
        },
        {
          value: 'JS',
          label: 'JS',
        },
        {
          value: 'React',
          label: 'React',
        },
    ];

    const [state, setState] = useState({
        id: null,
        title: '',
        type: '',
        inSertedDate: '',
        isDeleted: false,
        deletedDate: null
    })

    return (
        <div>
            <Button variant='contained' color='primary' onClick={handleClickOpen}>
                새 게시물
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>새 게시물</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        글 좀 그만 올리세요
                    </DialogContentText>
                    <TextField label="title" type="text" variant="outlined" name='title' onChange={handleChange}/>
                    <TextField select label="Select" name='type' value={state.type} onChange={handleChange} helperText="Please select your currency">
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>생성</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreatePost