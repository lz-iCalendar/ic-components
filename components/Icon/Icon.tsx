import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AntdIcon from '@ant-design/icons-react';
import * as icons from 'ic-icons';

Object.keys(icons).forEach(key => {
  AntdIcon.add(icons[key]);
});

export default class Icon extends React.Component<any, any> {
  static propTypes = {
    /**
     * 字体图标类型
     * 必填：是
     * 默认：-
     */
    type: PropTypes.string,
    /**
     * 字体图标大小
     * 必填：否
     */
    size: PropTypes.number,
  };

  static defaultProps = {};

  render() {
    const { type, size, className, ...restProps } = this.props;

    const classes = classNames('ic-icon', className);

    const iconType = `${type}-o`;

    let style = {};
    if (size) {
      style = {
        fontSize: size,
      };
    }

    return <AntdIcon type={iconType} className={classes} style={style} {...restProps} />;
  }
}
