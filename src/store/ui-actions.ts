import { AnyAction, Dispatch } from "redux";
import { uiActions } from "../store/ui-slice";

type Fetch = () => (dispatch: Dispatch<AnyAction>) => Promise<void>;

export const fetchData: Fetch = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const fetchData = async () => {
      const response = await fetch("https://reqres.in/api/products");

      if (!response.ok) {
        throw new Error("fetch cart data faild");
      }

      const fetchedData = await response.json();
      return fetchedData;
    };
    try {
      const fetchedData = await fetchData();
      dispatch(
        uiActions.setItems({
          items: fetchedData.data || [],
        })
      );
      dispatch(
        uiActions.setFilteredItems({
          filteredItems: fetchedData.data || [],
        })
      );
      dispatch(uiActions.setDataFetched());
      dispatch(uiActions.setTotalPages());
    } catch (error) {
      console.log(error);
    }
  };
};
