import { ICatalog, ICategory } from '@/types';
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchCatalog } from './actions';

export interface ICatalogState extends ICatalog<ICategory> {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: SerializedError | null;
}

const initialState: ICatalogState = {
  categories: [] as ICatalogState['categories'],
  loading: 'idle',
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'failed';
      });
  },
});

export { fetchCatalog };
export default catalogSlice.reducer;
