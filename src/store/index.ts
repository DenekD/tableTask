import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectItems = (state: RootState) => state.ui.items;
export const selectPage = (state: RootState) => state.ui.page;
export const selectTotalPages = (state: RootState) => state.ui.totalPages;
export const selectFilterredItems = (state: RootState) =>
  state.ui.filteredItems;
export const selectItemsPerPage = (state: RootState) => state.ui.itemsPerPage;
export const selectDataFetched = (state: RootState) => state.ui.dataFetched;

export default store;
