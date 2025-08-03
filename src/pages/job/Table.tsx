import React, { useEffect, useState, useMemo } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { getAxios } from '../../hooks/axiosApi';
import ReactTableComponent from '../../components/ReactTableComponent';
import type { MRT_ColumnDef } from 'material-react-table';

interface Postulation {
  id: number;
  job_title: string;
  position: string;
  link: string;
  created_at: string;
  company: string;
  status_id: string;
}

const Table = () => {
  const [postulations, setPostulations] = useState<Postulation[]>([]);
  const navigate = useNavigate();

  const handleEdit = (id: number, row: any) => {
    console.log('Editar', id, row);
  };

  const handleDelete = (id: number) => {
    console.log('Eliminar', id);
  };

  useEffect(() => {
    getAxios(`/job/`, setPostulations, navigate);
  }, []);

  const columns = useMemo<MRT_ColumnDef<Postulation>[]>(
    () => [
      {
        accessorKey: 'job_title', //access nested data with dot notation
        header: 'Título del Trabajo',
        muiTableHeadCellProps:{style:{color:"#2ebf91"}},
        enableHiding:true,
        size: 150,
      },
      {
        accessorKey: 'position',
        header: 'Posición',
        muiTableHeadCellProps: { style: { color: "#2ebf91" } },
         enableHiding:true,
        size: 150,
      },
      {
        accessorKey: 'company',
        header: 'Empresa',
        muiTableHeadCellProps: { style: { color: "#2ebf91" } },
         enableHiding:true,
        size: 150,
      },
      {
        accessorKey: 'link',
        header: 'Link',
        muiTableHeadCellProps: { style: { color: "#2ebf91" } },
         enableHiding:true,
        size: 150,
        Cell: ({ cell }) => (
          <a href={cell.getValue<string>()} target="_blank" rel="noopener noreferrer">
            Ver oferta
          </a>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Fecha de creación',
        muiTableHeadCellProps: { style: { color: "#2ebf91" } },
         enableHiding:true,
        size: 150,
      },
      {
      header: 'Acciones',
      id: 'actions',
      size: 100,
      enableColumnActions: false,
      enableSorting: false,
      Cell: ({ row }) => {
        const { id } = row.original;
        return (
          <>
            <IconButton
              aria-label="editar"
              onClick={() => handleEdit(id,row)}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              aria-label="eliminar"
              onClick={() => handleDelete(id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </>
        );
      },
    },
    ],
    [],
  );

  return <ReactTableComponent<Postulation> columns={columns} data={postulations} />;

};

export default Table;
