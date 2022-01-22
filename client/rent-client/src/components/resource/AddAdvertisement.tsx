
import { Button, Grid, Radio, RadioGroup, TextField } from "@material-ui/core";
import { Field, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent, useState } from "react";
import MaterialField from "../core/MaterialField";
import { ResourceTemplate } from "../../models/ResourceTemplate";
import { resource } from "../../models/enums/resource";
import { getDateString, sendData } from "../../utils/utils";
import { resourcesAddress, staticAddress } from "../../constants";
import { getCookieJWTInfo } from "../../services/userService";
import MaterialDate from "../core/MaterialDate";
import MaterialRadio from "../core/MaterialRadio";
import { Navigate } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    dialogPaper: {
        height: '100px'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    chkbox: {
        float: 'left',
    },
}));


const validationSchema = yup.object({

    resourceType: yup.string().required(),
    address: yup.string().trim().required(),
    description: yup.string().trim().required(),
    shortDescription: yup.string().trim().required(),
    avatar: yup.object().required(),
    date: yup.date().required(),
    isMD: yup.boolean()
});



const AddAdvertisement: React.FC<{ props: ResourceTemplate, method: string, resourceId?: string }> = ({ props, method, resourceId }): JSX.Element => {

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);


    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            resourceType: props.resourceType || resource.villa,
            avatar: {},
            address: props.address,
            description: props.description,
            imageName: props.imageName,
            shortDescription: props.shortDescription || '',
            date: props.date || new Date(),
            isMD: props.isMD || false
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values);
            const user = getCookieJWTInfo();
            const ownerId = user!._id!;
            const formData = new FormData();
            formData.append("selectedFile", selectedFile!);
            [...Object.keys(values)].filter(x => x !== 'avatar').forEach(k => formData.append(k, (values as any)[k]));
            formData.append("ownerId", ownerId);

            if (selectedFile) {
                showFileAttributes(selectedFile);

                try {
                    const url = method === 'post' ? resourcesAddress : `${resourcesAddress}/${resourceId}`;
                    console.log(`url=${url}`)
                    const response = await sendData(url, method, formData);
                    console.log(response.data.imageName);
                    setImg(response.data.imageName);
                } catch (error) {
                    console.log(error)
                }
                formik.resetForm();
            } else {
                return alert(`file not selected`)
            }


            function showFileAttributes(selectedFile: File) {
                alert(JSON.stringify(
                    {
                        fileName: selectedFile['name'],
                        type: selectedFile['type'],
                        size: `${selectedFile['size']} bytes`,
                        "resourceType": `${values.resourceType}`
                    }));
            }
        }
    });
    const [restype, setResType] = useState(formik.initialValues.resourceType)
    const [img, setImg] = useState(formik.initialValues.imageName);



    const handleFileSelect = (event: any) => {
        alert(event.target.value);
        if (event.target.files)
            setSelectedFile(event.target.files[0])
    }

    function handleRadio(e: any) {
        formik.handleChange(e);
        const next = resource[e.target.value] === "villa" ? resource.villa : resource.house;
        setResType(next);
    }

    let imageUrl = `${staticAddress}/${img}`;
    console.log(`imageUrl =${imageUrl}`);
    return (
        <FormikProvider value={formik}>
            <div>
                <form onSubmit={formik.handleSubmit} >
                    <MaterialField name='address' rowsMax={20} label='address' />
                    <MaterialField name='description' label='description' />
                    <MaterialField name='shortDescription' rowsMax={20} label='Short description' />
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <input type="file" name="avatar" onChange={handleFileSelect} />
                            {img && <img src={imageUrl} width="50px" alt="no img" />}
                        </Grid>
                        <Grid item xs={2}>
                            <label className="classes.chkbox">isMD {`${formik.values.isMD}`}
                                <Field type="checkbox" name="isMD" onChange={formik.handleChange} />
                            </label>
                        </Grid>
                        <Grid item xs={3}>
                            <MaterialDate label="From: " name="date" type="date" val={getDateString(formik.values.date)} handleChange={formik.handleChange} classes={classes.chkbox} />
                        </Grid>
                        <Grid item xs={2}>
                            <MaterialRadio name="resourceType" label="resource type" val={restype} handleChange={(e) => handleRadio(e)} />
                        </Grid>
                    </Grid>

                    <Button color="primary" disabled={!(formik.isValid && formik.dirty) || !formik.touched} variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                    <Button color="secondary" className="outline" onClick={() => formik.resetForm()}>
                        Reset
                    </Button>
                </form>
                <h6>{JSON.stringify(formik.errors)}</h6>
            </div >
        </FormikProvider>
    )
}

export default AddAdvertisement

