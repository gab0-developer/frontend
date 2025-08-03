import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
//Import Material React Table Translations

import { MRT_Localization_ES } from 'material-react-table/locales/es';

type Props<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
};

const ReactTableComponent = <T extends Record<string, any>>({
  columns,
  data,
}: Props<T>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data,
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    localization: MRT_Localization_ES
  });

  return <MaterialReactTable table={table} />;
};

export default ReactTableComponent;