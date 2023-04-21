import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { registerUser } from '../../redux/action/action-creator/authAction';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const errorMessage = useSelector((state) => state.register.error);

  const defaultFormData = {
    username: '',
    email: '',
    password: '',
    phone: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = () => {
    
      dispatch(registerUser(formData)).then(() => {
        navigate('/login', { replace: true });
      });
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    clearErrors(name);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            id="outlined-basic"
            name="username"
            label="User Name"
            variant="outlined"
            fullWidth
            focused
            {...register('username', { required: 'User Name is required.' })}
            error={!!errors?.username}
            helperText={errors?.username ? errors.username.message : null}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="email"
            label="Email address"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors?.email || (errorMessage && errorMessage.includes('email'))}
            helperText={
              (errors?.email && errors.email.message) ||
              (errorMessage && errorMessage.includes('email') && errorMessage)
            }
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="phone"
            label="Phone Number"
            {...register('phone', {
              required: 'Phone number is required.',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be a 10-digit number.',
              },
            })}
            error={!!errors?.phone || (errorMessage && errorMessage.includes('phone'))}
  helperText={
    (errors?.phone && errors.phone.message) ||
    (errorMessage && errorMessage.includes('phone') && errorMessage)
  }
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
            onChange={(e) => handleChange(e)}
          />

          {/* <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup name="gender" value={formData.gender} onChange={(e) => handleChange(e)} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup name="role" value={formData.role} onChange={(e) => handleChange(e)} row>
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="user" control={<Radio />} label="User" />
            </RadioGroup>
          </FormControl> */}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <Checkbox name="remember" label="Remember me" /> */}
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Register
        </LoadingButton>
      </form>
    </>
  );
}
