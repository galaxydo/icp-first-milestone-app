import { toast } from "sonner";

const useToast = () => {
    const show = (message: string) => {
        toast(message);
    };

    const showSuccess = (message: string) => {
        toast.success(message);
    };

    const showError = (message: string) => {
        toast.error(message);
    };

    const toaster = {
        show,
        success: showSuccess,
        error: showError,
    };
    return {
        toaster,
    };
};

export default useToast;
