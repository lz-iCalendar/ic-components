import React from 'react';

const IcDecorator = ({ children, info, style }) => {
  return (
    <div
      className="ic-demo-wrapper"
      style={{ display: 'inline-block', padding: 24, border: '1px solid #eee', margin: 16, borderRadius: 8 }}
    >
      <div className="ic-demo-wrapper__content" style={{ marginBottom: 16, ...style }}>
        {children}
      </div>
      <div className="ic-demo-wrapper__info" style={{ borderTop: '1px solid #eee', paddingTop: 24 }}>
        <div>{info}</div>
      </div>
    </div>
  );
};

export default IcDecorator;
