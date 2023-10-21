import { Photo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPhoto, fetchAllPhotos } from './photosThunk';
import { RootState } from '../../app/store';

interface PhotosState {
  items: Photo[];
  fetchAllLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: PhotosState = {
  items: [],
  fetchAllLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPhotos.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchAllPhotos.fulfilled, (state, { payload: photos }) => {
      state.fetchAllLoading = false;
      state.items = photos;
    });
    builder.addCase(fetchAllPhotos.rejected, (state) => {
      state.fetchAllLoading = false;
    });
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
export const selectAllPhotos = (state: RootState) => state.photosReducer.items;
export const selectLoadingAllPhotos = (state: RootState) => state.photosReducer.fetchAllLoading;
