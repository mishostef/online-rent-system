
import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { resourcesAddress } from '../../constants'
import { useNavigate, useParams } from "react-router";
import { addComment, editComment } from "../../services/userService";


const validationSchema = yup.object({
    txt: yup
        .string()
        .min(3, 'Comment be minimum 3 characters long')
        .required('Comment is required'),
});



const AddComment: React.FC<{ initialV: string, method?: string, commentId?: string }> = ({ initialV, method = 'POST', commentId }): ReactElement => {
    let navigate = useNavigate();

    const { resourceId } = useParams();

    const formik = useFormik({
        initialValues: {
            txt: initialV,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const url = method === 'POST' ? `${resourcesAddress}/${resourceId}/comments` :
                `${resourcesAddress}/${resourceId}/comments/${commentId}`;
            try {
                method === 'POST' ? await addComment(url, values.txt) : await editComment(url, values.txt)
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        },
    });


    return (

        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="txt"
                    name="txt"
                    label="Comment"
                    placeholder="Your comment here"
                    value={formik.values.txt}
                    onChange={formik.handleChange}
                    error={formik.touched.txt && Boolean(formik.errors.txt)}
                    helperText={formik.touched.txt && formik.errors.txt}
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

export default AddComment;