import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const EditarUserView = () => {
  // Datos de ejemplo
  const [users, setUsers] = useState([
    { id: 12345, username: 'manue888', email: 'manuel45@exemple.com', role: 'admin', status: 'activo' },
    { id: 67890, username: 'juan676', email: 'eljuan@exemple.com', role: 'moderador', status: 'activo' },
    { id: 111333, username: 'Oscar777', email: 'oscarFlores@exemple.com', role: 'visitante', status: 'activo' },
  ]);

  // Estado para la fila seleccionada y mensaje
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  // Función para manejar la selección de una fila
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  // Función para manejar el clic en el botón de edición
  const handleEditClick = () => {
    if (selectedUser) {
      setMessage(`Usuario seleccionado: ID ${selectedUser.id}, Nombre: ${selectedUser.username}, Correo: ${selectedUser.email}, Rol: ${selectedUser.role}, Estado: ${selectedUser.status}`);
    }
  };

  return (
    <div>
      <TableContainer  component={Paper}  >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Usuario</TableCell>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell></TableCell> {/* Columna para el botón de edición */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
                selected={selectedUser && selectedUser.id === user.id}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {selectedUser && selectedUser.id === user.id && (
                    <IconButton color="primary" onClick={handleEditClick}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mensaje que muestra la información del usuario seleccionado */}
      {message && (
        <Typography variant="h6" style={{ marginTop: '20px', color: 'blue' }}>
          {message}
        </Typography>
      )}
    </div>
  );
};