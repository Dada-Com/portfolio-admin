import * as Yup from "yup"

export const ContactSchema = Yup.object({
    contactid: Yup.number().required("Please enter your Contacr ID"),
    descrip: Yup.string().min(5).max(270).required("Please enter your description"),
    address: Yup.string().min(10).max(100).required("Please enter your address"),
    contactno: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8)
        .required("Please enter your contact no"),
    email: Yup.string().email().required("Please enter your email Id")
})


