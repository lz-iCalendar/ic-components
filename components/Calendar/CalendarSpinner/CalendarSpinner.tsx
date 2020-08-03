import React from 'react';
import { Icon } from 'antd';
import { CSSTransition } from 'react-transition-group';

const CalendarSpinner = ({ visible }) => {
  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="ic-calendar-spinner"
      unmountOnExit
    >
      <div className="ic-calendar-spinner">
        <Icon type="loading" className="ic-calendar-spinner__icon" />
      </div>
    </CSSTransition>
  );
};

export default CalendarSpinner;
