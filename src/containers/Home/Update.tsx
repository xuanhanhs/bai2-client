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
import { formatDateTo, formatDateFrom } from 'src/utils';
import { Student } from 'src/types';

interface UpdateProps {
  student: Student;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function Update(props: UpdateProps) {
  const { open, onClose, student, onSuccess } = props;
  const loading = useAppSelector((state) => state.student.update.loading);
  const dispatch = useAppDispatch();

  const { width } = useWindowDimensions();

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
      studentActions.updateStart({
        student: {
          ...values,
          birthday: formatDateTo(values.birthday),
          enroll_date: formatDateTo(values.enroll_date),
        },
        onSuccess: () => {
          resetForm();
          onSuccess();
        },
      }),
    );
  };

  return (
    <Drawer
      title="Sửa"
      width={width >= 480 ? '30%' : '100%'}
      open={open}
      onClose={onClose}
    >
      <Formik
        initialValues={{
          ...student,
          birthday: formatDateFrom(student.birthday),
          enroll_date: formatDateFrom(student.enroll_date),
        }}
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
                    Lưu
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

export default Update;
