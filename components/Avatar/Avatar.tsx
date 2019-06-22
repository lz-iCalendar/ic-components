import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Avatar extends React.Component<any, any> {
  static propTypes = {
    /**
     * 头像尺寸（单位：px）
     * 默认：46
     */
    size: PropTypes.number,

    /**
     * 头像地址
     * 默认：-
     */
    src: PropTypes.string,

    /**
     * 图像无法显示时的替代文本
     * 默认：'img'
     */
    alt: PropTypes.string,
  };

  static defaultProps = {
    size: 46,
    alt: 'img',
  };

  render() {
    const { size, src, alt } = this.props;

    const style = { width: size, height: size, ...this.props.style };

    return (
      <div className="ic-avatar" style={style}>
        <img src={src} alt={alt} className="ic-avatar__img" style={style} />
      </div>
    );
  }
}
