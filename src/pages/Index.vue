<template>
  <div class="index clearfix">
    <div class="left">
      <div class="left-top chartbox">
        <div class="title">按期回复率</div>
        <chart ref="leftTop" :options="leftTop" :auto-resize="true" @click="onClick"></chart>
      </div>
      <div class="left-middle chartbox">
        <div class="title">热词</div>
        <cloud-word class="cloudword" :params="leftMiddle"></cloud-word>
      </div>
      <div class="left-bottom chartbox">
        <div class="title">来源分布</div>
        <chart ref="leftBottom" :options="leftBottom" :auto-resize="true" @click="onClick"></chart>
      </div>
    </div>
    <div class="center">
      <div class="center-top">
        <date-select @change="onChangeDate"></date-select>
      </div>
      <div class="center-middle">
        <div class="title"></div>
        <div class="content1">
          <div class="ellipse-0">
            <div class="test-p x-p-0">平台实时诉求总数</div>
            <div class="test-num x-num-0">{{ centerMiddle.totalNum }}</div>
          </div>
          <div class="ellipse-1">
            <div class="test-p x-p-1">求助</div>
            <div class="test-num x-num-1">{{ centerMiddle.helpNum }}</div>
          </div>
          <div class="ellipse-2">
            <div class="test-p x-p-2">建言献策</div>
            <div class="test-num x-num-2">{{ centerMiddle.adviceNum }}</div>
          </div>
          <div class="ellipse-3">
            <div class="test-p x-p-3">投诉</div>
            <div class="test-num x-num-3">{{ centerMiddle.complainNum }}</div>
          </div>
          <div class="ellipse-4">
            <div class="test-p x-p-4">咨询</div>
            <div class="test-num x-num-4">{{ centerMiddle.consultNum }}</div>
          </div>
          <div class="ellipse-5">
            <div class="test-p x-p-5">其他</div>
            <div class="test-num x-num-5">{{ centerMiddle.elseNum }}</div>
          </div>
        </div>
      </div>
      <div class="center-bottom">
        <div class="title-bg"></div>
        <div class="title">诉求分类<div></div></div>
        <chart class="content2"
          ref="centerBottom1"
          :options="centerBottom1"
          :auto-resize="true"
          @mouseover="clearTimer"
          @mouseout="initTimer"
          @click="clickCenterBottom1">
        </chart>
        <chart class="content2" theme="macarons"
          ref="centerBottom2"
          :options="centerBottom2"
          :auto-resize="true"
          @mouseover="clearTimer"
          @mouseout="initTimer">
        </chart>
      </div>
    </div>
    <div class="right">
      <div class="right-top chartbox">
        <div class="title">实时热点事件</div>
        <rank :data="rightTop_data" :option="{type: 'yqsj'}"></rank>
      </div>
      <div class="right-middle chartbox">
        <div class="title">市直单位承办量排名(件)</div>
        <rank :data="rightMiddle_data" :option="{type: 'szdw'}"></rank>
      </div>
      <div class="right-bottom chartbox">
        <div class="title">行政区域承办量排名(件)</div>
        <rank :data="rightBottom_data" :option="{type: 'xzqy'}"></rank>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import CloudWord from '@/components/CloudWord'
import Rank from '@/components/Rank'
import DateSelect from '@/components/DateSelect'

