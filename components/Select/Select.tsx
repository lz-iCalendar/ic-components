import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'antd';
import Option from './Option';
import Trigger from 'rc-trigger';
// import 'rc-trigger/assets/index.css';

export interface SelectProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  zIndex?: number;
}

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

export default class Select extends React.Component<any, any> {
  static Option = Option;
  static propTypes = {
    /**
     * 选中的值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * 选选项改变时的回调
     */
    onChange: PropTypes.func.isRequired,

    /**
     * 菜单渲染的父节点
     * 默认：() => document.body
     */
    getPopupContainer: PropTypes.func,

    /**
     * 下拉菜单的 css z-index 属性
     * 默认：-
     */
    zIndex: PropTypes.number,
  };

  static defaultProps = {
    getPopupContainer: () => document.body,
  };

  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
    };
  }

  handleSelectClick = () => {
    this.setState({ popupVisible: !this.state.popupVisible });
  };

  handleSelectOption = value => {
    const { onChange } = this.props;
    onChange && onChange(value);
    this.setState({ popupVisible: false });
  };

  handlePopupVisibleChange = visible => {
    this.setState({ popupVisible: visible });
  };

  renderSelectOptions = () => {
    const { children, value } = this.props;
    return React.Children.map(children, (child: any) => {
      const hasSelected = value === child.props.value;
      return React.cloneElement(child, { onClick: () => this.handleSelectOption(child.props.value), hasSelected });
    });
  };

  render() {
    const { style, value, getPopupContainer, zIndex } = this.props;
    const { popupVisible } = this.state;

    const triggerProps: SelectProps = {};

    if (zIndex) {
      triggerProps.zIndex = zIndex;
    }

    return (
      <Trigger
        popupPlacement="bottomLeft"
        action={['click']}
        builtinPlacements={BUILT_IN_PLACEMENTS}
        popup={
          <div className="ic-select__options-wrap" style={{ width: style.width }}>
            {this.renderSelectOptions()}
          </div>
        }
        popupVisible={popupVisible}
        getPopupContainer={getPopupContainer}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        prefixCls="ic-select-dropmenu"
        {...triggerProps}
      >
        <div className="ic-select" style={style} onClick={this.handleSelectClick}>
          <div className="ic-select__rendered">
            <div className="ic-select__selected-value">{value}</div>
            <Icon type="down" size={12} className="ic-select__arraw" />
          </div>
        </div>
      </Trigger>
    );
  }
}
