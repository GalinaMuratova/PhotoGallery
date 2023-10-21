import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { PhotoMutation } from '../../../types';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { selectCreateError, selectCreatePhotoLoading } from '../photosSlice';
import { createPhoto } from '../photosThunk';

const AddPhotoForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreatePhotoLoading);
  const error = useAppSelector(selectCreateError);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createPhoto(state)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="title"
              label="Photo`s title"
              value={state.title}
              onChange={inputChangeHandler}
              name="title"
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs>
            <FileInput
              onChange={filesInputChangeHandler}
              name="image"
              label="Image"
              error={Boolean(getFieldError('image'))}
              helperText={getFieldError('image')}
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              size="small"
              color="success"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPhotoForm;
