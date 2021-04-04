# FieldsBoard

字段面板组件。（对表单字段的管理）

## Example

```javascript
<FieldsBoard
  fields={fields}
  values={values}
  onChange={this.handleChange}
  onAddField={this.handleAddFiled}
/>
```

## props

|    属性    |                类型                 | 默认值 |           描述           |
| :--------: | :---------------------------------: | :----: | :----------------------: |
|   fields   |              `Field[]`              |  `[]`  |        所有的字段        |
|   values   |              `Field[]`              |  `[]`  |        选中的字段        |
|  onChange  | `(selectedFields: Field[]) => void` |  `-`   | 选中字段发生改变时的回调 |
| onAddField | `(field: OnAddFieldParam) => void`  |  `-`   |      添加字段的回调      |
