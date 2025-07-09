import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth(); // rename here
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: roleLoading, refetch } = useQuery({
        enabled: !authLoading && !!user?.email,
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user?.email}`);
            return res.data.role;
        }
    });

    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;