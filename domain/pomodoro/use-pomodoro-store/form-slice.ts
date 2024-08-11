export interface FormSlice {
    formValues: { task: string };
    setFormValues: (values: { task: string }) => void;
}

export const createFormSlice = (set: any): FormSlice => ({
    formValues: { task: '' },
    setFormValues: (values: { task: string }) => set({ formValues: values }),
});
