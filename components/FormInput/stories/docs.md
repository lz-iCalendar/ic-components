# FormInput

表单输入组件，根据传入的表单的字段，生成一个表单，提供给用户输入。

## Example

```javascript
<FormInput fields={fields} onSave={this.handleSave} />
```

## props

|     属性      |                            类型                             | 默认值 |                        描述                        |
| :-----------: | :---------------------------------------------------------: | :----: | :------------------------------------------------: |
|    fields     |                          `Field[]`                          |  `[]`  |                    表单所有字段                    |
| onSelectImage | `(file: any, uploadSuccess: (url: string) => void) => void` |  `-`   | 选择图片时的回调。其中第二个参数为上传成功后的回调 |
|    onSave     |                 `(values: Values) => void`                  |  `-`   |                点击保存按钮时的回调                |
