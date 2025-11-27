import { Controller } from '@/hooks/useController';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/forms/Input';
import TextArea from '../ui/forms/TextArea';
import Modal from '../ui/Modal';
import * as yup from 'yup';
import { useParams } from 'next/navigation';
import { useCreatePost } from '@/services/posts/hooks/useCreatePost';

const validationSchema = yup.object().shape({
  title: yup.string().required('Post title is required'),
  body: yup.string().required('Post body is required'),
});

interface Props {
  controller: Controller;
}

const CreatePostModal = ({ controller }: Props) => {
  const [initialValues] = useState({ title: '', body: '' });

  const { mutate } = useCreatePost(controller);
  const params = useParams<{ 'user-id': string }>();

  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    mutate(
      { ...values, userId: params['user-id'] },
      {
        onSuccess: () => {
          helpers.resetForm();
        },
      }
    );
  };

  return (
    <Modal
      controller={controller}
      title='New Post'
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className='space-y-8'>
          <div className='space-y-6'>
            <Input
              name='title'
              label='Post title'
              placeholder='Give your post a title'
            />
            <TextArea
              name='body'
              label='Post body'
              placeholder='Write something mind-blowing'
            />
          </div>
          <div className='flex justify-end items-center gap-4'>
            <Button
              title='Cancel'
              isOutlined
              onClick={controller.close}
              type='button'
            />
            <Button
              title='Publish'
              isPrimary
              type='submit'
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreatePostModal;