export default {
  name: 'Index',
  components: {
    CloudWord,
    Rank,
    DateSelect
  },
  data: function () {
    var leftTop_data = {
      finishNum: 100,
      finishRate: '0.12',
      totalNum: 1000
    };
    var leftMiddle_data = [
      '受灾',
      '酒驾',
      '教育',
      '遗址',
      '教育部门',
      '黑名单',
      '暴雨',
      '网络赌博',
      '强降雨',
      '犯罪',
      '成都',
      '游客',
      '抗击台风',
      '贫困户',
      '家长',
      '留学生'
    ];
    var leftBottom_data = [
      {value:335, name:'noData1'},
      {value:310, name:'noData2'},
      {value:234, name:'noData3'},
      {value:135, name:'noData4'},
      {value:1548, name:'noData5'}
    ];
    var centerMiddle_data = {
      adviceNum: 0,
      complainNum: 0,
      consultNum: 0,
      elseNum: 0,
      helpNum: 0,
      totalNum: 0,
    };
    var centerBottom_data = [
      {value:10, name:'noData1'},
      {value:5, name:'noData2'},
      {value:15, name:'noData3'},
      {value:25, name:'noData4'},
      {value:20, name:'noData5'},
      {value:35, name:'noData6'},
      {value:30, name:'noData7'},
      {value:40, name:'noData8'}
    ];
    var secondCategory_data = [
      {value:10, name:'noData1'},
      {value:5, name:'noData2'},
      {value:15, name:'noData3'},
      {value:25, name:'noData4'},
      {value:20, name:'noData5'},
      {value:35, name:'noData6'},
      {value:30, name:'noData7'},
      {value:40, name:'noData8'}
    ];
    var colorPalette = [
      '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
      '#8d98b3','#e5cf0d','#97b552','#dc69aa','#9a7fd1',
      '#588dd5','#f5994e','#1FD2FF','#783FDA','#FF9F7F'
    ];
    return {
      msg: 'Welcome to 首页',
      timer: null,
      dataIndex: 0,
      interval: 5000,
      leftTop: {
        color: colorPalette,
        tooltip : {
          textStyle: {
            color: '#55DDE1'
          },
          formatter: "{a}: {c}"
        },
        series: [
          {
            name: '总体回复数',
            type: 'gauge',
            center: ['50%', '70%'],
            radius: '85%',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: leftTop_data.totalNum,
            axisLine: {            // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                width: 5,
                color: [[0.2, '#66dfdc'], [0.8, '#66dfdc'], [1, '#66dfdc']],
              }
            },
            axisTick: {            // 坐标轴小标记
              length: 15,        // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: '#66dfdc',
              }
            },
            splitLine: {           // 分隔线
              length: 20,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#66dfdc',
              }
            },
            axisLabel: {
              formatter (value) {
                return (100*value/leftTop_data.totalNum).toFixed(0)
              }
            },
            detail: {
              color: '#fff',
              backgroundColor: 'rgba(92,202,245,0.50)',
              offsetCenter: [0, '35%'],
              formatter: function (value) {
                return (100*leftTop_data.finishRate).toFixed(0) + '%';
              },
            },
            data: [{value: leftTop_data.finishNum, name: ''}]
          }
        ]
      },
      leftMiddle: {
        title: '热词',
        tags: leftMiddle_data,
        options: {
          outlineMethod: 'none',
          clickToFront: 500,
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05,
          minSpeed: 0.01,
          initial: [0.2, 0],
          weight: true,
          weightFrom: 'data-weight',
          weightMode: 'both',
          wheelZoom: false,
          weightGradient: {
            0: "#2ec7c9",
            0.2: "#b6a2de",
            0.4: "#5ab1ef",
            0.6: "#ffb980",
            0.8: "#d87a80",
            1: "#FFD67F"
          },
        }
      },
      leftBottom: {
        color: colorPalette,
        tooltip : {
          textStyle: {
            color: '#55DDE1'
          },
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          textStyle: {
            color: '#55DDE1'
          },
          orient: 'vertical',
          right: '5%',
          top: '32%',
          itemGap: 20,
          formatter: function (name) {
            return name + ' ' + leftBottom_data.filter(e => name === e.name)[0].value;
          },
          data: leftBottom_data.map(e => e.name)
        },
        series: [
          {
            name: '诉求来源',
            type: 'pie',
            radius : '50%',
            center: ['35%', '60%'],
            label: {
              normal: {
                show: false
              }
            },
            data: leftBottom_data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      centerMiddle: centerMiddle_data,
      centerBottom1: {
        color: colorPalette,
        title: {
          textStyle: {
            color: '#55DDE1',
            fontSize: 16,
            fontWeight: 'bold',
          },
          text: '一级分类',
          left: 'center',
          top: '12%'
        },
        tooltip : {
          show: false,
          textStyle: {
            color: '#55DDE1'
          },
          trigger: 'item',
          formatter: "{a} {b} : {c} ({d}%)"
        },
        series : [
          {
            name:'',
            type:'pie',
            radius : [25, '65%'],
            center : ['50%', '60%'],
            roseType : 'radius',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: centerBottom_data
          }
        ]
      },
      centerBottom2: {
        color: colorPalette,
        title: {
          textStyle: {
            color: '#55DDE1',
            rich: {
              d: {
                fontSize: 16,
                fontWeight: 'normal'
              },
              a: {
                fontFamily: 'PingFangSC-Semibold',
                fontSize: 14,
                color: '#FFFFFF',
                letterSpacing: '0.18px'
              },
              b: {
                fontFamily: 'PingFangSC-Semibold',
                fontSize: 24,
                color: '#f8e71c',
                letterSpacing: 0.18,
                lineHeight: 20
              }
            }
          },
          text: ' 诉求量',
          left: 'center',
          top: '12%'
        },
        tooltip : {
          textStyle: {
            color: '#55DDE1'
          },
          trigger: 'item',
          formatter: "{a} {b} : {c} ({d}%)"
        },
        series : [
          {
            name:'',
            type:'pie',
            radius : '45%',
            center : ['50%', '65%'],
            data: secondCategory_data
          }
        ]
      },
      rightTop_data: [],
      rightMiddle_data: [],
      rightBottom_data: [],
      commonParams: {
        timeScope: 3,
        beginTime: undefined,
        endTime: undefined,
        topNum: 5,
        containElseNum: false,
      },
      loadingOption: {
        text: '正在加载',
        textColor: '#55DDE1',
        color: '#55DDE1',
        maskColor: 'transparent',
      },
      noDataOption: {
        text: '暂无数据',
        effect: 'bubble',
        effectOption: {
          effect: {
            n: 0,
          },
        },
      },
    }
  },
  created () {
    // this.initIndex();
  },
  mounted () {
    this.$nextTick(() => {});
  },
  activated () {
    // this.initIndex();
    this.initTimer();
  },
  deactivated () {
    this.clearTimer();
  },
  methods: {
    initIndex () {
      this._getTotalData();
      this._getLeftMiddleData();
      this._getRightTopData();
      this._getRightMiddleData();
      this._getRightBottomData();
    },
    _showLoading () {
      this.$refs.leftTop.showLoading(this.loadingOption);
      this.$refs.leftBottom.showLoading(this.loadingOption);
      this.$refs.centerBottom1.showLoading(this.loadingOption);
    },
    _hideLoading () {
      this.$refs.leftTop.hideLoading();
      this.$refs.leftBottom.hideLoading();
      this.$refs.centerBottom1.hideLoading();
    },
    _showNoData () {
      // this.$refs.leftTop.clear();
      // this.$refs.leftBottom.clear();
      // this.$refs.centerBottom1.clear();
    },
    _getTotalData () {
      this._showLoading();
      api.get_total(Object.assign({}, this.commonParams, {
        topNum: void 0,
        containElseNum: void 0,
      })).then(res => {
        this._hideLoading();
        log.debug('get_total', res);
        const leftTop_data = res.data.replayOnTimeRate;
        const leftBottom_data = res.data.appealSource;
        const centerMiddle_data = res.data.appealType;
        const centerBottom_data = res.data.firstCategory;
        // left-top
        this.leftTop.series[0].max = leftTop_data.shouldReplayTotalNum;
        this.leftTop.series[0].axisLabel.formatter = function (value) {
          return leftTop_data.shouldReplayTotalNum === 0 ? 0 : (100*value/leftTop_data.shouldReplayTotalNum).toFixed(0);
        };
        this.leftTop.series[0].detail.formatter = function (value) {
          return (100*leftTop_data.replayOnTimeRate).toFixed(0) + '%';
        };
        this.leftTop.series[0].data[0].value = leftTop_data.replayOnTimeNum;
        // left-bottom
        this.leftBottom.legend.formatter = function (name) {
          return name + ' ' + leftBottom_data.filter(e => name === e.name)[0].value;
        };
        this.leftBottom.legend.data = leftBottom_data.map(e => e.name);
        this.leftBottom.series[0].data = leftBottom_data;
        // center-middle
        this.centerMiddle = centerMiddle_data;
        // center-bottom
        this.centerBottom1.series[0].data = centerBottom_data;
        this._getSecondCategoryData(centerBottom_data[0]);
      }).catch(e => {
        log.debug(e);
        this._showNoData();
      });
    },
    _getLeftMiddleData () {
      api.get_hotwrod_top({ topN: 20 }).then(res => {
        log.debug('get_hotwrod_top', res);
        this.leftMiddle.tags = res.data;
      });
    },
    _getSecondCategoryData (data) {
      this.$refs.centerBottom2.showLoading(this.loadingOption);
      api.get_secondCategory(Object.assign({}, this.commonParams, {
        firstCategory: data.id
      })).then(res => {
        this.$refs.centerBottom2.hideLoading();
        log.debug('get_secondCategory', res);
        const secondCategory_data = res.data;
        this.centerBottom2.title.text = `{d|${data.name} 诉求量:}  {a|共} {b|${data.value}} {a|件}`;
        this.centerBottom2.series[0].data = secondCategory_data;
      });
    },
    _getRightTopData () {
      api.get_hotevent_page({
        pageNumber: 1,
        pageSize: 5,
        // keyword: '',
        // type: '',
      }).then(res => {
        log.debug('get_hotevent_page', res);
        this.rightTop_data = res.data.list
          .sort((a,b) => b.heat-a.heat)
          .map(e => { return {
            id: e.id,
            name: e.content,
            value: e.heat,
          }})
      });
    },
    _getRightMiddleData () {
      api.get_distribution(Object.assign({}, this.commonParams, {
        departType: 1
      })).then(res => {
        log.debug('get_distribution', res);
        this.rightMiddle_data = res.data;
      });
    },
    _getRightBottomData () {
      api.get_distribution(Object.assign({}, this.commonParams, {
        departType: 2
      })).then(res => {
        log.debug('get_distribution', res);
        this.rightBottom_data = res.data;
      });
    },
    centerBottomAction () {
      let centerBottom1 = this.$refs.centerBottom1;
      clearTimeout(this.timer);this.timer = null;
      this.timer = setInterval(() => {
        let data = centerBottom1.options.series[0].data;
        centerBottom1.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
        this.dataIndex = (this.dataIndex + 1) % data.length
        this._getSecondCategoryData(data[this.dataIndex]);
        centerBottom1.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
        centerBottom1.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
      }, this.interval);
    },
    onClick (event) {
      log.debug('onClick:', arguments);
    },
    onChangeDate (state) {
      log.debug(state);
      this.commonParams.timeScope = state.timeScope;
      this.commonParams.beginTime = state.beginTimeFormatted;
      this.commonParams.endTime = state.endTimeFormatted;

      this.$nextTick(() => {
        this.initIndex();
        this.initTimer();
      });
    },
    clickCenterBottom1 (event) {
      this._getSecondCategoryData(event.data);
    },
    clearTimer (event) {
      log.debug('--clearTimer--');
      clearTimeout(this.timer);
      this.timer = null;
      this.$refs.centerBottom1.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });
    },
    initTimer (event) {
      log.debug(this.timer);
      if(this.timer) return;
      log.debug('--initTimer--');
      this.$refs.centerBottom1.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });
      this.centerBottomAction();
    }
  },
  watch: {}
}
</script>

