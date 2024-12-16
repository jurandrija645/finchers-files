import { createContext, useContext } from 'react';
import FinchersApiClient from '../FinchersApiClient';

const ApiContext = createContext();

export default function ApiProvider({children})
{
    const api = new FinchersApiClient();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi()
{
    return useContext(ApiContext);
}

