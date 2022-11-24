import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetListStudentRequest, Student } from 'src/types';

export interface CreateStudent {
  student: Partial<Student>;
  onSuccess: () => void;
}

export interface UpdateStudent {
  student: Partial<Student>;
  onSuccess: () => void;
}

export interface ListStudent {
  meta: {
    total: number;
    page: number;
  };
  data: Student[];
}

interface StudentState {
  getList: {
    loading: boolean;
    error: string;
    request: GetListStudentRequest;
  };
  list: ListStudent | null;
  getDetail: {
    loading: boolean;
    error: string;
  };
  detail: Student | null;
  create: {
    loading: boolean;
    error: string;
  };
  update: {
    loading: boolean;
    error: string;
  };
  delete: {
    loading: boolean;
    error: string;
  };
}

const initialState: StudentState = {
  getList: {
    loading: false,
    error: '',
    request: {
      filter: {
        fullname: '',
        email: '',
        phone_number: '',
      },
      order: {
        by: 'created_at',
        direction: 'DESC',
      },
      paginate: {
        limit: 10,
        page: 1,
      },
    },
  },
  list: null,
  getDetail: {
    loading: false,
    error: '',
  },
  detail: null,
  create: {
    loading: false,
    error: '',
  },
  update: {
    loading: false,
    error: '',
  },
  delete: {
    loading: false,
    error: '',
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getListStart(state, action: PayloadAction<GetListStudentRequest>) {
      state.getList = {
        ...state.getList,
        loading: true,
        error: '',
      };
      state.list = null;
    },
    getListSuccess(state, action: PayloadAction<ListStudent>) {
      state.getList = {
        ...state.getList,
        loading: false,
        error: '',
      };
      state.list = action.payload;
    },
    getListFailed(state, action: PayloadAction<string>) {
      state.getList = {
        ...state.getList,
        loading: false,
        error: action.payload,
      };
      state.list = null;
    },
    changeListRequest(state, action: PayloadAction<GetListStudentRequest>) {
      state.getList = {
        ...state.getList,
        request: action.payload,
      };
    },
    getDetailStart(state, action: PayloadAction<string>) {
      state.getDetail = {
        loading: true,
        error: '',
      };
      state.detail = null;
    },
    getDetailSuccess(state, action: PayloadAction<Student>) {
      state.getDetail = {
        loading: false,
        error: '',
      };
      state.detail = action.payload;
    },
    getDetailFailed(state, action: PayloadAction<string>) {
      state.getDetail = {
        loading: false,
        error: action.payload,
      };
      state.detail = null;
    },
    createStart(state, action: PayloadAction<CreateStudent>) {
      state.create = {
        loading: true,
        error: '',
      };
    },
    createSuccess(state) {
      state.create = {
        loading: false,
        error: '',
      };
    },
    createFailed(state, action: PayloadAction<string>) {
      state.create = {
        loading: false,
        error: action.payload,
      };
    },
    updateStart(state, action: PayloadAction<UpdateStudent>) {
      state.update = {
        loading: true,
        error: '',
      };
    },
    updateSuccess(state) {
      state.update = {
        loading: false,
        error: '',
      };
    },
    updateFailed(state, action: PayloadAction<string>) {
      state.update = {
        loading: false,
        error: action.payload,
      };
    },
    deleteStart(state, action: PayloadAction<string>) {
      state.delete = {
        loading: true,
        error: '',
      };
    },
    deleteSuccess(state) {
      state.delete = {
        loading: false,
        error: '',
      };
    },
    deleteFailed(state, action: PayloadAction<string>) {
      state.delete = {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const studentReducer = studentSlice.reducer;
export const studentActions = studentSlice.actions;
