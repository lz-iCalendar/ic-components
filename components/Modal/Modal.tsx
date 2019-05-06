import React from 'react';
import ReactDOM from 'react-dom';
import omit from 'omit.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Animate from 'rc-animate';
import { CSSTransition } from 'react-transition-group';

export default class Modal extends React.Component<any, any> {
  static propTypes = {
    /**
     * 是否显示
     * 默认：false
     */
    visible: PropTypes.bool,

    /**
     * 关闭回调
     * 默认：-
     */
    onClose: PropTypes.func,

    /**
     * 头部内部
     * 默认：-
     */
    header: PropTypes.node,

    /**
     * 模态框宽度
     * 默认：-
     */
    width: PropTypes.number,

    /**
     * 模态框高度
     * 默认：-
     */
    height: PropTypes.number,

    /**
     * 层级
     * 默认：-
     */
    zIndex: PropTypes.number,

    /**
     * 关闭时是否销毁子元素
     * 默认：false
     */
    destroyOnClose: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
    destroyOnClose: false,
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  renderChildren = () => {
    const { visible, destroyOnClose, children } = this.props;
    if (destroyOnClose) {
      return visible && children;
    }
    return children;
  };

  render() {
    const { children, visible, header, width, height, zIndex, ...restProps } = this.props;

    const classes = classNames('ic-modal', {
      'ic-modal--hide': !visible,
    });

    let mainStyle: any = {};
    if (width) {
      mainStyle.width = width;
    }
    if (height) {
      mainStyle.height = height;
    }

    const otherProps = omit(restProps, ['onClose']);

    let style = {};
    if (zIndex) {
      style = {
        zIndex,
      };
    }

    const element = (
      <div className={classes} {...style}>
        <CSSTransition in={visible} timeout={300} classNames="ic-modal__mask">
          <div className="ic-modal__mask" onClick={this.handleClose} />
        </CSSTransition>
        <CSSTransition in={visible} timeout={300} classNames="ic-modal__main">
          <div className="ic-modal__main" style={{ ...mainStyle }}>
            <div className="ic-modal__header">
              <div className="ic-modal__header-content">{header}</div>
              <Icon type="close" className="ic-modal__close" onClick={this.handleClose} />
            </div>
            <div className="ic-modal__body" {...otherProps}>
              {this.renderChildren()}
            </div>
          </div>
        </CSSTransition>
      </div>
    );
    return ReactDOM.createPortal(element, document.body);
  }
}
