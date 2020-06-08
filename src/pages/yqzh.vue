<template>
<div class="yqzh clearfix">
  <left-nav
    :active="0"
    :params="params"
    :query="query"
    :tabs="tabs"
    @click="m_clickLeftNav"
    style="height: 948px;"
  ></left-nav>
  <div class="yqzh-right">  
    <router-view/>
  </div>
</div>
</template>

<script>
import mixin from '../mixins'
import api from '@/api';
import leftNav from '@/components/leftNav'

export default {
  mixins: [mixin],
  name: 'yqzh',
  components: {
    leftNav,
  },
  data () {   
    return {
      msg: 'yqzh',
      tabs: [
        {
          title: '综合分析',
          img: require('../assets/zhfx.svg'),
          rname: 'yqzhfx',
          active: false
        },
        {
          title: '发展趋势',
          img: require('../assets/sqcl.svg'),
          rname: 'yqfzqs',
          active: false
        },
        {
          title: '热点来源',
          img: require('../assets/rqhx.svg'),
          rname: 'yqrdly',
          active: false
        },
        {
          title: '人群画像',
          img: require('../assets/zhfx.svg'),
          rname: 'yqrwhx',
          active: false
        },
      ]
    }
  },
  created () {
    // vue实例创建完毕, 获取数据
  },
  mounted () {
    // dom挂载完毕
    this.$nextTick(() => {
      // do something
    });
  },
  methods: {
    //获取列表数据
    _get_hotliblist(){
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.yqzh{
 width: 100%;
 height: 100%;
}
.yqzh-right{
 width: 83%;
 height: 100%;
 float: left;
}
</style>
