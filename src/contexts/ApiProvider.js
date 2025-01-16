import { createContext, useContext } from "react";
import FinchersApiClient from "../FinchersApiClient";

const ApiContext = createContext(); // creating context

export default function ApiProvider({ children }) {
  const api = new FinchersApiClient();

  return (
    <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
    /**The component returns the apicontext that was created before but the provider part of it
     * The value of the context is an object of the apiClient
     */
  );
}

export function useApi() {
  return useContext(ApiContext);
}
