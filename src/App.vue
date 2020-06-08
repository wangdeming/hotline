<template>
  <div id="app" @mousewheel.ctrl.prevent="xxx">
    <div class="header">
      <div class="h-left">
        <div class="left-bg">
          <p class="left-title">
            <span>用户：</span>
            <span style="margin-right:40px;">张三</span>
            <span>市长热线呼叫服务中心</span>
          </p>
        </div>
      </div>
      <div class="h-center">
        <h1>上饶市市长热线大数据分析平台</h1>
      </div>
      <div class="h-right">
        <div class="right-bg">
          <div class="right-title">
            <div class="parallelogram"
            v-for="(item, i) in titles"
            :class="'link-'+i"
            @click="gotoPage(item)">
              <div class="link-name">{{ item.name }}</div>
              <!-- <div :class="{'link-active': s_index == item.to}"></div> -->
              <div :class="{'link-active': m_getPageIndex() == i}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive include="Index">
      <router-view class="app-content"/>
    </keep-alive>
  </div>
</template>

<script>
import mixin from './mixins'

export default {
  mixins: [mixin],
  name: 'App',
  data () {
    return {
      msg: 'App',
      titles: [
        {to: 'index', name: '首页'},
        {to: 'szdw', name: '市直单位综合库'},
        {to: 'xzqy', name: '行政区域分析库'},
        {to: 'yqsj', name: '舆情事件库'},
      ],
      ww: 1920, hh: 1080, w: 1920, h: 1080,
    }
  },
  created () {
    this.$store.commit('setIndex', this.$route.query.type);
  },
  mounted () {
    this.$nextTick(() => {
      this.zoom();
      window.onresize = () => {this.zoom()};

      document.addEventListener('DOMContentLoaded', function (event) {
        // chrome 浏览器直接加上下面这个样式就行了，但是ff不识别
        document.body.style.zoom = 'reset';
        document.addEventListener('keydown', function (event) {
          if ((event.ctrlKey === true || event.metaKey === true)
          && (event.which === 61 || event.which === 107
            || event.which === 173 || event.which === 109
            || event.which === 187  || event.which === 189))
          {
            event.preventDefault();
          }
        }, false);
        document.addEventListener('DOMMouseScroll', function (event) {
          if (event.ctrlKey === true || event.metaKey) {
            event.preventDefault();
          }
        }, false);
      }, false);
    });
  },
  methods: {
    test_XHR () {
      var url = '/fdfs/group1/M00/00/07/rBAAyFuN2vOASjriAIQQWYOqyAE921.apk';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = "blob";
      xhr.onload = function(e) {
        console.log(e.target === this);
        if (this.status == 200) {
          // saveAs(this.response, "hello.apk");

          // var blob = this.response;
          // var img = document.createElement("img");
          // img.onload = function(e) {
          //   window.URL.revokeObjectURL(img.src);
          // };
          // img.src = window.URL.createObjectURL(blob);
          // $("#imgcontainer").html(img);
        }
      }
      xhr.send();
    },
    xxx (e) {},
    _getwh () {
      this.w = document.documentElement.clientWidth;
      this.h = document.documentElement.clientHeight;
    },
    zoom () {
      this._getwh();
      document.getElementById("app").style.transform = 'scale(' + this.w / this.ww + ')';
    },
    gotoPage (item) {
      this.$router.push({
        path: '/' + item.to,
        query: {
          type: item.to
        }
      });
    }
  },
  watch: {
    '$route' (to, from) {
      log.debug('$route.to', to);
      this.$store.commit('setIndex', to.query.type);
    }
  }
}
</script>

