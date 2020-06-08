<template>
  <div class="left-nav">
    <div class="left-nav-image-box">
      <div v-if="query.type=='yqsj'" class="left-nav-imgdiv"
        :style="{color: colors[Math.floor(Math.random()*5)]}"
      >{{ data.name.split('')[0] }}</div>
      <img v-else :src="data.logo" class="left-nav-image" alt="logo"/>
    </div>
    <div class="left-nav-title">{{ this.data.name }}</div>
    <ul>
      <li
        v-for="item in tabs"
        :class="{'li-active': item.active}"
        @click="onclick(item)">
        <img :src="item.img"/>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from '../mixins'
import api from '@/api'

export default {
  mixins: [mixin],
  name: 'leftNav',
  props: {
    tabs: {
      type: Array,
      default: () => {
        return [
          {
            title: '综合分析',
            img: require('../assets/zhfx.svg'),
            rname: 'zhfx',
            active: false
          },
          {
            title: '诉求类别',
            img: require('../assets/诉求类别.svg'),
            rname: 'sqlb',
            active: false,
          },
          {
            title: '诉求处理',
            img: require('../assets/sqcl.svg'),
            rname: 'sqcl',
            active: false
          },
          {
            title: '人群画像',
            img: require('../assets/rqhx.svg'),
            rname: 'rqhx',
            active: false
          },
        ]
      }
    },
  },
  data () {
    return {
      msg: 'leftNav',
      colors: ['#FECD76', '#3FCE05', '#E062AE', '#55DDE1', '#FF9E7F'],
      data: {
        name: 'defaultName',
        logo: require('../assets/police.png')
      }
    }
  },
  created () {
    this.active = this.m_getLeftNavIndex();
    this.tabs[this.active].active = true;
    if(this.query.type == 'yqsj'){
      this._getEventInfo(this.params.eventId);
    }else{
      this._getDepartInfo(this.params.departId);
    }
  },
  methods: {
    _getDepartInfo (id) {
      api.get_depart_info({ departId: id }).then(res => {
        log.debug('get_depart_info', res);
        this.data = res.data;
        this.data.name = res.data.departname;
      });
    },
    _getEventInfo (id) {
      api.get_hotevent_detail({ eventId: id }).then(res => {
        log.debug('get_hotevent_detail', res);
        this.data = res.data;
        this.data.name = res.data.content;
      });
    },
    onclick (item) {
      this.tabs.map((e,i) => {
        e.active = e.rname == item.rname ? true : false
      });
      this.$emit('click', item);
    }
  },
  watch: {
    '$route' (to, from) {
      let index = this.m_getLeftNavIndex(to.name);
      this.tabs.map((e, i) => {
        e.active = i == index ? true : false
      });
    },
    'params' (to, from) {
      if(JSON.stringify(to) === JSON.stringify(from)) return;
      if(this.query.type == 'yqsj'){
        this._getEventInfo(this.params.eventId);
      }else{
        this._getDepartInfo(this.params.departId);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .left-nav{
    width: 15%;
    margin-left: calc(1.5% - 5px);
    float: left;
    height: 100%;
    background-color: rgba(99,123,190,0.1);
  }
  .left-nav-image-box{
    // display: block;
    width: 90px;
    height: 90px;
    margin: 75px auto 15px;
  }
  .left-nav-image{
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #fff;
  }
  .left-nav-imgdiv{
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #55dde133;
    line-height: 90px;
    color: #FECD76;
    text-align: center;
    font-size: 28px
  }
  .left-nav-title{
    width: 100%;
    height: 22px;
    line-height: 22px;
    text-align: center;
    padding: 0 35px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0.2px;
  }
  .left-nav>ul{
    list-style: none;
    margin-top: 90px;
  }
  .left-nav>ul>li{
    width: 100%;
    height: 64px;
    line-height: 64px;
    margin: 0 auto;
    cursor: pointer;
    text-align: center;
  }
  .left-nav>ul>li>img{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
  .left-nav>ul>li>span{
    display: inline-block;
    width: 60px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #B5C5E0;
    letter-spacing: 0.18px;
    margin-top: 22px;
  }
  .li-active{
    background-color: #121d55 !important;
  }
</style>
