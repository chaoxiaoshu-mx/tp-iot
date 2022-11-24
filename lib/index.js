import {Table, TableColumn, Button, Row, Col, RadioGroup, RadioButton, Input, Form, FormItem} from 'element-ui'
import {Card, Tabs, TabPane,Dialog, Steps, Step, Cascader, Tooltip, Select, Option, Tag, Checkbox  } from 'element-ui'
import {Switch, ColorPicker, InputNumber, Alert, Transfer, Slider  } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style/dark-theme.scss'

import Editor from "../packages/editor";
import TslEditor from "../packages/tsl/editor"
import CommonControl from "../packages/charts/components/control"
import CommonStatus from "../packages/charts/components/dashboard/status"

const install = Vue => {
    Vue.component(Table.name, Table);
    Vue.component(TableColumn.name, TableColumn);
    Vue.component(Button.name, Button);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(RadioGroup.name, RadioGroup);
    Vue.component(RadioButton.name, RadioButton);
    Vue.component(Input.name, Input);
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Card.name, Card);
    Vue.component(Tabs.name, Tabs);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Dialog.name, Dialog);
    Vue.component(Steps.name, Steps);
    Vue.component(Step.name, Step);
    Vue.component(Cascader.name, Cascader);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Select.name, Select);
    Vue.component(Option.name, Option);
    Vue.component(Tag.name, Tag);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Switch.name, Switch);
    Vue.component(ColorPicker.name, ColorPicker);
    Vue.component(InputNumber.name, InputNumber);
    Vue.component(Alert.name, Alert);
    Vue.component(Transfer.name, Transfer);
    Vue.component(Slider.name, Slider);

    // 在这里注册其他自定义的组件...
    Vue.component(Editor.name, Editor);
    Vue.component(TslEditor.name, TslEditor);
    Vue.component(CommonControl.name, CommonControl);
    Vue.component(CommonStatus.name, CommonStatus);
}

// 防止使用者直接以<script></script>方式引入
if (typeof window.Vue !== 'undefined') {
    install(Vue) // 直接通过script方式引入组件
}
export default {
    install
}