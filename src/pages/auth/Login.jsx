import React from 'react';
import {Button, TextField} from "@material-ui/core";
import * as yup from 'yup';
import {useFormik} from "formik";

const Login = () => {
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Geçerli bir email giriniz')
            .required('Email boş geçilemez'),
        password: yup
            .string('Enter your password')
            .min(6, 'Parola en az 6 karakterden oluşmalıdır')
            .required('Parola boş geçilemez'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{marginTop:20}}>
                <TextField
                    fullWidth={true}
                    id="email"
                    name="email"
                    placeholder={"birisi@example.com"}
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    placeholder={"******"}
                    label="Parola"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button style={{marginTop:20, right:"-47%"}} color="primary" variant="contained" type="submit">
                    Giriş Yap
                </Button>
            </form>
        </div>
    );
};

export default Login;
