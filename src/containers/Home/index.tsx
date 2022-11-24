import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { studentActions } from 'src/redux/slices';
import { Table } from 'antd';
import { Student } from 'src/types';
import type { ColumnsType } from 'antd/es/table';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { Formik, Form } from 'formik';
import { Button } from '@material-tailwind/react';
import FormGroup from 'src/components/FormGroup';
import { Col, Row } from 'antd';
import { onConfirm } from 'react-confirm-pro';
import Add from './Add';
import Update from './Update';

function Home() {
  const dispatch = useAppDispatch();
  const request = useAppSelector((state) => state.student.getList.request);
  const loading = useAppSelector((state) => state.student.getList.loading);
  const list = useAppSelector((state) => state.student.list);
  const student = useAppSelector((state) => state.student.detail);
  const [add, setAdd] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    dispatch(studentActions.getListStart(request));
  }, [dispatch, request]);

  const handleDelete = (id: string) => {
    onConfirm({
      title: (
        <h3 className="font-[600] text-[18px] mb-[36px]">
          Bạn có chắc chắn muốn xóa ?
        </h3>
      ),
      type: 'dark',
      btnCancel: 'Hủy',
      btnSubmit: 'Xóa',
      onSubmit() {
        dispatch(studentActions.deleteStart(id));
      },
    });
  };

  const handleUpdate = (id: string) => {
    dispatch(studentActions.getDetailStart(id));
    setUpdate(true);
  };

  const columns: ColumnsType<Student> = [
    {
      title: 'Id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      align: 'center',
    },
    {
      title: 'Số điểm',
      dataIndex: 'score',
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      align: 'center',
    },
    {
      title: 'Ngày nhập học',
      dataIndex: 'enroll_date',
      align: 'center',
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (value, item) => {
        return (
          <div className="flex item-center justify-center">
            <button
              onClick={() => handleUpdate(item.id)}
              className="mx-[6px]"
              title="Sửa"
            >
              <FiEdit fontSize={16} />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="mx-[6px]"
              title="Xóa"
            >
              <BsTrash fontSize={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const onSubmit = (values) => {
    dispatch(
      studentActions.changeListRequest({
        ...request,
        paginate: {
          ...request.paginate,
          page: 1,
        },
        filter: values,
      }),
    );
  };

  return (
    <div className="grow flex flex-col">
      <div className="my-[24px] text-[21px] text-[#6e6b7b] font-[500]">
        Học sinh
      </div>
      <Formik initialValues={request.filter} onSubmit={onSubmit}>
        {() => {
          return (
            <Form
              style={{
                boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
              }}
              className="mb-[16px] bg-[#fff] px-[21px] py-[21px] rounded-[8px]"
              noValidate
            >
              <Row gutter={[36, 12]}>
                <Col span={24} sm={6}>
                  <FormGroup
                    name="fullname"
                    label="Họ và tên:"
                    input={{
                      type: 'text',
                    }}
                  />
                </Col>
                <Col span={24} sm={6}>
                  <FormGroup
                    name="email"
                    label="Email:"
                    input={{
                      type: 'email',
                    }}
                  />
                </Col>
                <Col span={24} sm={6}>
                  <FormGroup
                    name="phone_number"
                    label="Số điện thoại:"
                    input={{
                      type: 'tel',
                    }}
                  />
                </Col>
                <Col span={24} sm={6} className="flex items-end justify-center">
                  <Button
                    disabled={loading}
                    type="submit"
                    ripple={true}
                    size="md"
                    className="whitespace-nowrap flex items-center justify-center bg-[#7367f0]"
                  >
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
      <div className="flex items-center justify-end mt-[36px] mb-[18px]">
        <Add open={add} onClose={() => setAdd(false)} />
        {student && (
          <Update
            student={student}
            open={update}
            onClose={() => setUpdate(false)}
            onSuccess={() => setUpdate(false)}
          />
        )}
        <Button
          disabled={add}
          onClick={() => setAdd(true)}
          type="button"
          ripple={true}
          size="md"
          className="flex items-center justify-center bg-[#7367f0]"
        >
          Thêm
        </Button>
      </div>
      <Table
        className="grow pb-[24px]"
        pagination={{
          total: list?.meta.total,
          current: list?.meta.page,
          pageSize: request.paginate.limit,
          onChange(page: number) {
            dispatch(
              studentActions.changeListRequest({
                ...request,
                paginate: {
                  ...request.paginate,
                  page,
                },
              }),
            );
          },
        }}
        rowKey="id"
        dataSource={list?.data}
        columns={columns}
        scroll={{
          x: '400',
        }}
      />
    </div>
  );
}

export default Home;
