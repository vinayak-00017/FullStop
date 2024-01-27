import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [rating,setRating] = React.useState(0)
  const [comment,setComment] = React.useState('')
  const {id} = useParams()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handlePost = async() => {
    if (rating === null || rating === 0) {
      alert('Please select a rating.');
      return;
    }
    try{
      const response = await axios.put(`${BASE_URL}/product/review/${id}`,{
        comment,
        rating,
      },{
        headers : {
          'authentication' : localStorage.getItem('token')
        }
      })
      alert(response.data.message)
      window.location.reload()
    }catch(err){
      console.error(err)
    }
  }

  return (
    <React.Fragment>
      <Button variant='outlined' 
                    onClick={handleClickOpen} 
                    sx={{color: 'black', m : '1rem'}}>
                        Write a product Review
                    </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            if (rating === null || rating === 0) {
                return;
              }
            handleClose();
            <Alert severity="success">This is a success Alert.</Alert>
          },
        }}
      >
        <DialogTitle>Create Review</DialogTitle>
        <DialogContent>
        <Rating
        name="simple-controlled"
        value={rating}
        precision = {1}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
          <DialogContentText>
            What did you like or dislike? What did you use this product for?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