<style lang="stylus">
  .vl-notify.vl-notify-main {
    background-image: linear-gradient(-1deg, #071F66 35%, #071F66 81%) !important;
    box-shadow: 0 4px 4px 0 rgba(255,255,255,0.16) !important;
    border:none !important;
  }
  .vl-notify .vl-notify-content{
    padding:30px 40px !important;
  }
  .vl-notify.vl-notify-alert h2.vl-notice-title{
    background inherit !important;
    border-bottom: 1px dashed #8E9FD5 !important;
    font-size: 20px !important;
    height 60px !important;
    color: #50E3C2 !important;
    letter-spacing: 0.2px !important;
    padding: 10px 30px !important;
    font-weight:bold !important;
  }
  .vl-notify.vl-notify-alert h2.vl-notice-title .icon-remove{
    font-size: 20px !important;
    color: #50E3C2 !important;
    padding :10px !important;
  }
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-image: linear-gradient(-180deg, #071F66 0%, #121D55 100%) no-repeat;
  background-repeat: no-repeat;
  background-color: #121D55;
}
.clearfix{
  *zoom: 1;
}
.clearfix:after{
  content: '';
  display: table;
  clear: both;
}
#app {
  width: 1920px;
  height: 1080px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-image: linear-gradient(-180deg, #071F66 19%, #121D55 67%);
  background-image: linear-gradient(-180deg, #071F66 0%, #121D55 100%);
  background-repeat: no-repeat;
  background-color: #121D55;
  color: #55DDE1;
  transform: scale(1);
  transform-origin: left top 0px;

  .parallelogram{
    -webkit-transform: skew(-45deg);
    -moz-transform: skew(-45deg);
    -o-transform: skew(-45deg);
    -ms-transform: skew(-45deg);
    transform: skew(-45deg);
    box-shadow: 0 0 10px 2px #6edae8 inset;
  }
  a{
    color: #55DDE1;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: color 0.2s ease;
    transition: color 0.2s ease;
  }
  a:active, a:hover{
    outline: 0;
    text-decoration: none;
  }
  a:hover{
    color: #57a3f3;
  }
  .header{
    width: 100%;
    min-width: 1280px;
    height: 100px;
    margin-bottom: 17px;
    padding: 0 20px;
    text-align: center;

    .h-img{
      width: 100%;
      position: relative;
      bottom: -48px;
    }
    .h-left{
      float: left;
      overflow: hidden;
      width: 32%;
      height: 100%;
      padding-right: 5%; //5.638

      .left-bg{
        height: 100%;
        background-image: url('./assets/顶部线框（左）.svg');
        background-repeat: no-repeat;
        background-position: 0 85%;
        background-size: contain;
      }
      .left-title{
        font-size: 14px;
        font-weight: bold;
        padding: 55px 0 0 20%;
      }
    }
    .h-center{
      float: left;
      overflow: hidden;
      width: 36%;
      height: 100%;
      line-height: 80px;
      background-image: url('./assets/系统名称线框.svg');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: contain;

      &>h1{
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        font-weight: bold;
        line-height: 80px;
        color: #55DDE1;
        letter-spacing: 0.3px;
        margin: 0;
        padding: 0;
      }
    }
    .h-right{
      float: left;
      overflow: hidden;
      width: 32%;
      height: 100%;
      padding-left: 2.66%;

      .right-bg{
        height: 100%;
        background-image: url('./assets/顶部线框（右）.png');
        background-repeat: no-repeat;
        background-position: 0 85%;
        background-size: contain;
      }
      .right-title{
        font-size: 14px;
        font-weight: bold;
        padding: 40px 15px 0 27px;

        .link-0{
          display: inline-block;
          height: 30px;
          padding: 5px;
          margin-left: 5px;
          width: 15%;
        }
        .link-1{
          display: inline-block;
          height: 30px;
          padding: 5px;
          margin-left: 5px;
          width: 28%;
        }
        .link-2{
          display: inline-block;
          height: 30px;
          padding: 5px;
          margin-left: 5px;
          width: 28%;
        }
        .link-3{
          display: inline-block;
          height: 30px;
          padding: 5px;
          margin-left: 5px;
          width: 20%;
        }
        .link-name{
          cursor: pointer;
          width: 100%;
          height: 100%;
          transform: skew(45deg);
        }
        // .router-link-active
        .link-active{
          width: 100%;
          height: 10px;
          background-color: #55DDE1;
          margin-top: 8px;
        }
      }
    }
  }
  .app-content{
    width: 100%;
    min-width: 1280px;
    height: 960px;
  }

ul{line-style:none;}
li {list-style-type:none;}
.select{position:relative;width:90px;min-width:90px;height:30px;cursor:pointer;background: rgba(136,153,207,0.20);border: 0 solid #8E9FD5;float: right;color:#fff;margin-right: 10px;padding-left: 10px;padding-top: 5px;margin-top: 10px;border-radius:1px;}
.select:after{content:"";position:absolute;top:50%;right:10px;margin-top:-2px;border-top:5px solid #666;border-right:5px solid transparent;border-left:5px solid transparent;}
.selects .select_text{padding:0 20px 0 10px;height:36px;line-height:30px;color: #fff}
.select_ul{display:none;position:absolute;top:34px;left:-1px;width:90px;min-width:90px;border:1px solid #D4D4D4;border-bottom-right-radius:3px;border-bottom-left-radius:3px;background: rgba(136,153,207,1.0);}
.select_ul li{line-height:30px;text-indent:10px;color:#fff;}
.select_ul li:hover{color:#fff;background:#6AA7EA;}
.select_ul li.cur{color:#fff;background:#195DA3;}
}
</style>
