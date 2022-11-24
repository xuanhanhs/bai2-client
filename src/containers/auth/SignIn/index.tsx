import { Formik, Form } from 'formik';
import FormGroup from 'src/components/FormGroup';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { authActions } from 'src/redux/slices';
import * as Yup from 'yup';
import { Button } from '@material-tailwind/react';

const SignIn = () => {
  const auth = useAppSelector((state) => state.auth);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tài khoản'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const dispatch = useAppDispatch();
  const onSubmit = (values) => {
    dispatch(authActions.signInStart(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form className="w-full px-[16%]">
            <h2 className="font-600 mb-[18px] text-[24px]">
              Quản lý học sinh 👋
            </h2>
            <FormGroup
              className="mb-[8px]"
              name="username"
              label="Tài khoản"
              input={{
                type: 'text',
              }}
            />
            <FormGroup
              className="mb-[16px]"
              name="password"
              label="Mật khẩu"
              input={{
                type: 'password',
              }}
            />
            <Button
              disabled={auth.signIn.loading}
              type="submit"
              ripple={true}
              fullWidth
              size="md"
              className="bg-[#7367f0]"
            >
              Đăng nhập
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignIn;
