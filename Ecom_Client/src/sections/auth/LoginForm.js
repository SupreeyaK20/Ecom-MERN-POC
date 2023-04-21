import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { loginUser } from '../../redux/action/action-creator/login/loginActionCreator';

// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const defaultFormData = {
    email: '',
    password: '',
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormData)

  const errorMessage = useSelector(state => state.login)

  const dispatch = useDispatch();

  const onSubmit =  () => {
    dispatch(loginUser(formData));
    navigate('/app', { replace: true })
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    clearErrors(name)
  };
  

  return (
    <>
    {
      errorMessage.error || errorMessage.error?.error 
      ?
      (
        <Typography variant="h6" style={{ fontWeight: 'normal', fontSize: "0.85rem", marginBottom: "13px", marginLeft: "14px", color: errorMessage.error?.error ? "#2065D1" : "red" }}>
          {`${errorMessage.error?.error || errorMessage.error}!`} 
        </Typography>
      ) 
    : null}


    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
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
            helperText={errors?.password? errors.password.message : null}
            onChange={(e) => handleChange(e)}
          />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Login
      </LoadingButton>
    </form>
    </>
  );
}
