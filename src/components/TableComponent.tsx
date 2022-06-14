//Redux imports
import { useSelector } from "react-redux";
import { Item } from "../store/ui-slice";
import { selectItemsPerPage } from "../store";

//MUI imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import { Paper } from "@mui/material";

interface Props {
  items: Item[];
  page: number;
}

const TableComponent = (props: Props) => {
  const itemsPerPage = useSelector(selectItemsPerPage);
  const startIndex = (props.page - 1) * itemsPerPage;
  const selectedItems = props.items.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      aria-label="simple-table"
      sx={{
        minHeight: 321,
        my: 2,
        maxWidth: 600,
      }}
    >
      <Table sx={{ minWidth: 300 }} aria-label="table">
        <TableHead sx={{ backgroundColor: grey[200] }}>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedItems.map((row) => (
            <TableRow
              key={row.id}
              id="table-row-repository"
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: row.color,
              }}
            >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
