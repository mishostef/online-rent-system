import { TextField } from '@material-ui/core';
import { connect, Field, FieldProps } from 'formik';
import React, { ChangeEventHandler } from 'react';

interface MaterialFiledProps {
    name: string;
    label: string
    type: string;
    val: string;
    classes?: string;
    handleChange?: ChangeEventHandler<Element>;
    placeholder?: string;
    fullwidth?: boolean;
}

function CustomField({ name, label, type, val, handleChange, classes, placeholder, fullwidth = false }: MaterialFiledProps) {
    return (
        <Field name={name}>
            {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
            }: FieldProps) => (
                <TextField
                    id={name}
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    value={val}
                    fullWidth={fullwidth}
                    onChange={handleChange}
                    className={classes}

                />
            )
            }
        </Field>
    );
};

export default connect<MaterialFiledProps>(CustomField);