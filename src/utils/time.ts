import dayjs, {Dayjs} from 'dayjs';

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;
export const now = () => Date.now();

type DateType = Date | string | number | Dayjs | null;
export const dateFormat = (
  date: DateType = null,
  format: string = 'YYYY-MM-DD',
) => {
  if (!date) {
    date = dayjs();
  }
  return dayjs(date).format(format);
};
