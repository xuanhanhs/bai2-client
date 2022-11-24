import moment from 'moment';
import { FORMAT_DATE_FROM, FORMAT_DATE_TO } from 'src/constants';

export * from './localStorage';

export const formatDateTo = (value: string) => {
  return moment(value, FORMAT_DATE_FROM).format(FORMAT_DATE_TO);
};

export const formatDateFrom = (value: string) => {
  return moment(value, FORMAT_DATE_TO).format(FORMAT_DATE_FROM);
};
