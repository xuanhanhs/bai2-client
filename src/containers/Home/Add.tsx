import { Drawer } from 'antd';
import { Formik, Form } from 'formik';
import { Button } from '@material-tailwind/react';
import FormGroup from 'src/components/FormGroup';
import { Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { studentActions } from 'src/redux/slices';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import * as Yup from 'yup';
import {
  FORMAT_DATE_FROM,
  MAX_LENGTH_FULLNAME,
  MAX_SCORE,
  MIN_LENGTH_FULLNAME,
  MIN_SCORE,
  REGEX_PHONE,
} from 'src/constants';
import moment from 'moment';
import { formatDateTo } from 'src/utils';

interface AddProps {
  open: boolean;
  onClose: () => void;
}

function Add(props: AddProps) {
  const { open, onClose } = props;
  const loading = useAppSelector((state) => state.student.create.loading);
  const dispatch = useAppDispatch();

  const { width } = useWindowDimensions();

  const initialValues = {
    fullname: '',
    email: '',
    birthday: '',
    score: '',
    phone_number: '',
    enroll_date: '',
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .trim()
      .min(MIN_LENGTH_FULLNAME, `Tối thiếu ${MIN_LENGTH_FULLNAME} kí tự`)
      .max(MAX_LENGTH_FULLNAME, `Tối đa ${MAX_LENGTH_FULLNAME} kí tự`)
      .required('Vui lòng nhập họ và tên'),
    birthday: Yup.string().required('Vui lòng nhập ngày sinh'),
    email: Yup.string()
      .email('Định dạng email không chính xác')
      .required('Vui lòng nhập email'),
    score: Yup.number()
      .min(MIN_SCORE, `Tối thiếu ${MIN_SCORE} điểm`)
      .max(MAX_SCORE, `Tối đa ${MAX_SCORE} điểm`)
      .required('Vui lòng nhập điểm'),
    phone_number: Yup.string()
      .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    enroll_date: Yup.string().required('Vui lòng nhập ngày nhập học'),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(
      studentActions.createStart({
        student: {
          ...values,
          birthday: formatDateTo(values.birthday),
          enroll_date: formatDateTo(values.enroll_date),
        },
        onSuccess: resetForm,
      }),
    );
  };

  return (
    <Drawer
      title="Thêm"
      width={width >= 480 ? '30%' : '100%'}
      open={open}
      onClose={onClose}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <FormGroup
                    name="fullname"
                    label="Họ và tên"
                    input={{
                      type: 'text',
                    }}
                  />
                </Col>
                <Col span={24}>
                  <FormGroup
                    name="birthday"
                    label="Ngày sinh"
                    input={{
                      type: 'date',
                      max: moment().format(FORMAT_DATE_FROM),
                    }}
                  />
                </Col>
                <Col span={24}>
                  <FormGroup
                    name="email"
                    label="Email"
                    input={{
                      type: 'email',
                    }}
                  />
                </Col>
                <Col span={24}>
                  <FormGroup
                    name="phone_number"
                    label="Số điện thoại"
                    input={{
                      type: 'tel',
                    }}
                  />
                </Col>
                <Col span={24}>
                  <FormGroup
                    name="score"
                    label="Số điểm"
                    input={{
                      type: 'number',
                    }}
                  />
                </Col>
                <Col span={24}>
                  <FormGroup
                    name="enroll_date"
                    label="Ngày nhập học"
                    input={{
                      type: 'date',
                      max: moment().format(FORMAT_DATE_FROM),
                    }}
                  />
                </Col>
                <Col span={24}>
                  <Button
                    fullWidth
                    disabled={loading}
                    type="submit"
                    ripple={true}
                    size="md"
                    className="bg-[#7367f0]"
                  >
                    Tạo
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Drawer>
  );
}

export default Add;
