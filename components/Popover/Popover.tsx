import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';

export interface PopoverProps {
  content?: React.ReactNode;
  trigger?: 'hover' | 'focus' | 'click';
  getPopupContainer: () => HTMLElement;
}

// Trigger 组件 popupPlacement prop map
// points 属性说明：第一个字符串为 source node（悬浮窗节点） 的配置；第二个字符串为 target node（触发悬浮窗显示隐藏的节点） 的配置；
// 两个字符的字符串说明：第一个字符表示 y 轴位置；第二个字符表示 x 轴位置（https://github.com/yiminghe/dom-align#alignconfig-object-details）
const popupPlacementMap = {
  top: {
    points: ['bc', 'tc'],
    offset: [0, -4],
  },
  right: {
    points: ['cl', 'cr'],
    offset: [4, 0],
  },
  bottom: {
    points: ['tc', 'bc'],
    offset: [0, 4],
  },
  left: {
    points: ['cr', 'cl'],
    offset: [-4, 0],
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
  },
  leftTop: {
    points: ['tr', 'tl'],
    offset: [-4, 0],
  },
  leftBottom: {
    points: ['br', 'bl'],
    offset: [-4, 0],
  },
  rightTop: {
    points: ['tl', 'tr'],
    offset: [4, 0],
  },
  rightBottom: {
    points: ['bl', 'br'],
    offset: [4, 0],
  },
};

export default class Popover extends React.Component<PopoverProps & any, any> {
  static propTypes = {
    /**
     * 气泡卡片的内容
     * 默认：-
     */
    content: PropTypes.node,

    /**
     * 触发行为
     * 默认：'hover'
     */
    trigger: PropTypes.oneOfType([PropTypes.oneOf(['hover', 'focus', 'click']), PropTypes.array]),

    /**
     * 菜单渲染的父节点
     * 默认：() => document.body
     */
    getPopupContainer: PropTypes.func,

    /**
     * 气泡卡片位置
     * 默认：'bottomLeft'
     */
    placement: PropTypes.oneOf([
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ]),
  };

  static defaultProps = {
    trigger: 'hover',
    getPopupContainer: () => document.body,
    placement: 'bottomLeft',
  };

  render() {
    const { content, className, children, getPopupContainer, placement, trigger, ...restProps } = this.props;
    const classes = classNames('ic-popover', className);

    const action = typeof trigger === 'string' ? [trigger] : trigger;

    return (
      <Trigger
        popupPlacement={placement}
        action={action}
        builtinPlacements={popupPlacementMap}
        popup={
          <div className={classes} {...restProps}>
            {content}
          </div>
        }
        getPopupContainer={getPopupContainer}
      >
        {children}
      </Trigger>
    );
  }
}
