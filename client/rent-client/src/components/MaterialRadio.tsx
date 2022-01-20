import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { connect, Field, FieldProps } from 'formik';
import React, { ChangeEventHandler } from 'react';
import { resource } from '../models/enums/resource';

interface MaterialFiledProps {
    name: string;
    label: string
    val: resource;
    classes?: string;
    handleChange?: ChangeEventHandler<Element>;
}

function MaterialRadio({ name, label, val, handleChange, classes }: MaterialFiledProps) {
    return (
        <Field name={name}>
            {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.

            }: FieldProps) => (<>

                <FormControl className={classes} component="fieldset">
                    <FormLabel component="legend">{label}</FormLabel>
                    <RadioGroup aria-label="resourceType" name={name}  value={val} onChange={handleChange}>
                        <FormControlLabel value={resource.villa}  control={<Radio />} label="villa" checked={val === resource.villa} />
                        <FormControlLabel value={resource.house}  control={<Radio />} label="house" checked={val === resource.house} />
                    </RadioGroup>
                </FormControl>

            </>
            )
            }
        </Field>
    );
};

export default connect<MaterialFiledProps>(MaterialRadio);