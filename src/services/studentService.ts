import { GetListStudentRequest, Student } from 'src/types';
import { axiosClient } from './axiosClient';

export class StudentService {
  static getList(request: GetListStudentRequest) {
    return axiosClient.post('/students/get-list-student', request);
  }
  static getDetail(id: string) {
    return axiosClient.get(`/students/get-detail-student?id=${id}`);
  }
  static create(data: Partial<Student>) {
    return axiosClient.post('/students/create-student', data);
  }
  static update(data: Partial<Student>) {
    return axiosClient.patch('/students/update-student', data);
  }
  static delete(id: string) {
    return axiosClient.delete(`/students/delete-student?id=${id}`);
  }
}
