import React from 'react';
import Input from '../Input';
import omit from 'omit.js';
import classNames from 'classnames';
import Icon from '../Icon';
import PropTypes from 'prop-types';

export default class Search extends React.Component<any, any> {
  static propTypes = {
    /**
     * 按下回车或点击搜索按钮的时候的回调
     * 默认：-
     * 类型：(value, event) => {}
     */
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    disabled: false,
  };

  private inputRef;

  state = {};

  handlePressEnter = e => {
    const { onSearch } = this.props;
    onSearch && onSearch(e.target.value, e);
  };

  handleSearchIconClick = () => {
    const { onSearch } = this.props;
    onSearch && onSearch(this.inputRef.input.value, this.inputRef.input.event);
  };

  render() {
    const searchSuffix = <Icon type="search" className="ic-input-search__icon" onClick={this.handleSearchIconClick} />;
    const restProps = omit(this.props, ['onPressEnter', 'className']);
    const classes = classNames('ic-input-search', this.props.className);
    return (
      <Input
        {...restProps}
        ref={element => (this.inputRef = element)}
        onPressEnter={this.handlePressEnter}
        className={classes}
        type="text"
        suffix={searchSuffix}
      />
    );
  }
}
