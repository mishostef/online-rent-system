
import { Button, Grid } from "@material-ui/core";
import { Field, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import MaterialField from "../core/MaterialField";
import { ResourceTemplate } from "../../models/ResourceTemplate";
import { resource } from "../../models/enums/resource";
import { getDateString, sendData } from "../../utils/utils";
import { resourcesAddress, staticAddress } from "../../constants";
import CustomField from "../core/CustomField";
import MaterialRadio from "../core/MaterialRadio";
import FormControlLabel from "@material-ui/core";
import { IUser } from "../../models/IUser";


const useStyles = makeStyles(theme => ({
    center: {
        width: '40%',
        margin: '0 auto'
    },
    form: {
        border: '2px solid #ffaaff',
        borderRadius: '10px'
    },
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
        //alignItems: 'center'
    },
    block: {
        display: 'block',
    },
    hidden: {
        display: 'none'
    },
    file: {

        maxWidthidth: '90px',
        overflow: 'hidden',
    },
    flex: {
        display: 'flex'
    }
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



const AddAdvertisement: React.FC<{ props: ResourceTemplate, method: string, resourceId?: string, user?: IUser }> = ({ props, method, resourceId, user }): JSX.Element => {

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
                <form className={`${classes.form} ${classes.center}`} onSubmit={formik.handleSubmit} >
                    <MaterialField name='address' rowsMax={20} label='address' />
                    <MaterialField name='description' label='description' />
                    <MaterialField name='shortDescription' rowsMax={20} label='Short description' />
                    <Grid container spacing={4} direction="row">
                        <Grid item xs={6} >
                            {/* <label htmlFor="file" ></label>
                            <input id="file" className={classes.file} type="file" name="avatar" onChange={handleFileSelect} />
                            {img && <img src={imageUrl} width="50px" alt="no img" />} */}


                            

                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleFileSelect}
                                />
                            </Button>
                            {img && <img src={imageUrl} width="50px" alt="no img" />} 
                        </Grid>
                        <Grid className={`${classes.chkbox} ${classes.center}`} spacing={4} item xs={2}>
                            <Grid item xs={12} className={`${classes.chkbox}`}>
                                <label >isMD {`${formik.values.isMD}`}
                                    <Field className={classes.block} type="checkbox" name="isMD" onChange={formik.handleChange} />
                                </label>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomField classes={classes.flex} label="From: " name="date" type="date" val={getDateString(formik.values.date)} handleChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={6} >
                            <MaterialRadio name="resourceType" label="resource type" val={restype} handleChange={(e) => handleRadio(e)} />
                        </Grid>
                    </Grid>

                    <Button color="primary" disabled={!(formik.isValid && formik.dirty) || !formik.touched} variant="contained" type="submit">
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

