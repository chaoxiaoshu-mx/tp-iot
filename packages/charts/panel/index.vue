<template>
  <div class="charts-panel-content">
    <div class="charts-panel-list" v-show="type=='echart'">
      <div class="charts-panel-item" v-for="(option, index) in chartList" :key="'dashboard'+index">
        <e-chart style="width: 300px;height: 300px" :option="option" :data-src="dataSrc" @clickChart="clickChart"></e-chart>
      </div>
    </div>

    <div class="charts-panel-list" v-show="type=='history'">
      <div class="charts-panel-item" v-for="(option, index) in chartList" :key="'history' + index">
        <e-chart style="width: 300px;height: 300px" :option="option" :data-src="dataSrc" @clickChart="clickHistory"></e-chart>
      </div>
    </div>

    <div class="charts-panel-list" v-show="type=='control'">
      <div class="charts-panel-item" v-for="(option, index) in chartList" :key="'control'+index">
        <control v-if="type == 'control'" :size="chartSize" :option="option" @click="clickSwitch"></control>
      </div>
    </div>

    <div class="charts-panel-list" v-show="type=='other'">

    </div>

    <!-- 自定义仪表盘对话框 -->
    <custom-echart-dialog :visible.sync="customDialogVisible" @submit="addChart"></custom-echart-dialog>

  </div>
</template>

<script>
import EChart from "../components/dashboard/EChart"
import Control from "../components/control"
import CustomEchartDialog from "./dashboard/CustomEchartDialog";
import * as echarts from "echarts";
var timer;

