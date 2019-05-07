import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

const IcDecorator = storyFn => {
  const childrenString = reactElementToJSXString(storyFn());
  return (
    <div
      className="ic-demo-wrapper"
      style={{ display: 'inline-block', padding: 24, border: '1px solid #eee', margin: 16, borderRadius: 8 }}
    >
      <div className="ic-demo-wrapper__content" style={{ margin: 16 }}>
        {storyFn()}
      </div>
      <div className="ic-demo-wrapper__code" style={{ borderTop: '1px solid #eee', paddingTop: 24 }}>
        <div>{childrenString}</div>
      </div>
    </div>
  );
};
export default IcDecorator;
