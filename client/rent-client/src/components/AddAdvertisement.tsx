
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextareaAutosize, TextField } from "@material-ui/core";

import { Field, FormikProvider, useFormik, validateYupSchema } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import MaterialField from "./MaterialField";
import { ResourceTemplate } from "../models/ResourceTemplate";
import { resource } from "../enums/resource";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ITokenInfo } from "../models/ITokenInfo";
import { getDateString } from "../utils/utils";
import { useParams } from "react-router-dom";
import { resourcesAddress, staticAddress } from "../constants";
import { getCookieJWTInfo } from "../services/userservice";




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

    const [selectedFile, setSelectedFile] = React.useState(null);

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

            //const tokenInfo = jwt_decode(document.cookie);
            const user = getCookieJWTInfo();
            const ownerId = user!._id!;//(tokenInfo as ITokenInfo)._id;
            const formData = new FormData();
            formData.append("selectedFile", selectedFile!);
            [...Object.keys(values)].filter(x => x !== 'avatar').forEach(k => formData.append(k, (values as any)[k]));
            formData.append("ownerId", ownerId);

            if (selectedFile) {
                alert(JSON.stringify(
                    {
                        fileName: selectedFile['name'],
                        type: selectedFile['type'],
                        size: `${selectedFile['size']} bytes`,
                        "resourceType": `${values.resourceType}`
                    }))

                try {
                    const url = method === 'post' ? resourcesAddress : `${resourcesAddress}/${resourceId}`;
                    console.log(`url=${url}`)
                    
                    const response = await axios({
                        method: method === 'post' ? 'post' : 'put',
                        url: url,
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    console.log(response.data.imageName);

                } catch (error) {
                    console.log(error)                    
                }
            } else {
                return alert(`file not selected`)
            }

        }
    });

    const handleFileSelect = (event: any) => {
        setSelectedFile(event.target.files[0])
    }


    let imageUrl = `${staticAddress}/${props.imageName}`;
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
                            {props.imageName && <img src={imageUrl} width="50px" alt="no img" />}
                        </Grid>
                        <Grid item xs={2}>
                            <label className="classes.chkbox">isMD {`${formik.values.isMD}`}
                                <Field type="checkbox" name="isMD" onChange={formik.handleChange} />
                            </label>

                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                label="From:"
                                name="date"
                                type="date"
                                value={getDateString(formik.values.date)}
                                onChange={formik.handleChange}
                                className={classes.textField}

                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl className="{classes.dialogPaper }" component="fieldset">
                                <FormLabel component="legend">resource type</FormLabel>
                                <RadioGroup aria-label="resourceType" name="resourceType" defaultValue={resource[formik.initialValues.resourceType].toString()} onChange={formik.handleChange}>
                                    <FormControlLabel value="villa" control={<Radio />} label="villa" />
                                    <FormControlLabel value="house" control={<Radio />} label="house" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>


                    <Button color="primary" disabled={!(formik.isValid && formik.dirty) || !formik.touched} variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                    <Button color="secondary"
                        className="outline"
                        onClick={() => formik.resetForm()}
                    >
                        Reset
                    </Button>
                </form>
                <h6>{JSON.stringify(formik.errors)}</h6>
            </div >
        </FormikProvider>
    )
}




export default AddAdvertisement

