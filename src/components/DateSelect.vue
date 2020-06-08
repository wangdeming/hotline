<template>
  <div class="date-select">
    <span class="ds-text">统计时间:</span>
    <date-picker format="yyyy-MM-dd" placeholder="请选择日期"
      wrapper-class="ds-box"
      input-class="ds-input"
      calendar-class="ds-calendar"
      :disabledDates="state.from.disabledDates"
      :language="zh"
      v-model="state.from.date"
      @selected="doSelected"
      @opened="doOpened"
      @closed="doClosed"
    ></date-picker>
    <span class="ds-text">至</span>
    <date-picker format="yyyy-MM-dd" placeholder="请选择日期"
      wrapper-class="ds-box"
      input-class="ds-input"
      calendar-class="ds-calendar"
      :disabledDates="state.to.disabledDates"
      :language="zh"
      v-model="state.to.date"
      @selected="doSelected"
      @opened="doOpened"
      @closed="doClosed"
    ></date-picker>
    <span class="ds-item ds-backup"
      :class="{'ds-selected': timeScope == ENUM.custom}"
      @click="clickCustom"
    >查询</span>
    <span class="ds-item" style="margin-left:10%;" 
      :class="{'ds-selected': timeScope == ENUM.weekly}"
      @click="clickWeekly"
    >本周</span>
    <span class="ds-item"
      :class="{'ds-selected': timeScope == ENUM.monthly}"
      @click="clickMonthly"
    >本月</span>
    <span class="ds-item"
      :class="{'ds-selected': timeScope == ENUM.yearly}"
      @click="clickYearly"
    >本年</span>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vuejs-datepicker'
import {en, zh} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'DateSelect',
  components: {
    DatePicker
  },
  props: {
    start: Object,
    end: Object,
    type: Number
  },
  data () {
    let now = new Date();
    return {
      msg: 'DateSelect',
      en: en,
      zh: zh,
      ENUM: {
        weekly: 1,
        monthly: 2,
        yearly: 3,
        custom: 4
      },
      state: {
        from: {
          date: now,
          disabledDates: {
            from: now, // Disable all dates after specific date
          }
        },
        to: {
          date: now,
          disabledDates: {
            from: now, // Disable all dates after specific date
            to: now, // Disable all dates up to specific date
          }
        }
      },
      timeScope: 4,
    }
  },
  created () {
    this.timeScope = this.ENUM.weekly;
    this._setDate('isoweek');
    
    if(this.start){
      this.state.from.date = this.start
      this.state.to.disabledDates.to = this.start;
    }
    if(this.end){
      this.state.to.date = this.end
      this.state.from.disabledDates.from = this.end;
    }
    if(this.type){
      this.timeScope = this.type
    }
  },
  mounted () {
    this.emitChange();
  },
  methods: {
    _setDate (timeScope) {
      this.state.from.date = moment().startOf(timeScope).toDate();
      this.state.to.date = moment().toDate();
      log.debug(moment().startOf(timeScope).toDate());
    },
    doOpened () {
      // log.debug('doOpened');
    },
    doSelected (date) {
      // log.debug('doSelected');
      // log.debug(date);
      // this.timeScope = this.ENUM.custom;
    },
    doClosed () {
      // this.timeScope = this.ENUM.custom;
      // this.emitChange();
    },
    clickCustom () {
      this.timeScope = this.ENUM.custom;
      this.emitChange();
    },
    clickWeekly () {
      this.timeScope = this.ENUM.weekly;
      this._setDate('isoweek');
      this.emitChange();
    },
    clickMonthly () {
      this.timeScope = this.ENUM.monthly;
      this._setDate('month');
      this.emitChange();
    },
    clickYearly () {
      this.timeScope = this.ENUM.yearly;
      this._setDate('year');
      this.emitChange();
    },
    emitChange () {
      this.$emit('change', this.result);
    }
  },
  watch: {
    'state.from.date': function (val, oldVal) {
      this.state.to.disabledDates.to = val;
    },
    'state.to.date': function (val, oldVal) {
      this.state.from.disabledDates.from = val;
    },
  },
  computed: {
    result () {
      return {
        timeScope: this.timeScope,
        beginTime: this.state.from.date,
        endTime: this.state.to.date,
        beginTimeFormatted: moment(this.state.from.date).format('YYYY-MM-DD'),
        endTimeFormatted: moment(this.state.to.date).format('YYYY-MM-DD'),
        moment: moment
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.date-select{
  color: #fff;
  .ds-backup{
    display: inline-block;
    text-align: center;
    height: 28px;
    line-height: 28px;
    width: 80px;
    color: #fff;
    font-size: 14px;
    letter-spacing: .18px;
    background: rgba(136,153,207,.2);
    border: 0 solid #8e9fd5;
    border-radius: 100px;
  }
  .ds-selected{
    color: #55DDE1;
  }
  // &>span{
  .ds-text{
    margin: 0 10px;
  }
  .ds-item{
    margin: 0 10px;
    cursor: pointer;
  }
  .ds-box{
    display: inline-block;
    width: 14.7%;
    height: 30px;
  }
  .ds-box>div:first-child:after{
    content: '';
    position: absolute;
    right: 10px;
    top: 12px;
    width: 0;
    height: 0;
    border-width: 6px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
  .ds-input{
    width: 100%;
    height: 30px;
    border: none;
    text-align: center;
    background: rgba(136,153,207,0.20);
    border: 0 solid #8E9FD5;
    color: #fff;
    cursor: pointer;
  }
  .ds-calendar{
    position: absolute;
    left: calc(50% - 133px);
    width: 266px;
    z-index: 100;
    background: #53608a;
    border: none;
    box-shadow: 0px 4px 15px #404658;
  }
  .vdp-datepicker__calendar header .prev:not(.disabled):hover,
  .vdp-datepicker__calendar header .next:not(.disabled):hover,
  .vdp-datepicker__calendar header .up:not(.disabled):hover {
    background: rgba(142, 159, 213, 0.4);
  }
}
</style>