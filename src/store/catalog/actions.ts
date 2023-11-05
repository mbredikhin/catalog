import { ICatalog, ICategory } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCatalog = createAsyncThunk('catalog/fetchCatalog', async () => {
  const response = await fetch(`${process.env.VITE_APP_API_URL}/vacancy/catalog`);
  const json = await response.json();
  return json as Promise<ICatalog<ICategory>>;
});
