<!-- 控制组件 -->
<template>
  <div class="switch-container" @click="clickSwitch">
    <div class="switch-list">
      <div class="switch-item" v-for="item in optionData.series" :key="item.id">

        <CommonSwitch v-if="item.type=='switch'" :disabled="optionData.disabled" :value="item.value"
                      @change="v => handleChange(item, v)"></CommonSwitch>

        <SlideSwitch v-if="item.type=='slider'" :disabled="optionData.disabled"
                     :value.sync="item.value" :max="item.mapping.max" :step="item.mapping.step"
                     @change="v => handleChange(item, v)"></SlideSwitch>
      </div>
    </div>

  </div>
</template>

<script>
import CommonSwitch from "./Switch.vue"
import SlideSwitch from "./SlideSwitch.vue"
export default {
  name: "CommonControl",
  components: {
    CommonSwitch, SlideSwitch
  },
  props: {
    option: {
      type: [Object],
      default: () => {return {}}
    }
  },
  data() {
    return {
      optionData: {}
    }
  },
  watch: {
    option: {
      handler(newValue) {
        if (JSON.stringify(newValue) == "{}") return;
        this.optionData = JSON.parse(JSON.stringify(newValue));
        console.log("Control.option", this.optionData)
        // 重新渲染
        // this.$forceUpdate();
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    clickSwitch() {
      this.$emit("click", this.option);
    },
    handleChange(item, value) {
      let index = this.optionData.series.findIndex(v => v.id == item.id);
      let serie = JSON.parse(JSON.stringify(item));
      serie.value = value;
      this.optionData.series.splice(index, 1, serie);
      console.log(JSON.stringify(this.optionData.series))
      this.$emit("change", this.optionData);
    }
  }
}
</script>

<style scoped>
.switch-container {
  width:100%;
  height:100%;
  text-align: center;
  display: table;
}
.switch-list {
  display: table-cell;
  vertical-align: middle;
}
.switch-item {
  /*height: 60px;*/
  /*line-height: 60px;*/
}


</style>