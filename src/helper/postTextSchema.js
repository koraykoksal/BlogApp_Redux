import { object, string } from "yup"


//? harici validasyon şemasi
export const postInfoSchema = object({
    title: string()
        .required("Bu alan zorunludur")
        .min(1,"En az 1 karakter girilmelidir")
        .max(100,"En fazla 100 karakter girilmelidir"),
    content: string()
        .required("Bu alan zorunludur")
        .min(1, "En az 1 karakter girilmelidir"),
    category:string()
        .min(1,"En az 1 karakter girilmelidir"),
    image_link:string()
        .max(400,"En fazla 400 karakter girilmelidir")
})