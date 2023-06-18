import * as Yup from "yup"
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
export const WorkSchema = Yup.object({
    workno: Yup.string().required("Please enter work no"),
    descrip: Yup.string().min(10).max(505).required("Please enter some description"),
    tittle: Yup.string().min(5).max(50).required("Please enter your work title"),
    githublink: Yup.string().min(5).max(50).required("Please enter your github link"),
    imgsrc: Yup.mixed()
        .nullable()
        .required()
        .test(
            "FILE_SIZE",
            "Uploaded file is to big",
            (value) => !value || (value && value.size <= 1024 * 1024)
        )
        .test(
            "FILE_FORMAT",
            "Uploaded file is not support",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        )
})