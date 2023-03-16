import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    loading: false,
    error: null
  },
  reducers: {
    filteredContact(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContact.pending]: handlePending,
    [deleteContact.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,
    [fetchContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.contacts = action.payload;
    },
    [addContact.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.contacts.push(action.payload);
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const filteredContact = createAction(
  'contacts/filteredContact',
  filter => {
    return {
      payload: filter,
    };
  }
);