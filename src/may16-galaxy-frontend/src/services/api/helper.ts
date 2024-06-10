const httpHelper = {
    isFormError: (status: number) => {
        return status == 422;
    },
};

export default httpHelper;
