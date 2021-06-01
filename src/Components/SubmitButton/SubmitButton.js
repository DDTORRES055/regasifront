import React from "react"

export default function SubmitButton({ id, className, value = "Enviar" }) {
    return (
        <div className="text-center mt-4">
            <button id={id} type="submit" className={`btn btn-primary btn-block ${className}`}>
                {value}
            </button>
        </div>
    )
}
