import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';

const validationSchema = Yup.object().shape({
  postTitle: Yup.string().required('Post Title is required'),
  postContent: Yup.string().required('Post Content is required'),
  type: Yup.string().required('Type is required'),
  postImage: Yup.string().required('Post Image is required'),
  // Add more validation as needed
});

const UpdatePostForm = ({ initialValues, onSubmit }) => {
  const [editorValue, setEditorValue] = useState('');
  useEffect(() => {
    setEditorValue(initialValues.postContent || ''); // Set editor value when initialValues change
  }, [initialValues.postContent]);

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
                label="Tiêu đề bài viết"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ''}
                fullWidth
                style={{ marginBottom: '10px' }} 
              />
            )}
          </Field>
          <Field name="postContent">
            {({ field, form }) => (
              <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '8px' }}>Nội dung bài viết</label>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={(value) => {
                    setEditorValue(value);
                    form.setFieldValue('postContent', value);
                  }}
                  onBlur={() => form.setFieldTouched('postContent', true)}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],
                      ['link'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['clean'],
                    ],
                  }}
                />
              </div>
            )}
          </Field>

          <Field name="type">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Loại bài viết"
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
            color="success"
            disabled={isSubmitting}
            style={{ marginTop: '16px', alignItems: "flex-start" }}
          >
            Cập nhật bài viết
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePostForm;
