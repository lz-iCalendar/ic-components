import React from 'react';
import classNames from 'classnames';

const IcDecorator = ({ children, info, style, className }) => {
  const classes = classNames('ic-demo-wrapper__content', className);
  return (
    <div
      className="ic-demo-wrapper"
      style={{ display: 'inline-block', padding: 24, border: '1px solid #eee', margin: 16, borderRadius: 8 }}
    >
      <div className={classes} style={{ marginBottom: 16, ...style }}>
        {children}
      </div>
      <div className="ic-demo-wrapper__info" style={{ borderTop: '1px solid #eee', paddingTop: 24 }}>
        <div>{info}</div>
      </div>
    </div>
  );
};

export default IcDecorator;
