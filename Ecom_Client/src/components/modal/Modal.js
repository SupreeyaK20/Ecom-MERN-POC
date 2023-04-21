import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  Modal,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAllUsers, updateUser } from '../../redux/action/action-creator/usersAction';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const SharedModal = React.memo(({ modalOpen, handleModalClose, userId, selectedUser, setModalOpen, setOpen, inputErrors, setInputErrors }) => {
  const [updatedInput, setUpdatedInput] = useState(selectedUser || {});
  // const [inputErrors, setInputErrors] = useState({ username: '', phone: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedInput(selectedUser || {});
  }, [selectedUser]);

  const handleChange = ({ target: { name, value } }) => {
    setUpdatedInput((prevFormData) => ({ ...prevFormData, [name]: value }));
    setInputErrors({ username: null });
  };

  const handleEditUser = (userId) => {
    const errors = { username: '', phone: '' };

    if (!updatedInput.username) {
      errors.username = 'Username is required';
    }

    if (!updatedInput.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(updatedInput.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (errors.username !== '' || errors.phone !== '') {
      setInputErrors(errors);
      return;
    }
    const formData = {
      username: updatedInput.username,
      phone: updatedInput.phone,
      isActive: updatedInput.isActive,
    };

    dispatch(updateUser(userId, formData)).then(() => {
      dispatch(getAllUsers());
      setUpdatedInput('');
      setModalOpen(false);
      setOpen(null);
    });
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
      <DialogTitle>Update User</DialogTitle>
      <DialogContent style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          id="outlined-basic"
          name="username"
          value={updatedInput.username}
          label="User Name"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          error={!!inputErrors.username}
          helperText={inputErrors.username}
          required
        />

        <TextField
          name="phone"
          label="Phone Number"
          value={updatedInput.phone}
          fullWidth
          onChange={handleChange}
          error={!!inputErrors.phone}
          helperText={inputErrors.phone}
          required
        />

        <FormControl fullWidth>
          <InputLabel name="isActive">isActive</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="isActive"
            label="isActive"
            value={updatedInput.isActive}
            onChange={handleChange}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ paddingRight: '12px', marginRight: '12px' }}>
        <Button size="large" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button size="large" type="submit" variant="contained" onClick={() => handleEditUser(userId)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default SharedModal;
