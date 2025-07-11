import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/api/auth/logout";

export function LogoutPage() {
    const [state, dispatch] = useAuthContext();

    const logoutMutation = useMutation({
        mutationFn: logout,
    })

    const queryClient = useQueryClient();

    useEffect(() => {
        if(logoutMutation.isSuccess || logoutMutation.isError){
            return;
        }

        queryClient.invalidateQueries();

        logoutMutation.mutateAsync()
            .then(() => {
                dispatch({ type: 'LOGOUT' });
            });
    }, []);

    if(!state.token){
        return <Navigate to="/login" />
    }

    return <div>Logging out...</div>
}
