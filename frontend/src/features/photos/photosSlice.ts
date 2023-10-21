import { Photo, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPhoto, deleteOnePhoto, fetchAllPhotos, fetchUsersPhotos } from './photosThunk';
import { RootState } from '../../app/store';

interface PhotosState {
  items: Photo[];
  usersItems: Photo[];
  fetchAllLoading: boolean;
  fetchUsersAllLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
  deleteLoading: boolean;
}

const initialState: PhotosState = {
  items: [],
  usersItems: [],
  fetchAllLoading: false,
  fetchUsersAllLoading: false,
  createLoading: false,
  createError: null,
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
    builder.addCase(fetchUsersPhotos.pending, (state) => {
      state.fetchUsersAllLoading = true;
    });
    builder.addCase(fetchUsersPhotos.fulfilled, (state, { payload: photos }) => {
      state.fetchUsersAllLoading = false;
      state.usersItems = photos;
    });
    builder.addCase(fetchUsersPhotos.rejected, (state) => {
      state.fetchUsersAllLoading = false;
    });
    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
      state.createError = null;
    });
    builder.addCase(createPhoto.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.createError = error || null;
    });
    builder.addCase(deleteOnePhoto.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteOnePhoto.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteOnePhoto.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;
export const selectCreatePhotoLoading = (state: RootState) => state.photosReducer.createLoading;
export const selectCreateError = (state: RootState) => state.photosReducer.createError;
export const selectAllPhotos = (state: RootState) => state.photosReducer.items;
export const selectLoadingAllPhotos = (state: RootState) => state.photosReducer.fetchAllLoading;
export const selectAllUsersPhotos = (state: RootState) => state.photosReducer.usersItems;
export const selectLoadingAllUsersPhotos = (state: RootState) =>
  state.photosReducer.fetchUsersAllLoading;
