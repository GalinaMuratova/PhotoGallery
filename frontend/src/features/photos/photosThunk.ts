import { createAsyncThunk } from '@reduxjs/toolkit';
import { Photo, PhotoMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAllPhotos = createAsyncThunk<Photo[]>('photos/fetchAll', async () => {
  const photosResponse = await axiosApi.get<Photo[]>('/photos');
  return photosResponse.data;
});

export const createPhoto = createAsyncThunk<void, PhotoMutation>(
  'photos/create',
  async (photoMut) => {
    const formData = new FormData();

    const keys = Object.keys(photoMut) as (keyof PhotoMutation)[];

    keys.forEach((key) => {
      const value = photoMut[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/photos', formData);
  },
);
