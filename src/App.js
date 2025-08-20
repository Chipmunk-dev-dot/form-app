import logo from "./logo.svg";
import React, { useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Input,
  Snackbar,
  Typography,
} from "@mui/material";
import { boolean, date, number, object, string } from "yup";
import TextFieldW from "./Components/FormsUI/Textfield/TextField";
import Selector from "./Components/FormsUI/Select/Selector";
import DataTimePicker from "./Components/FormsUI/DataTimePicker/DataTimePicker";
import countries from "./data/countries.json";
import CheckboxWrapper from "./Components/FormsUI/Checkbox/CheckboxWrapper";
import ButtonWrapper from "./Components/FormsUI/Button/ButtonWrapper";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import bgImg from '../src/Images/Airliner (1920x1080).jpg';
import axios from "axios";

const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  arrivalDate: "",
  departureDate: "",
  message: "",
  termsOfService: false,
};

//FORM VALIDATION SCHEMA
const FORM_VALIDATION = object().shape({
  first_name: string().required("First name is Required"),
  last_name: string().required("Last name is Required"),
  email: string().email("Invalid email.").required("Email is Required"),
  phone: number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Phone number is Required"),
  addressLine1: string().required("Required"),
  addressLine2: string().required("Required"),
  city: string().required("Required"),
  state: string().required("Required"),
  country: string().required("Required"),
  arrivalDate: date().required("Arrival date is Required"),
  departureDate: date().required("Departure date is Required"),
  message: string(),
  termsOfService: boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
});

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["sub_form"],
    queryFn: () => axios("http://localhost:5000/api/v1/sub_form"),
  });

  const postData = useMutation({
    mutationFn: (values) => {
      return axios.post("http://localhost:5000/api/v1/sub_form", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(data);
    },
  });

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100vh",
        padding: 20,
        backgroundImage: `url("${bgImg}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      
    >
      <AppBar sx={{ padding: 2,alignItems:"center", backgroundColor:"black" , opacity: 0.7}}>
        <Typography variant="h4">BOOKING FORM <FlightTakeoffIcon fontSize="large" color="inherit"/></Typography>
      </AppBar>
      <Box sx={{p:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Card sx={{p:5, backgroundColor: 'black', opacity: 0.85, color: 'white'}}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            postData.mutate(values);

            console.log(values);
            handleClick();
          }}
        >
          <Form>
            <Container>
              <Grid container spacing={2}>
                <Grid size={12}  sx={{display: "flex", alignItems:"center",padding: 1}}>
                  < PersonSharpIcon fontSize="large" sx={{mr:2}}/>
                  <Typography variant="h5">Your details </Typography>
                </Grid>
                <Grid size={6}>
                  <TextFieldW  name="first_name" label={"First Name"} />
                </Grid>
                <Grid size={6}>
                  <TextFieldW name="last_name" label={"Last Name"} />
                </Grid>

                <Grid size={12}>
                  <TextFieldW name="email" label={"Email"} />
                </Grid>

                <Grid size={12}>
                  <TextFieldW name="phone" label={"Phone Number"} />
                </Grid>

                <Grid size={12} sx={{display:"flex", alignItems:"center", paddingTop:3}}>
                  <HomeSharpIcon fontSize="large" sx={{mr:2}}/>
                  <Typography variant="h5"> Address </Typography>
                </Grid>

                <Grid size={12}>
                  <TextFieldW name="addressLine1" label={"Address Line 1"} />
                </Grid>

                <Grid size={12}>
                  <TextFieldW name="addressLine2" label={"Address Line 2"} />
                </Grid>

                <Grid size={6}>
                  <TextFieldW name="city" label={"City"} />
                </Grid>
                <Grid size={6}>
                  <TextFieldW name="state" label={"State"} />
                </Grid>

                <Grid size={12}>
                  <Selector
                    name="country"
                    label="Country"
                    options={countries}
                  />
                </Grid>

                <Grid size={12} sx={{display:"flex", alignItems:"center", paddingTop:3}}>
                  <CalendarMonthSharpIcon fontSize="large" sx={{mr: 2}} />
                  <Typography variant="h5"> Booking information</Typography>
                </Grid>

                <Grid size={6}>
                  <DataTimePicker name="arrivalDate" label={"Arrival Date"} />
                </Grid>
                <Grid size={6}>
                  <DataTimePicker
                    name="departureDate"
                    label={"Departure Date"}
                  />
                </Grid>

                <Grid size={12}>
                  <TextFieldW
                  
                    name="message"
                    label="Message"
                    multiline={true}
                    rows={4}
                    
                  />
                </Grid>

                <Grid size={12}>
                  <CheckboxWrapper
                    name="termsOfService"
                    legend={"Terms Of Service"}
                    label="I agree"
                    
                    
                  />
                </Grid>

                <ButtonWrapper postData={postData}>Submit Form</ButtonWrapper>

                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    Submitted successfull!!!!
                  </Alert>
                </Snackbar>
              </Grid>
            </Container>
          </Form>
        </Formik>
        </Card>
      </Box>
    </Box>
  );
}

export default App;
