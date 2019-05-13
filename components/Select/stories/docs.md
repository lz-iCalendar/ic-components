# Select

## Example

```javascript
<Select style={{ width: 120 }} value={value} onChange={this.handleChange}>
  <Option value={1}>1</Option>
  <Option value={2}>2</Option>
  <Option value={3}>3</Option>
</Select>
```

## props

|       属性        |                类型                |       默认值        |            描述             |
| :---------------: | :--------------------------------: | :-----------------: | :-------------------------: |
|       value       |         `string` `number`          |          -          |          选中的值           |
|     onChange      |      `onChange(value): void`       |          -          |        变化时的回调         |
| getPopupContainer | `getPopupContainer(): HTMLElement` | () => document.body |    下拉菜单渲染的父节点     |
|      zIndex       |              `number`              |          -          | 下拉菜单的 css z-index 属性 |
