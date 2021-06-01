import React from "react"

export default function UsernameInput({ id, className, value, onChange, required }) {
    return (
        <div className="form-group">
            <label className="mb-1">
                <strong>Nombre de usuario</strong>
            </label>
            <input
                id={id}
                type="text"
                className={`form-control ${className}`}
                placeholder="Usuario"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}
