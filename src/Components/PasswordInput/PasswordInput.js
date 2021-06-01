import React from "react"

export default function PasswordInput({ id, className, value, confirmation, onChange, required }) {
    return (
        <div className="form-group">
            <label className="mb-1">
                <strong>{confirmation ? "Confirmación de contraseña" : "Contraseña"}</strong>
            </label>
            <input
                id={id}
                type="password"
                className={`form-control ${className}`}
                placeholder="Contraseña"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}