<style scoped lang="stylus">
.echarts{
  width: 100%;
  height: 100%;
}
.index{
  width: 100%;
  padding: 0 30px 0 30px;

  .chartbox {
    background: linear-gradient(to left, #b7d7ee, #b7d7ee) left top no-repeat,
    linear-gradient(to bottom, #b7d7ee, #b7d7ee) left top no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) right top no-repeat,
    linear-gradient(to bottom, #b7d7ee, #b7d7ee) right top no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) left bottom no-repeat,
    linear-gradient(to bottom, #b7d7ee, #b7d7ee) left bottom no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) right bottom no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) right bottom no-repeat;
    background-size: 1px 30px, 30px 1px, 1px 30px, 30px 1px;
    box-shadow: 0 0 10px 2px rgba(85, 221, 225, 0.5) inset;
  }
  .left{
    float: left;
    width: 22.5806%;

    .title{
      position: absolute;
      top: 15px;
      left: 28%;
      width: 44%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: bold;
      color: #55DDE1;
      letter-spacing: 0.2px;
      background-image: url('../assets/title.png');
      background-repeat: no-repeat;
      background-position: 0% 50%;
      background-size: 100% 100%;
    }
    .left-top{
      height: 290px;
      position: relative;
    }
    .left-middle{
      height: 320px;
      margin: 10px 0 10px 0;
      position: relative;
      .cloudword{
        padding-top: 60px;
        width: 100%;
        height: 100%;
      }
    }
    .left-bottom{
      height: 318px;
      position: relative;
    }
  }
  .center{
    float: left;
    width: 54.8387%;

    .center-top{
      height: 30px;
      // line-height: 30px;
      margin-bottom: 10px;
      text-align: center;

      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #fff;
      letter-spacing: 0.18px;
    }
    .center-middle{
      height: 414px;

      .title{
        height: 12px;
        background-image: url('../assets/分割线1.png');
        background-repeat: no-repeat;
        background-position: 0% 0%;
        background-size: contain;
      }
      .vertical-mode{
        writing-mode: tb-rl;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
      }
      .content1{
        height: 402px;
        text-align: center;
        overflow: hidden;
        position: relative;

        .test-p{
          font-family: PingFangSC-Regular;
          font-size: 16px;
          letter-spacing: 0.2px;
        }
        .test-num{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: 28px;
          letter-spacing: 0.76px;
          margin-top: -5px;
        }
        .ellipse-0{
          position: absolute;
          top: 122px;
          left: 31%;
          width: 38%;
          line-height: 70px;
          text-align: center;
          height: 158px;
          border-radius: 60%;
          background-image: linear-gradient(-170deg, #0682E2 36%, #1FD2FF 100%);
          box-shadow: 0 5px 8px 0 #0A1E60;

          .x-p-0{
            color: #BDEDFC;
          }
          .x-num-0{
            color: #FFFFFF;
            font-size: 60px;
          }
        }
        .ellipse-1{
          position: absolute;
          top: 70px;
          left: 21%;
          width: 15%;
          line-height: 38px;

          text-align: center;
          height: 80px;
          border-radius: 60%;
          background-image: linear-gradient(12deg, #503ECC 0%, #783FDA 79%);
          box-shadow: 0 2px 4px 1px #081B58;

          .x-p-1{
            color: #E6CBFF;
          }
          .x-num-1{
            color: #E6CBFF;
          }
        }
        .ellipse-2{
          position: absolute;
          top: 70px;
          right: 21%;
          width: 15%;
          line-height: 38px;

          text-align: center;
          height: 80px;
          border-radius: 60%;
          background-image: linear-gradient(-172deg, #FB7293 10%, #FF9F7F 90%);
          box-shadow: 0 2px 4px 1px #081B5A;

          .x-p-2{
            color: #FFDDE1;
          }
          .x-num-2{
            color: #FFDDE1;
          }
        }
        .ellipse-3{
          position: absolute;
          top: 220px;
          left: 17%;
          width: 15%;
          line-height: 38px;

          text-align: center;
          height: 80px;
          border-radius: 60%;
          background-image: linear-gradient(10deg, #FFDB5C 0%, #FF9F7F 81%);
          box-shadow: 0 2px 4px 1px #203370;

          .x-p-3{
            color: #FFEEE3;
          }
          .x-num-3{
            color: #FFEEE3;
          }
        }
        .ellipse-4{
          position: absolute;
          top: 295px;
          left: 42.5%;
          width: 15%;
          line-height: 38px;

          text-align: center;
          height: 80px;
          border-radius: 60%;
          background-image: linear-gradient(10deg, #3D9FEA 0%, #5165F0 90%);
          box-shadow: 0 2px 4px 1px #1A2D68;

          .x-p-4{
            color: #B6D2FF;
          }
          .x-num-4{
            color: #B6D2FF;
          }
        }
        .ellipse-5{
          position: absolute;
          top: 220px;
          right: 17%;
          width: 15%;
          line-height: 38px;

          text-align: center;
          height: 80px;
          border-radius: 60%;
          background-image: linear-gradient(8deg, #6EFF86 0%, #00D2A5 81%);
          box-shadow: 0 2px 4px 1px #162862;

          .x-p-5{
            color: #C2FFD2;
          }
          .x-num-5{
            color: #C2FFD2;
          }
        }
      }
    }
    .center-bottom{
      height: 500px;
      position: relative;

      .title-bg{
        height: 12px;
        background-image: url('../assets/分割线2.png');
        background-repeat: no-repeat;
        background-position: 0% 0%;
        background-size: contain;
      }
      .title{
        position: absolute;
        // overflow: hidden;
        top: 15px;
        left: 40%;
        width: 20%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        font-weight: bold;
        color: #55DDE1;
        letter-spacing: 0.2px;
        background-image: url('../assets/title.png');
        background-repeat: no-repeat;
        background-position: 0% 50%;
        background-size: 100% 100%;

        &>div{
          width: 50%;
          margin-top: 20px;
          height: 30px;
          border-right: 2px dotted #55DDE1;
        }
      }
      .content2{
        height: 488px;
        width: 50%;
        float: left;
      }
    }
  }
  .right{
    float: left;
    width: 22.5806%;

    .title{
      position: absolute;
      overflow: hidden;
      top: 25px;
      left: 24%;
      width: 52%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: bold;
      color: #55DDE1;
      letter-spacing: 0.2px;
      background-image: url('../assets/title.png');
      background-repeat: no-repeat;
      background-position: 0% 50%;
      background-size: 100% 100%;
    }
    .right-top{
      height: 308px;
      position: relative;
    }
    .right-middle{
      height: 308px;
      margin: 10px 0 10px 0;
      position: relative;
      .cloudword{
        padding-top: 40px;
      }
    }
    .right-bottom{
      height: 308px;
      position: relative;
    }
  }
}
</style>
