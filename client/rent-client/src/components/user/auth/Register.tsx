import { Button } from "@material-ui/core";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { initialValues } from '../../../constants'
import { userRole } from "../../../models/enums/Role";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";


const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(2, 'firstName should be at least 2 symbols')
        .required('firstName is required'),
    lastName: yup
        .string()
        .min(2, 'lastName should be at least 2 symbols')
        .required('lastName is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'Password should be of minimum 3 characters length')
        .required('Password is required'),
    role: yup.number().oneOf([userRole.Guest, userRole.Owner])

});


const Register: React.FC<{}> = () => {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            try {
                const res = await register(values);
                console.log(res.data);
                sessionStorage.setItem('SESSION_TOKEN', res['SESSION_TOKEN']);
                navigate('/');
            } catch (err: any) {              
                alert(err.response.data);
            }
        },
    });


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />

                <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />

                <TextField
                    fullWidth
                    id="email"
                    name="email"
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
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <div id="my-radio-group">userRole</div>


                <div className="form-control">
                    <input
                        type="radio"
                        value="Owner"
                        name="userRole"
                        checked={+formik.values.role === userRole.Owner}
                        onChange={formik.handleChange}
                    />
                    <label>Owner</label>
                </div>

                <div className="form-control">
                    <input
                        type="radio"
                        value="Guest"
                        name="userRole"
                        checked={+formik.values.role === userRole.Guest}
                        onChange={formik.handleChange}
                    />
                    <label>Guest</label>
                </div>
                <Button color="primary" disabled={!(formik.isValid && formik.dirty)} variant="contained" fullWidth type="submit">
                    Submit
                </Button>
                <Button color="secondary"
                    className="outline"
                    onClick={() => formik.resetForm()}
                >
                    Reset
                </Button>
            </form>

        </div>
    )
}

export default Register;