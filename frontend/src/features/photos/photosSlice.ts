import { Photo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPhoto } from './photosThunk';
import { RootState } from '../../app/store';

interface PhotosState {
  items: Photo[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: PhotosState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPhoto.rejected, (state) => {
      state.createLoading = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;
export const selectCreatePhotoLoading = (state: RootState) => state.photosReducer.createLoading;
