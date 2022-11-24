export interface Student {
  id: string;
  fullname: string;
  birthday: string;
  score: number;
  phone_number: string;
  email: string;
  enroll_date: string;
  created_at: string;
  updated_at: string;
}

export interface GetListStudentRequest {
  filter: {
    fullname: string;
    email: string;
    phone_number: string;
  };
  order: {
    by: keyof Student;
    direction: 'ASC' | 'DESC';
  };
  paginate: {
    limit: number;
    page: number;
  };
}
