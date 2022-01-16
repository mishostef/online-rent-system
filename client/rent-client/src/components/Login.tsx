
import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { useNavigate, useLocation } from "react-router";
import { login } from "../services/authService";
import axios from "axios";


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});



export default function Login(): ReactElement {
    let navigate = useNavigate();

    let location = useLocation();
    let from = ((location.state as any)?.from as any)?.pathname || "/";


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            console.log(values.email);

            try {
                const res = await login(values.email, values.password);
                console.log(res);
                //  console.log(res.data);
                sessionStorage.setItem('SESSION_TOKEN', res['SESSION_TOKEN']);
                // axios.defaults.headers.common['Authorization'] = res.data['SESSION_TOKEN']
                navigate(from, { replace: true });
            } catch (err: any) {
                alert(err.response.data.message);
            }

        },
    });


    return (

        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="pesho@abv.bg"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="123"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" disabled={!(formik.isValid && formik.dirty)} variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
            <Button color="secondary"
                className="outline"
                onClick={() => formik.resetForm()}
            >
                Reset
            </Button>
        </div>
    )
}