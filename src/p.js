import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
// import { DisplayFormikState } from './formikHelper';

const styles = {

};


function Contact(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  
  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false);
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Contact us!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!isSubmitionCompleted &&
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Send us a comment!
              </DialogContentText>
              <Formik
                initialValues={{ email: '', name: '', comment: '' }}

                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email()
                    .required('Required'),
                  names: Yup.string()
                    .required('Required'),
                  comment: Yup.string()
                    .required('Required'),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <TextField
                      error={errors.names && touched.names}
                        label="name"
                        name="names"
                        value={values.names}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.names && touched.names) && errors.names}
                        margin="normal"
                      />

                      <TextField
                        error={errors.email && touched.email}
                        label="email"
                        name="email"
                        
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.email && touched.email) && errors.email}
                        margin="normal"
                      />

                      <TextField
                        label="comment"
                        name="comment"
                        
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.comment && touched.comment) && errors.comment}
                        margin="normal"
                      />
                      <DialogActions>
                        <Button
                          type="button"
                          className="outline"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </Button>
                        <Button type="submit">
                          Submit
                        </Button>
                        {/* <DisplayFormikState {...props} /> */}
                      </DialogActions>
                    </form>
                  );
                }}
              </Formik>
            </DialogContent>
          </React.Fragment>
        }
        {isSubmitionCompleted &&
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Thanks
              </DialogContentText>
              <DialogActions>
                <Button
                  type="button"
                  className="outline"
                  onClick={handleClose}
                >
                  Back to app
                  </Button>
                {/* <DisplayFormikState {...props} /> */}
              </DialogActions>
            </DialogContent>
          </React.Fragment>}
      </Dialog>
    </React.Fragment >
  );
}

export default Contact;