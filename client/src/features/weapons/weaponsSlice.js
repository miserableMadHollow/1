import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';


// асинхронные thunks
export const fetchWeapons = createAsyncThunk('weapons/fetchAll', async (_, { getState }) => {
  const { auth } = getState();
  const response = await fetch(`${API_URL}/weapons`, {
    headers: {
      'Authorization': `Bearer ${auth.token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error.includes('<!DOCTYPE') ? 'Server returned HTML instead of JSON' : error);
  }
  
  return await response.json();
});

export const createWeapon = createAsyncThunk(
  'weapons/create',
  async (weaponData, { getState }) => {
    const { auth } = getState();
    const response = await fetch(`${API_URL}/weapons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(weaponData),
    });
    if (!response.ok) throw new Error('Failed to create weapon');
    return await response.json();
  }
);

export const updateWeapon = createAsyncThunk(
  'weapons/update',
  async ({ id, data }, { getState }) => {
    const { auth } = getState();
    const response = await fetch(`${API_URL}/weapons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update weapon');
    return await response.json();
  }
);

export const deleteWeapon = createAsyncThunk(
  'weapons/delete',
  async (id, { getState }) => {
    const { auth } = getState();
    const response = await fetch(`${API_URL}/weapons/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete weapon');
    return id;
  }
);


const weaponsSlice = createSlice({
  name: 'weapons',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // обработка всех состояний для каждого thunk
      .addCase(fetchWeapons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeapons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWeapons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createWeapon.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateWeapon.fulfilled, (state, action) => {
        const index = state.items.findIndex(w => w.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteWeapon.fulfilled, (state, action) => {
        state.items = state.items.filter(w => w.id !== action.payload);
      });
  },
});

export default weaponsSlice.reducer;