export default {
  name: "ChartsPanel",
  components: { EChart, Control, CustomEchartDialog },
  props: {
    type: {
      type: [String],
      default: "echart"
    },
    charts: {
      type: [Object, Array],
      default: () => []
    },
    chartSize: {
      type: [String, Number],
      default: 300
    },
    dataSrc: {
      type: [Array],
      default: () => []
    }
  },
  data() {
    return {
      chartList: [],
      customDialogVisible: false,
      jsonOption: "",
      jsonFunctionArr: ["return +(Math.random() * 60).toFixed(2);"],
      activeName: "",
      leftActive: "option",
      rightActive: "preview",
      myChart: {},
      customInterval: 1,
      customOption: {},
      // 生成随机数据
      randomTabs: [
        { title: "value1", name: "value1", content: "return +(Math.random() * 60).toFixed(2);" }
      ],
      randomTabsValue: "value1",
      // 当前值后缀
      currentValueEnds: "",
      // 当前值在纵轴的位置
      offsetCenterY: 50,
      chartStyle: {
        // 文字
        detail: { color: "#409EFF", fontSize: 18 },
        itemStyle: { color: "#409EFF" },
        // 指针
        pointer: { show: true },
        // 进度条
        progress: { show: true, width: 18 },
        // 轴线
        axisLine: { show: true, roundCap: true, lineStyle: { width: 18} },
        // 标签
        axisLabel: { show: true, color: "#409EFF", fontSize: 18, distance: 18 },
        // 分隔线
        splitLine: { show: true, length: 15 },
        // 刻度
        axisTick: { show: true },
        // 圆心
        anchor: { show: true }

      }
    }
  },
  watch: {
    charts: {
      handler(newValue) {
        this.chartList = JSON.parse(JSON.stringify(newValue));
      },
      immediate: true
    },
    /**
     * 图表样式数据
     */
    chartStyle: {
      handler(newValue) {
        let option = { series: [ {...newValue} ]}

        console.log("====.option:", option);
        this.myChart.setOption(option);
      },
      deep: true
    },
    /**
     * 当前值文本后缀
     */
    currentValueEnds: {
      handler(newValue) {
        let option = { series: [ { detail: { formatter: "{value}" + newValue} } ]}
        this.myChart.setOption(option);
      },
    },
    /**
     * 当前值文本在纵轴的位置
     */
    offsetCenterY: {
      handler(newValue) {
        let option = { series: [ { detail: { offsetCenter: [0, newValue]} } ]}
        this.myChart.setOption(option);
      },
    }
  },
  methods: {
    /**
     * 显示自定义图表对话框
     */
    handleCustom() {
      this.customDialogVisible = true;
    },
    /**
     * 修改了图表配置里的文本域
     * @param value
     */
    jsonOptionInput(value) {
      let str = value += ";\n return option;"
      let fn = new Function(str);
      this.customOption = fn();
      // console.log((typeof value));
      // var f1 = new Function(value);
      // console.log(f1)
      // // let obj = JSON.parse(value);
      // console.log("===jsonOptionInput:", value.option)
      this.initEchartsPreview(this.customOption)
    },
    /**
     * 初始化图标预览
     * @param option
     */
    initEchartsPreview(option) {
      console.log(option)
      this.myChart = echarts.init(this.$refs["chart-preview"]);
      this.$nextTick(function() {
        this.myChart.resize();
      });
      this.myChart.setOption(option);
      this.setRandomData();
    },
    /**
     * 随机数据
     */
    setRandomData() {
      clearInterval(timer);
      let this_ = this;
      timer = setInterval(function() {
        let data = [];
        this_.jsonFunctionArr.forEach(fun => {
          let fn = new Function(fun)
          let value = fn();
          data.push({ value });
        })
        let series = [{ data }];
        console.log(series)
        this_.myChart.setOption({series})
      }, this_.customInterval * 1000)
    },
    customChartSubmit() {
      if (!this.customOption.series) {
        return;
      }
      this.customOption.simulator = {};
      this.customOption.simulator.funcArr = this.jsonFunctionArr;
      // this.customOption.simulator.funcArr.push(this.jsonFunction);
      this.customOption.simulator.interval = this.customInterval * 1000;
      this.chartList.push(this.customOption)
      this.customDialogVisible = false;
    },
    /**
     * 随机数据面板内点击tab
     * @param tab
     */
    tabClick(tab) {
      if (tab.name == "add") {
        // 新增tab
        let len = this.randomTabs.length + 1
        // if (len > 5) {
        //   // tab不能超过5个
        //   return;
        // }
        this.randomTabs.push({ title: "value" + len, name: "value" + len, content: "return +(Math.random() * 60).toFixed(2);" });
        this.getRandomFunction();
      }
    },
    /**
     * 随机数据面板内点击tab后是否允许切换tab
     * @param activeName
     * @returns {boolean}
     */
    beforeLeave(activeName) {
      if (activeName == "add") {
        // 不允许切换到add
        return false;
      }
    },
    /**
     * 删除tab
     * @param targetName
     */
    removeTab(targetName) {
      let tabs = this.randomTabs;
      tabs = tabs.filter(item => item.name != targetName)
      // 按顺序重新命名tab
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].title = "value" + (i +1);
        tabs[i].name = "value" + (i +1);
      }
      this.randomTabs = tabs;
      this.getRandomFunction();
    },
    getRandomFunction() {
      this.jsonFunctionArr = [];
      this.randomTabs.forEach(item => {
        this.jsonFunctionArr.push(item);
      })
    },
    /**
     * 点击图表回调父组件的clickChart函数
     * @param v
     */
    clickChart(v) {
      this.$emit("clickChart", v);
    },
    /**
     * 点击图表回调父组件的clickChart函数
     * @param v
     */
    clickHistory(v) {
      this.$emit("clickHistory", v);
    },
    /**
     * 点击控制组件
     * @param v
     */
    clickSwitch(v) {
      this.$emit("clickSwitch", v);
    },
    /**
     * 自定义图表对话框点击了提交按钮
     * @param data
     */
    addChart(data) {
      this.chartList.push(data);
    }
  }
}
</script>

<style scoped>
div {
  text-align: left;
}
.charts-panel-content {
  padding-top: 10px;
}
.charts-panel-list {
  display: flex;
  flex-flow: wrap;
  width: 1000px;
  height: 600px;
  float: left;
  overflow-y: auto;
  margin: 0 auto;
}


.charts-panel-item {
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 300px;
  height: 300px;
  margin: 6px;
  cursor:pointer;
  text-align: center;
}
.charts-panel-item .custom-card {
  justify-items: center;
  align-content: center;
}

</style>