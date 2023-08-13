import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import { DisplayFormikState } from './formikHelper';

function Contact(_prop) {
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setSubmitionCompleted(false);
    setOpen(true);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Contact us!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {!isSubmitionCompleted && (
          <>
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>Send us a comment!</DialogContentText>
              <Formik
                initialValues={{ email: '', name: '', comment: '' }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email().required('Required'),
                  names: Yup.string().required('Required'),
                  comment: Yup.string().required('Required'),
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
                        helperText={
                          errors.names && touched.names && errors.names
                        }
                        margin="normal"
                      />

                      <TextField
                        error={errors.email && touched.email}
                        label="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                        margin="normal"
                      />

                      <TextField
                        label="comment"
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.comment && touched.comment && errors.comment
                        }
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
                        <Button type="submit">Submit</Button>
                      </DialogActions>
                    </form>
                  );
                }}
              </Formik>
            </DialogContent>
          </>
        )}
        {isSubmitionCompleted && (
          <>
            <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
            <DialogContent>
              <DialogContentText>Thanks</DialogContentText>
              <DialogActions>
                <Button type="button" className="outline" onClick={handleClose}>
                  Back to app
                </Button>
              </DialogActions>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

export default Contact;
