import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthStore } from '../../../hooks';

export const EditarUserView = () => {
  const { starUsuarios, usuarios } = useAuthStore();

  useEffect(() => {
    starUsuarios();
  }, [starUsuarios]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleEditClick = (event, user) => {
    event.stopPropagation();
    setMessage(`Usuario seleccionado: ID ${user.idusuario}, Nombre: ${user.username}, Correo: ${user.correo}, Rol: ${user.rol === 1 ? 'Activo' : 'Inactivo'}, Estado: ${user.activo}`);
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ maxHeight: '400px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID Usuario</TableCell>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((user) => (
              <TableRow
                key={user.idusuario}
                onClick={() => handleRowClick(user)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{user.idusuario}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.correo}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell>{user.activo === 1 ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>
                  {selectedUser && selectedUser.idusuario === user.idusuario && (
                    <IconButton
                      color="primary"
                      onClick={(event) => handleEditClick(event, user)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {message && (
        <Typography variant="h6" style={{ marginTop: '20px', color: 'blue' }}>
          {message}
        </Typography>
      )}
    </div>
  );
};
