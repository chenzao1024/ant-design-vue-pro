
<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      width="300px"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
        <template v-slot:handle>
            <div class="handle" @click="visible = !visible">
                <a-icon :type="visible ? 'close': 'setting'" />
            </div>
        </template>
        <div>
            <h2>整体风格定制</h2>
            <a-radio-group :value="$route.query.navTheme || 'dark'"  @change="handleSettingChange('navTheme', $event.target.value)">
                <a-radio value="dark">黑色</a-radio>
                <a-radio value="light">白色</a-radio>
            </a-radio-group>
            <h2>导航模式</h2> 
            <a-radio-group :value="$route.query.navLayout || 'left'" @change="e => handleSettingChange('navLayout', e.target.value)">
                <a-radio value="left">左侧</a-radio>
                <a-radio value="top">顶部</a-radio>
            </a-radio-group>
        </div>
    </a-drawer>
  </div>
</template>
<script>
// 抽屉
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
        this.$router.push({query: {...this.$route.query, [type]: value}})
    }
  },
};
</script>

<style scoped>
.handle {
    position: absolute;
    top: 240px;
    right: 300px;
    width: 48px;
    height: 48px;
    background: #1890ff;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    border-radius: 3px 0 0 3px;
}
</style>
