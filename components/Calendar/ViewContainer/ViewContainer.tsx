import React from 'react';

export default class ViewContainer extends React.Component<any, any> {
  ref: any = React.createRef();

  render() {
    const { children, height } = this.props;
    return (
      <div className="ic-view-container" style={{ height }} ref={this.ref}>
        {children}
      </div>
    );
  }
}
