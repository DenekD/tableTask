import { ChangeEventHandler, useEffect } from "react";

//Components imports
import InputId from "./components/InputId";
import TableComponent from "./components/TableComponent";

//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/ui-actions";
import { uiActions } from "../src/store/ui-slice";
import {
  selectFilterredItems,
  selectItems,
  selectPage,
  selectTotalPages,
  selectDataFetched,
} from "./store";

//MUI imports
import { CircularProgress, Container, Pagination, Paper } from "@mui/material";
import { Box } from "@mui/system";

const App: React.FC<{}> = () => {
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const items = useSelector(selectItems);
  const filteredItems = useSelector(selectFilterredItems);
  const isDataFetched = useSelector(selectDataFetched);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  const pageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(uiActions.setPage(value));
  };

  const sortItemsHandler: ChangeEventHandler<HTMLFormElement> = (event) => {
    dispatch(uiActions.filtrItems(event.target.value));
  };

  return (
    <Container>
      <Paper sx={{ padding: "28px" }}>
        <Box
          sx={{
            p: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputId
            changeHandler={sortItemsHandler}
            maxItems={items.length + 1}
          />
          {isDataFetched ? (
            filteredItems && (
              <TableComponent items={filteredItems} page={page} />
            )
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 321,
                my: 2,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Pagination
            count={totalPages}
            page={page}
            onChange={pageChangeHandler}
            shape="rounded"
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default App;
