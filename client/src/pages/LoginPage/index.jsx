import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Box,
    Typography,
    Button,
    useTheme,
    IconButton
} from '@mui/material';

import {
	FormContainer,
	TextFieldElement,
	PasswordElement,
} from "react-hook-form-mui";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin } from '../../state';

import { FinniIcon } from '../../constants/finni';

const LoginPage = () => {
    const theme = useTheme();
    const [pageType, setPageType] = useState('login');
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerSchema = yup.object().shape({
		firstName: yup.string().required("required"),
		lastName: yup.string().required("required"),
		email: yup.string().email("invalid email").required("required"),
		password: yup.string().min(8).required("required"),
	});

	const loginSchema = yup.object().shape({
		email: yup.string().email("invalid email").required("required"),
		password: yup.string().min(8).required("required"),
	});

	const initialValuesLogin = {
		email: "",
		password: "",
	};
	const initialValuesRegister = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

    const formContext = useForm({
		defaultValues: isLogin ? initialValuesLogin : initialValuesRegister,
		resolver: yupResolver(isLogin ? loginSchema : registerSchema),
	});

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = formContext;

    const register = async (values) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const savedUser = await response.json();
            reset();
    
            if (response.status === 201) {
                dispatch(
                    setLogin({
                        user: savedUser.user,
                        token: savedUser.token
                    })
                );
                navigate('/home');
            } else {
                alert(savedUser.message);
            }
        } catch (error) {
            alert(error.message);
        }
	};

	const login = async (values) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const loggedIn = await response.json();
            reset();
    
            if (response.status === 200) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home");
            } else {
                alert(loggedIn.message);
            }   
        } catch (error) {
            alert(error.message);
        }
	};

	const onSubmit = async (values) => {
		if (isLogin) await login(values);
		if (isRegister) await register(values);
	};

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p="8rem"
        >
            <IconButton disableRipple onClick={() => navigate('/')}>
                <FinniIcon sx={{ fontSize: 100 }} />
            </IconButton>
            <Box
                minWidth="400px"
                p="2rem"
                gap="1.5rem"
                backgroundColor={theme.palette.background}
            >
		 		{/* TITLE */}
		 		<Typography fontWeight="700" color="primary" textAlign="center" variant="h4" sx={{ mb: "1.5rem" }}>
		 			{isLogin ? "Sign in" : "Create an Account"}
		 		</Typography>

		 		{/* FORM */}
		 		<FormContainer
		 			formContext={formContext}
		 			handleSubmit={handleSubmit(onSubmit)}
		 		>
		 			<Box
		 				display="grid"
		 				gap="30px"
		 				gridTemplateColumns="repeat(4, minmax(0, 1fr))"
		 			>
		 				{isRegister && (
		 					<>
		 						<TextFieldElement
		 							control={control}
		 							name="firstName"
		 							label="First Name"
		 							sx={{ gridColumn: "span 2" }}
		 						/>
		 						<TextFieldElement
		 							control={control}
		 							name="lastName"
		 							label="Last Name"
		 							sx={{ gridColumn: "span 2" }}
		 						/>
		 					</>
		 				)}
		 				<TextFieldElement
		 					control={control}
		 					name="email"
		 					label="Email"
		 					sx={{ gridColumn: "span 4" }}
		 				/>
		 				<PasswordElement
		 					control={control}
		 					name="password"
		 					label="Password"
		 					sx={{ gridColumn: "span 4" }}
		 				/>
		 			</Box>

		 			<Box>
		 				<Button
		 					fullWidth
		 					type="submit"
		 					variant="contained"
		 					sx={{
		 						mt: "2rem",
		 						mb: "1rem",
		 						p: "0.5rem",
		 						textTransform: "none",
		 					}}
		 				>
		 					<Typography variant="h6" fontWeight="700">
		 						{isLogin ? "Sign in" : "Sign up"}
		 					</Typography>
		 				</Button>
					</Box>
                </FormContainer>
            </Box>
            <Box
                display="flex"
            >
                <Typography>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </Typography>
                <Typography>&nbsp;</Typography>
                <Typography
                    onClick={() => {
                        setPageType(isLogin ? 'register' : 'login');
                        reset();
                    }}
                    sx={{
                        color: theme.palette.primary.dark,
                        textDecoration: 'underline',
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }}
                >
                    {isLogin ? "Create a new account" : "Sign into your existing account"}
                </Typography>
            </Box>
        </Box>
    )
};

export default LoginPage;