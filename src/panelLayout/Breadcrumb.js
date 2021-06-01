import React from "react"

export default function Breadcrumb({ pageTitles }) {
    return (
        <React.Fragment>
            {pageTitles && pageTitles[0] ? (
                <div className="page-titles">
                    <ol className="breadcrumb">
                        {pageTitles.map((title, i) => {
                            return (
                                <li className={`breadcrumb-item ${i === pageTitles.length - 1 ? "active" : ""}`} key={i}>
                                    <a>{title}</a>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            ) : (
                <div></div>
            )}
        </React.Fragment>
    )
}
