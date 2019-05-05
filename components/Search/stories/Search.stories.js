import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Search from '../';
import docs from './docs.md';

import '../style/index.less';
import './style.less';

class SearchTest extends React.Component {
  state = {
    value: 'hello input',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Search
        className="search__test"
        placeholder="输入框"
        value={value}
        onChange={this.handleChange}
        onSearch={action('onSearch')}
      />
    );
  }
}

storiesOf('Search 搜索框', module).add('搜索框', () => <SearchTest />, {
  notes: { markdown: docs },
});
