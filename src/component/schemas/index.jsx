import * as Yup from "yup"
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
export const HomeSchema = Yup.object({
    pid: Yup.number().required("Please enter your profile ID"),
    name: Yup.string().min(5).max(20).required("Please enter your name"),
    descrp: Yup.string().min(10).max(100).required("Please enter some description"),
    tlink: Yup.string().min(5).max(100).required("Please enter your twitter link"),
    llink: Yup.string().min(5).max(100).required("Please enter your linkdin link"),
    glink: Yup.string().min(5).max(100).required("Please enter your github link"),
    logo: Yup.string().min(5).max(20).required("Please enter your navbar logo"),
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
        ),

    aid: Yup.number().required("Please enter your about us ID"),
    aboutus: Yup.string().min(10).max(1500).required("Please enter some about you"),
    education: Yup.string().min(10).max(1500).required("Please enter some education"),
    skills: Yup.string().min(10).max(2000).required("Please enter some about your skills")

})