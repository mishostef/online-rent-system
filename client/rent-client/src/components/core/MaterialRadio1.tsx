import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { connect, Field, FieldProps } from 'formik';
import React, { ChangeEventHandler } from 'react';
import { resource } from '../../models/enums/resource';
import { userRole, userRoleNarrow } from '../../models/enums/Role';

interface MaterialFiledProps {
    name: string;
    label: string
    val: userRoleNarrow | userRole | resource;
    type: typeof userRoleNarrow | typeof userRole | typeof resource
    classes?: string;
    handleChange?: ChangeEventHandler<Element>;
}

function MaterialRadio1({ name, label, val, type, handleChange, classes }: MaterialFiledProps) {
    const vals = Object.keys(type).filter(k => isNaN(+k));
    return (
        <Field name={name}>
            {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.

            }: FieldProps) => (<>

                <FormControl component="fieldset">
                    <RadioGroup name={name} value={val} onChange={handleChange}>
                        {vals.map((v, i) => {
                            console.log(`val=${val}`);
                            console.log(`+val=${+val}`);
                            return (<FormControlLabel value={i as userRoleNarrow} control={<Radio color="primary" size="small" className="form-control" />}
                                label={v} checked={val === i} />)
                        })}
                    </RadioGroup>
                </FormControl>
            </>
            )
            }
        </Field>
    );
};

export default connect<MaterialFiledProps>(MaterialRadio1);