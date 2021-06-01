import React, { useState } from "react"

const LayoutContext = React.createContext()
const { Provider, Consumer } = LayoutContext

const LayoutProvider = ({ children }) => {
    const [loadingVisible, setLoadingVisible] = useState(false)

    const [toggledMenu, setToggledMenu] = useState(false)

    return <Provider value={{ loadingVisible, setLoadingVisible, toggledMenu, setToggledMenu }}>{children}</Provider>
}

export { LayoutProvider, Consumer as LayoutConsumer, LayoutContext }
