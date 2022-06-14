import { createSlice } from "@reduxjs/toolkit";

export interface Item {
  id: number | string;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface State {
  itemsPerPage: number;
  totalPages: number;
  page: number;
  dataFetched: boolean;
  items: Item[];
  filteredItems: Item[];
}

const initialState: State = {
  itemsPerPage: 5,
  totalPages: 1,
  page: 1,
  dataFetched: false,
  items: [],
  filteredItems: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload.items;
    },
    setDataFetched(state) {
      state.dataFetched = true;
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload.filteredItems;
    },
    setTotalPages(state) {
      state.totalPages = Math.ceil(state.items.length / state.itemsPerPage);
    },
    filtrItems(state, action) {
      const filteredId = parseInt(action.payload);
      if (!filteredId && filteredId !== 0) {
        state.filteredItems = state.items;
        state.page = 1;
        state.totalPages = Math.ceil(state.items.length / state.itemsPerPage);
        return;
      }
      const sorted = state.items.filter((item) => item.id === filteredId);
      state.filteredItems = sorted;
      state.page = 1;
      state.totalPages = Math.ceil(sorted.length / state.itemsPerPage);
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice;
