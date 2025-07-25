import React, { useState } from 'react';

type SelectProps = {
    value: any;
    options: Array<{value: any, label: string}>
    onChange: (value: any) => void
    disabled: boolean
};

function Select({ value, options, onChange, disabled }: SelectProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <select className="form-select" value={value} onChange={handleChange} disabled={disabled}>
            {
                options.map((item, key) => {
                    return (
                        <option key={key} value={item.value}>{item.label}</option>
                    )
                })
            }
        </select>
    );
}

export default Select;
