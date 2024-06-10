import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import httpRequest from "@/services/api/request";
import routes from "@/services/routes";

const useRegister = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const registerSchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
    });

    type RegisterSchemaType = z.infer<typeof registerSchema>;

    const { control, handleSubmit, setError } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });

    const transformErrorToForm = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);

        try {
            await httpRequest.post("/api/any/success/", data);
            navigate(routes.auth.login);
        } catch (e: any) {
            transformErrorToForm(e.response.data);
        }
        setIsLoading(false);
    });

    return {
        showPassword,
        isLoading,
        control,
        onSubmit,
        toggleShowPassword,
    };
};

export default useRegister;
