import 'antd/dist/antd.css';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import FieldsBoardData from '../FieldsBoardData';
import { TypeValue } from '../type';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';
import '../../HeaderFooterFixedLayout/style/index.less';

class FieldsBoardDataDemo extends React.Component {
  state = {};

  handleChange = fields => {
    this.setState({ values: fields });
  };

  handleAddField = field => {
    console.log('field:', field);
  };

  handleSelectField = field => {
    this.setState({ values: [...this.state.values, field] });
  };

  handleCancelSelectField = field => {
    const { values } = this.state;
    const newValues = [...values];
    const index = newValues.findIndex(item => item.id === field.id);
    newValues.splice(index, 1);
    this.setState({ values: newValues });
  };

  handleModifyField = (field, isSelected) => {
    console.log({ field, isSelected });
  };

  render() {
    const { fields, values } = this.state;
    return (
      <div className="fields-board-stories">
        <FieldsBoardData />
      </div>
    );
  }
}

storiesOf('FieldsBoardDataDemo 字段面板数据', module).add(
  'FieldsBoardData 字段面板数据',
  () => <FieldsBoardDataDemo />,
  {
    notes: {
      markdown: docs,
    },
  }
);
