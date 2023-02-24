import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';

const DataTable = ({ data }) => {
  const rowJSX = useMemo(
    () =>
      data.map((d) => (
        <TableRow>
          <TableCell scope="row">
            <strong>{d.originalAmount}</strong>
          </TableCell>
          <TableCell>{d.convertedAmount}</TableCell>
          <TableCell>{d.fx}</TableCell>
          <TableCell>{d.override || 'N/A'}</TableCell>
        </TableRow>
      )),
    [data]
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Original Amount
          </TableCell>
          <TableCell scope="col" border="bottom">
            Converted Amount
          </TableCell>
          <TableCell scope="col" border="bottom">
            FX
          </TableCell>
          <TableCell scope="col" border="bottom">
            Override
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>{rowJSX}</TableBody>
    </Table>
  );
};

export default DataTable;
