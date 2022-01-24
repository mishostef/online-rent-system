import { Button } from "@material-ui/core";
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { initialValues } from '../../../constants'
import { userRole } from "../../../models/enums/Role";
import { useNavigate } from "react-router-dom";
import { submitRegister } from "../../../authReducer";
import { useDispatch } from "react-redux";
import CustomField from "../../core/CustomField";


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
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            try {
                dispatch(submitRegister(
                    values
                ));
                navigate('/');
            } catch (err: any) {
                alert(err.response.data);
            }
        },
    });


    return (
        <div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <CustomField name="firstName" label="firstName" type="text" val={formik.values.firstName}
                        handleChange={formik.handleChange} placeholder="pesho" fullwidth={true} />

                    <CustomField name="lastName" label="lastName" type="text" val={formik.values.lastName}
                        handleChange={formik.handleChange} placeholder="petrov" fullwidth={true} />

                    <CustomField name="email" label="Email" type="email" val={formik.values.email}
                        handleChange={formik.handleChange} placeholder={initialValues.email} fullwidth={true} />

                    <CustomField name="password" label="Password" type="password" val={formik.values.password!}
                        handleChange={formik.handleChange} placeholder={initialValues.password} fullwidth={true} />
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
            </FormikProvider>
        </div>
    )
}

export default Register;