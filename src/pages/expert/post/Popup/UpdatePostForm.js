import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  postTitle: Yup.string().required('Post Title is required'),
  postContent: Yup.string().required('Post Content is required'),
  type: Yup.string().required('Type is required'),
  postImage: Yup.string().required('Post Image is required'),
  // Add more validation as needed
});

const UpdatePostForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="postTitle">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Post Title"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ''}
                fullWidth
                style={{ marginBottom: '10px' }} 
              />
            )}
          </Field>
          <Field name="postContent">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Post Content"
                multiline
                rows={4}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ''}
                fullWidth
                style={{ marginBottom: '10px' }} 
              />
            )}
          </Field>
          <Field name="type">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Type"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ''}
                fullWidth
                style={{ marginBottom: '10px' }} 
              />
            )}
          </Field>
          <Field name="postImage">
            {({ field, form, meta }) => (
              <>
                <input
                  multiple
                  type="file"
                  id="postImage"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.currentTarget.files[0])
                  }
                  style={{ margin: '8px 0', marginBottom: '10px' }} 
                />
                {meta.touched && meta.error && (
                  <div style={{ color: 'red', marginBottom: '10px' }}>
                    {meta.error}
                  </div>
                )}
                {initialValues.postImage && (
                  <Box style={{ marginTop: '8px', marginBottom: '10px' }}>
                    <img
                      style={{ width: '10vw', height: '15vh', objectFit: 'cover' }}
                      src={initialValues.postImage}
                      alt="Existing Post Image"
                    />
                  </Box>
                )}
              </>
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            style={{ marginTop: '16px', alignItems: "flex-start" }}
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePostForm;
