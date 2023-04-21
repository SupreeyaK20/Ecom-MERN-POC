import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// @mui
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar/Scrollbar';
import { addCategory, getCategories } from '../../redux/action/action-creator/categoryAction';

// ----------------------------------------------------------------------

const tableHead = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
];

export default function CategoryPage() {
  
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({
    name : '',
    description: ''
  })
  const [inputErrors, setInputErrors] = useState({
    name: '',
  });
  const CATEGORY = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputErrors({name: null})
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput((prevFormData) => ({ ...prevFormData, [name]: value }));
    setInputErrors({name: null})

  };

  const handleAddCategory = () => {
    if (!formInput.name) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name is required.',
      }));
    } else {
      dispatch(addCategory(formInput)).then(() => {
        dispatch(getCategories());
        setOpen(false);
        setFormInput({ name: '', description: '' });
        setInputErrors({ name: null });
      });
    }
  };
  


  return (
    <>
      <Helmet>
        <title> Dashboard: Category </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            New Category
          </Button>
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
                  {CATEGORY.map((category, index) => {
                    const { name, description } = category;
                    return (
                      <TableRow hover key={index} tabIndex={-1}>
                        <TableCell align="left">{index + 1}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="left" spacing={5}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{description}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Create New Category</DialogTitle>

          <DialogContent style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField id="outlined-basic" name="name" label="Name" variant="outlined" fullWidth 
            onChange={(e) => handleChange(e)} 
            error={!!inputErrors.name}
            helperText={inputErrors.name}
            required
            />

            <TextField id="outlined-multiline-static" name="description" label="Description" multiline rows={4} onChange={(e) => handleChange(e)} />
          </DialogContent>
          <DialogActions style={{ paddingRight: '12px', marginRight: '12px' }}>
            <Button size="large" onClick={handleClose}>Cancel</Button>
            <Button size="large" type="submit" variant="contained" onClick={()=>handleAddCategory()}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
