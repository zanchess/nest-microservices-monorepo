import * as dayjs from 'dayjs';

import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function getNow() {
  return dayjs.utc();
}
