import React from 'react';
// import { DatePicker as AntdDatePicker } from 'antd';
import DatePicker  from 'antd/es/date-picker';
const AntdDatePicker = DatePicker;
export default function IcalDatePicker(props) {
  return (
    <div className="ic-date-picker">
      <AntdDatePicker {...props} />
    </div>
  );
}
