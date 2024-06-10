import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import httpRequest from "@/services/api/request";
import routes from "@/services/routes";

const useResetPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const formSchema = z
        .object({
            password: z.string(),
            "re-password": z.string(),
        })
        .refine((data) => data.password === data["re-password"], {
            message: "Passwords don't match",
            path: ["re-password"],
        });

    type FormSchemaType = z.infer<typeof formSchema>;

    const { control, handleSubmit, setError } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
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
        isLoading,
        control,
        showPassword,
        toggleShowPassword,
        onSubmit,
    };
};

export default useResetPassword;
