import React from "react"

export default function TextInput({ id, label, placeholder, className, value, onChange, required, pattern }) {
    return (
        <div className="form-group">
            <label className="mb-1">
                <strong>{label}</strong>
            </label>
            <input
                id={id}
                type="text"
                className={`form-control ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                pattern={pattern}
            />
        </div>
    )
}
