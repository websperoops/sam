import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// material
import {
  Stack,
  TextField,
  Backdrop,
  CircularProgress,
  Box,
  MobileStepper,
  Button,
  useTheme,
  Typography,
  useMediaQuery
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// Styles
import classes from "./form.module.css";
import classess from "./Userform.module.css";

// Action
import { visitedUser } from "../store/actions/visitedUser";
import { getEventById } from "../store/actions/events";

const Userform = ({event,...props}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const stepperPosition = useMediaQuery(theme.breakpoints.down('md')) ? 'bottom' : 'static';
  const contentHeight = useMediaQuery(theme.breakpoints.down('md')) ? '60vh' : 'auto';

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const EventSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Name name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone is required"),
    eventId: Yup.string().required("Event Id is required"),
    question: Yup.string().required("Question is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
      eventId: "",
      question: "",
    },
    validationSchema: EventSchema,
    onSubmit: () => {
      dispatch(visitedUser(values));
      props.onsubmitted(values);
    },
  });

  const { savingVisitedUser } = useSelector(
    (state) => state.visitedUserReducer
  );
  const {
    errors,
    values,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    setFieldTouched,
  } = formik;


  useEffect(() => {
    if (id) {
      setFieldValue("eventId", id, false);
    }
  }, [id, setFieldValue]);
  //form steps
  const steps = [
    {
      label: (
        <Typography className={classess.splashLogo}>
          <p className={classess.houseImage}><img src="/img/house.png" /></p>
           <h3>Open House - {event.address}</h3>
        </Typography>
      ),
      content: (
        <div className={classess.fillQuestion}>
          <h3>Hi there, please fill out and submit form.</h3>
          <p>4 Question</p>
        </div>
      ),
    },
    {
      label: (
        <Typography className={classes.inputlabels}>
          Please enter your name.
        </Typography>
      ),
      content: (
        <TextField
          fullWidth
          label="Name"
          {...getFieldProps("name")}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
      ),
    },
    {
      label: (
        <Typography className={classes.inputlabels}>
          Please enter your email.
        </Typography>
      ),
      content: (
        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email address"
          {...getFieldProps("email")}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
      ),
    },
    {
      label: (
        <Typography className={classes.inputlabels}>
          Please enter your phone number.
        </Typography>
      ),
      content: (
        <TextField
          fullWidth
          label="Phone No"
          {...getFieldProps("phoneNo")}
          error={Boolean(touched.phoneNo && errors.phoneNo)}
          helperText={touched.phoneNo && errors.phoneNo}
        />
      ),
    },
    {
      label: (
        <Typography className={classes.inputlabels}>
          How you heard about the open house?
        </Typography>
      ),
      content: (
        <TextField
          fullWidth
          autoComplete="  "
          label="how you heard about the open house"
          {...getFieldProps("question")}
          error={Boolean(touched.question && errors.question)}
          helperText={touched.question && errors.question}
        />
      ),
    },
  ];

  const maxSteps = steps.length;

  const handleNext = async (content) => {
    console.log('content',content)
    setFieldTouched(content.props.name, true, true);
    if (errors[content.props.name] || content.props && content.props.value && content.props.value.length === 0 || content.type == "h3") return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  //end steps

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <FormikProvider value={formik}>
      <Form
        className={classes.eventform}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        {/* <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Phone No"
              {...getFieldProps("phoneNo")}
              error={Boolean(touched.phoneNo && errors.phoneNo)}
              helperText={touched.phoneNo && errors.phoneNo}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="  "
              label="how they heard about the open house"
              {...getFieldProps("question")}
              error={Boolean(touched.question && errors.question)}
              helperText={touched.question && errors.question}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps("preapproval")} />}
              label="Pre-approval"
            />
          </Stack>
        </Stack> */}
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ height: contentHeight }}
            >
              <Box sx={{ width: "100%" }}>
                {steps[activeStep].label}
                {steps[activeStep].content}
              </Box>
            </Stack>
          </Stack>
          <MobileStepper
            variant="text"
            className={classes.cmobilestepper}
            steps={maxSteps}
            position={stepperPosition}
            activeStep={activeStep}
            nextButton={
              activeStep === steps.length - 1 ? (
                <LoadingButton
                  type="submit"
                  variant="outlined"
                  loading={savingVisitedUser}
                  className={classes.subbtn}
                >
                  Submit
                </LoadingButton>
              ) : (
                  <Button
                    size="small"
                    onClick={() => handleNext(steps[activeStep].content)}
                    disabled={activeStep === maxSteps - 1}
                    className={(activeStep === maxSteps - 1) ? classes.cbtndisabled : classes.cbtnactive}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                      )}
                  </Button>
                )
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                className={(activeStep === 0) ? classes.cbtndisabled : classes.cbtnactive}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                  )}
                Back
              </Button>
            }
          />
        </Box>
      </Form>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={savingVisitedUser}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </FormikProvider>
  );
};

export default Userform;
