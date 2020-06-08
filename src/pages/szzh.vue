<template>
<div class="szzh clearfix">
  <left-nav
    :active="0"
    :params="params"
    :query="query"
    :tabs="tabs"
    @click="m_clickLeftNav"
    style="height: 948px;"
  ></left-nav>
  <div class="szzh-right">  
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
  name: 'szzh',
  components: {
    leftNav,
  },
  data () {
    return {
      msg: 'szzh',
      tabs: [
        {
          title: '综合分析',
          img: require('../assets/zhfx.svg'),
          rname: 'szzhfx',
          active: false
        },
        {
          title: '诉求类别',
          img: require('../assets/诉求类别.svg'),
          rname: 'szsqlb',
          active: false
        },
        {
          title: '诉求处理',
          img: require('../assets/sqcl.svg'),
          rname: 'szsqcl',
          active: false
        },
        {
          title: '人群画像',
          img: require('../assets/rqhx.svg'),
          rname: 'szrqhx',
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
.szzh{
 width: 100%;
 height: 100%;
}
.szzh-right{
 width: 83%;
 height: 100%;
 float: left;
}
</style>
