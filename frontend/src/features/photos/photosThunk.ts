import { createAsyncThunk } from '@reduxjs/toolkit';
import { Photo, PhotoMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchAllPhotos = createAsyncThunk<Photo[]>('photos/fetchAll', async () => {
  const photosResponse = await axiosApi.get<Photo[]>('/photos');
  return photosResponse.data;
});

export const fetchUsersPhotos = createAsyncThunk<Photo[], string>('albums/fetchAll', async (id) => {
  const photosResponse = await axiosApi.get<Photo[]>(`/photos?userId=${id}`);
  return photosResponse.data;
});

export const createPhoto = createAsyncThunk<
  void,
  PhotoMutation,
  {
    rejectValue: ValidationError;
  }
>('photos/create', async (photoMut, { rejectWithValue }) => {
  const formData = new FormData();

  const keys = Object.keys(photoMut) as (keyof PhotoMutation)[];

  keys.forEach((key) => {
    const value = photoMut[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });
  try {
    await axiosApi.post('/photos', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteOnePhoto = createAsyncThunk<void, string>('photos/delete', async (id) => {
  await axiosApi.delete(`/photos/${id}`);
});
