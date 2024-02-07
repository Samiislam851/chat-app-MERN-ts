import React, { ReactNode, createContext, useState } from 'react'

type Props = {
    children: ReactNode
}


export const Context = createContext<null | any>(null)

const ContextProvider = ({ children }: Props) => {
    const [test, setTest] = useState<boolean>(false)


    const value = {}

    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    )
}

export default ContextProvider