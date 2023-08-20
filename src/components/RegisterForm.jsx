import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Form } from "formik"
import { object, string } from "yup"

export const registerSchema = object({
  username: string()
    .max(20, "Kullanıcı adı 10 karakterden az olmalıdır.")
    .required("username zorunludur"),
  first_name: string()
    .max(20, "İsim 20 karakterden az olmalıdır.")
    .required("firstname zorunludur"),
  last_name: string()
    .max(20, "Soyisim 30 karakterden az olmalıdır.")
    .required("lastname zorunludur"),

  email: string().email().required("Email zorunludur"),
  password: string()
    .required("password zorunludur")
    .min(8, "password en az 8 karakter olmalıdır")
    .max(20, "password en fazla 20 karakter olmalıdır")
    .matches(/\d+/, "Password bir sayı içermelidir")
    .matches(/[a-z]/, "Password bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
  bio:string()
  .max(100,"Bio ilgisi 100 karakterden az olmalıdır.")
})

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {


  return (
    <div>
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="User Name"
            name="username"
            id="username"
            type="text"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            label="First Name"
            name="first_name"
            id="first_name"
            type="text"
            variant="outlined"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={errors.first_name}
          />
          <TextField
            label="Last Name"
            name="last_name"
            id="last_name"
            type="text"
            variant="outlined"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={errors.last_name}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            label="Bio"
            name="bio"
            id="bio"
            type="text"
            variant="outlined"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.bio && Boolean(errors.bio)}
            helperText={errors.bio}
          />
          <TextField
            label="Image Link"
            name="image_link"
            id="image_link"
            type="text"
            variant="outlined"
            value={values.image_link}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.image_link && Boolean(errors.image_link)}
            helperText={errors.image_link}
          />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Form>
    </div>
  )
}

export default RegisterForm
