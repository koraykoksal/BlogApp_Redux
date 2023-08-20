import React from 'react'
import { Link } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import LockIcon from "@mui/icons-material/Lock"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { Formik } from "formik"
import RegisterForm, { registerSchema } from "../components/RegisterForm"
import image from "../assets/result.svg"


export const Register = () => {
  return (
    

    <Container maxWidth="lg" sx={{mt:10}}>
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
          //*initialValues statelerin başalngıç değerlerinin olduğu yer tekrar state oluşturma ihtiyacı olmuyor
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            //*onsubmit içinde yazılan values ismi ile initialValue içindeki statelerin bilgilerine erişirsin
            // onSubmit={(values, actions) => {
            //   register({ ...values, password2: values.password })
            //   actions.resetForm()
            //   actions.setSubmitting(false)
            // }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/login">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>

      </Grid>
    </Container>

  )
}
