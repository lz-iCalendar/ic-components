# Checkbox

## Example

```javascript
<Checkbox checked={checked} onChange={this.handleChange}>
  Checkbox
</Checkbox>
```

## props

|      属性      |     类型      | 默认值  |                         描述                          |
| :------------: | :-----------: | :-----: | :---------------------------------------------------: |
|    checked     |   `boolean`   |    -    |                       是否选中                        |
|    onChange    | `Function(e)` |    -    |                     变化时的回调                      |
| labelPlacement |   `string`    | `right` | label 相对于 checkbox 所处的位置，可选 `left` `right` |
