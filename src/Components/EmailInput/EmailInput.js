import React from "react"

export default function EmailInput({ id, className, value, onChange, required }) {
    return (
        <div className="form-group">
            <label className="mb-1">
                <strong>Email</strong>
            </label>
            <input
                id={id}
                type="email"
                className={`form-control ${className}`}
                placeholder="email@ejemplo.com"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}
