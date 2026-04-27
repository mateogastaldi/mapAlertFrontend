import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx"

// El hook personalizado
export function useAuth() {
    return useContext(AuthContext);
}