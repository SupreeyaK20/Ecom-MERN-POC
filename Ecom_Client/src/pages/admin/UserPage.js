/* eslint-disable no-undef */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TableHead,
} from '@mui/material';
import SharedModal from '../../components/modal/Modal';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// mock
import { deleteUser, getAllUsers } from '../../redux/action/action-creator/usersAction';

// ----------------------------------------------------------------------

const tableHead = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isActive', label: 'isActive', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  const USERLIST = useSelector((state) => state.user.users);

  const [open, setOpen] = useState(null);

  const [userId, setUserId] = useState();

  const [selectedUser, setSelectedUser] = useState(null);
  const [inputErrors, setInputErrors] = useState({ username: '', phone: '' });


  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false)
    setInputErrors({username: null, phone: null})
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(getAllUsers());
      setOpen(null);
    });
  };

  const handleOpenMenu = (event, user) => {
    setUserId(user._id);
    setSelectedUser(user);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title> Users </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users List
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHead.map((headCell) => (
                      <TableCell key={headCell.id}>{headCell.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {USERLIST.map((user, index) => {
                    const { _id, username, email, role, phone, isActive } = user;
                    return (
                      <TableRow hover key={index} tabIndex={-1}>
                        <TableCell align="left">{index + 1}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">
                          <Label style={{ color: isActive === 'banned' ? 'red' : isActive ? 'green' : 'red' }}>
                            {isActive ? 'Yes' : 'No'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, user)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleModalOpen}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteUser(userId)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <SharedModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        userId={userId}
        selectedUser={selectedUser}
        setModalOpen={setModalOpen}
        setOpen={setOpen}
        inputErrors={inputErrors} 
        setInputErrors={setInputErrors}
      />
    </>
  );
}
