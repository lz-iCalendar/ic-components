import React from 'react';

const IcDecorator = ({ children, info }) => {
  return (
    <div>
      <div
        className="ic-demo-wrapper"
        style={{ display: 'inline-block', padding: 24, border: '1px solid #eee', margin: 16, borderRadius: 8 }}
      >
        <div className="ic-demo-wrapper__content" style={{ margin: 16 }}>
          {children}
        </div>
        <div className="ic-demo-wrapper__code" style={{ borderTop: '1px solid #eee', paddingTop: 24 }}>
          <div>{info}</div>
        </div>
      </div>
    </div>
  );
};

export default IcDecorator;
