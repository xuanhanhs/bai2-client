import { GetListStudentRequest, Student } from 'src/types';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  studentActions,
  ListStudent,
  CreateStudent,
  UpdateStudent,
} from '../slices';
import { StudentService } from 'src/services';
import { RootState } from '../store';
import { toast } from 'react-toastify';

function* getList(action: PayloadAction<GetListStudentRequest>) {
  try {
    const res: ListStudent = yield call(StudentService.getList, action.payload);
    yield put(studentActions.getListSuccess(res));
  } catch (error) {
    yield put(studentActions.getListFailed((error as any).message));
  }
}

function* getDetail(action: PayloadAction<string>) {
  try {
    const res: Student = yield call(StudentService.getDetail, action.payload);
    yield put(studentActions.getDetailSuccess(res));
  } catch (error) {
    yield put(studentActions.getDetailFailed((error as any).message));
  }
}

function* create(action: PayloadAction<CreateStudent>) {
  try {
    yield call(StudentService.create, action.payload.student);
    yield put(studentActions.createSuccess());
    action.payload.onSuccess();
    const request: GetListStudentRequest = yield select(
      (state: RootState) => state.student.getList.request,
    );
    yield put(studentActions.getListStart(request));
    toast.success(`Thêm thành công`);
  } catch (error) {
    yield put(studentActions.createFailed((error as any).message));
  }
}

function* update(action: PayloadAction<UpdateStudent>) {
  try {
    yield call(StudentService.update, action.payload.student);
    yield put(studentActions.updateSuccess());
    action.payload.onSuccess();
    const request: GetListStudentRequest = yield select(
      (state: RootState) => state.student.getList.request,
    );
    yield put(studentActions.getListStart(request));
    toast.success(`Cập nhật thành công`);
  } catch (error) {
    yield put(studentActions.updateFailed((error as any).message));
  }
}

function* del(action: PayloadAction<string>) {
  try {
    yield call(StudentService.delete, action.payload);
    yield put(studentActions.deleteSuccess());
    const request: GetListStudentRequest = yield select(
      (state: RootState) => state.student.getList.request,
    );
    yield put(studentActions.getListStart(request));
    toast.success(`Xóa thành công`);
  } catch (error) {
    yield put(studentActions.deleteFailed((error as any).message));
  }
}

export function* studentSaga() {
  yield takeLatest(studentActions.getListStart, getList);
  yield takeLatest(studentActions.getDetailStart, getDetail);
  yield takeLatest(studentActions.createStart, create);
  yield takeLatest(studentActions.updateStart, update);
  yield takeLatest(studentActions.deleteStart, del);
}
