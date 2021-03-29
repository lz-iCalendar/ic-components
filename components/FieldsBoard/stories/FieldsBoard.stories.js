import 'antd/dist/antd.css';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import FieldsBoard from '../FieldsBoard';
import { TypeValue } from '../type';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';
import '../../HeaderFooterFixedLayout/style/index.less';

class FieldsBoardDemo extends React.Component {
  state = {
    fields: [
      {
        id: 1,
        type: TypeValue.SingleChoice,
        name: '姓名',
        isMust: true,
      },
      {
        id: 2,
        type: TypeValue.SingleChoice,
        name: '年龄',
        isMust: true,
      },
      {
        id: 3,
        type: TypeValue.SingleChoice,
        name: '性别',
        isMust: true,
      },
    ],
    values: [
      {
        id: 1,
        type: TypeValue.SingleChoice,
        name: '姓名',
        isMust: true,
      },
      {
        id: 2,
        type: TypeValue.SingleChoice,
        name: '年龄',
        isMust: true,
      },
    ],
  };

  handleChange = fields => {
    this.setState({ values: fields });
  };

  render() {
    const { fields, values } = this.state;
    return (
      <div className="fields-board-stories">
        <FieldsBoard
          fields={fields}
          values={values}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

storiesOf('FieldsBoard 字段面板', module)
  .add('PC', () => <FieldsBoardDemo />, {
    notes: {
      markdown: docs,
    },
  })
  .add('Mobile', () => <FieldsBoardDemo />, {
    notes: {
      markdown: docs,
    },
    viewport: { defaultViewport: 'iphone5' },
  });
