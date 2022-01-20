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
}

function MaterialDate({ name, label, type, val, handleChange, classes }: MaterialFiledProps) {
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
                    name={name}
                    type={type}
                    value={val}
                    onChange={handleChange}
                    className={classes}

                />
            )
            }
        </Field>
    );
};

export default connect<MaterialFiledProps>(MaterialDate);