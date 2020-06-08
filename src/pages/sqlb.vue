<template>
  <div class="contentDiv clearfix">
    
    <div class="mainListBox">
      <div class="time">
        <div class="center-top">
           <date-select @change="onChangeDate"></date-select>
          </div>
      </div>
      <div class="rightChart">
          <ul class="levelLocation">
            <li v-show="categoryType>=1"
              @click="categoryType=1;getconsoleType(categoryType)"
            >诉求分类&nbsp;</li>
            <li v-show="categoryType>=2"
              @click="categoryType=2;getconsoleType(categoryType)"
            > >&nbsp;{{this.nameLevel[2]}}&nbsp;</li>
            <!-- 日后加字段之后再放开此处注释 -->
            <li v-show="categoryType>=3"
              @click="categoryType=3;getconsoleType(categoryType)"
            > >&nbsp;{{this.nameLevel[3]}}&nbsp;</li>
            <li v-show="categoryType>=4"
              @click="categoryType=4;getconsoleType(categoryType)"
            > >&nbsp;{{this.nameLevel[4]}}&nbsp;</li>
            <li v-show="categoryType>=5"
              @click="categoryType=5;getconsoleType(categoryType)"
            > >&nbsp;{{this.nameLevel[5]}}&nbsp;</li>
          </ul>
          <a class="a-download" @click="downloadChart('chartlevel')"></a>
          <button v-show="categoryType>=2" class="backUp" @click="getconsoleType(--categoryType)">
            上一级
            <img class="backUpImg" src="../assets/返回.svg">
          </button>
          <div class="chartlevel" id="chartlevel">
            <chart ref="rightBottom" :options="rightBottom" :auto-resize="true" @click="getdetails1"></chart>
          </div>
          <!-- 中间标签 -->
          <div class="center-txt">
            <div class="center-txt-div1">
              <p class="center-txt-p1">{{this.totalSq}}</p>
            </div>
            <div class="center-txt-div2">
              <p class="center-txt-p2">诉求总数（件）</p>
            </div>
          </div>
      </div>         
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import api from '@/api'
import html2canvas from 'html2canvas'
import DateSelect from '@/components/DateSelect'

export default {
  mixins: [mixin],
  name: 'sqlb',
  components: {
    DateSelect
  },
  data () {
        var rightBottomData = new Array();
        return {
            totalSq:'',
            categoryType: 1,
            typeId: {},
            nameLevel:{},
            msg:'sqlb',
            keyword:'',
            timer: null,
            startTime: '',
            endTime: '',
            timeScope: 1,
            colors:["#E7BCF3","#9FE6B8","#FFDB5C","#96BFFF","#32C5E9","#FF9F7F","#37A2DA","#FB7293","#E062AE","#E690D1"],
            rightBottom:{
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    top : '78%',
                    width: '80%',
                    height: '100%',
                    itemWidth: 24,
                    itemHeight: 24,
                    padding: [30, 30],
                    itemGap: 30,
                    textStyle: {
                        color: '#A7B7D6',
                        fontSize: 16
                    },
                data:[]
                },  
                series : [
                    {
                        name:'承办量分布',
                        type:'pie',
                        radius : [110, 250],
                        center : ['50%', '35%'],
                        roseType : 'area',
                        data:[],
                        label:{
                          fontSize:16,
                        },

                    }
                ]
            },
        }

  },
  created () {
    // this.initIndex();
  },
  destroyed () {
    clearTimeout(this.timer);
  },
  mounted () {
    // dom挂载完毕
    this.$nextTick(() => {
      // do something
    });
  },
  methods : { 
    gotoPage (item) {
      this.$router.push({
        name: 'szzhfx',
        params: {
          departId: item.id
        },
        query: {
          type: 'szdw'
        }
      });
    },
    onChangeDate (state) {
      this.timeScope = state.timeScope;
      this.startTime = state.beginTimeFormatted;
      this.endTime = state.endTimeFormatted;
      this.initIndex();
      // console.log(this.params.departId);
    }, 
    initIndex () {
       this.getconsoleType(this.categoryType);
       // console.log("时间段："+this.timeScope);
       // this.getdetails1();
    }, 
    downloadChart(chartId) {  
        var chartElement = document.querySelector("#"+ chartId)
        html2canvas(chartElement).then(function(canvas) {
          var dataURL =canvas.toDataURL("image/png");
          var $a = $("<a></a>").attr("href", dataURL).attr("download", chartId + ".png");
          $a.css("display","none");
          $("body").append($a);
              $a[0].click();
              $a.remove();
        });
    },
    getconsoleType(categoryType){
      // console.log('categoryType', categoryType);
      api.get_consoleType({
        departId:this.params.departId,
        startDate:this.startTime,
        endDate:this.endTime,
        timeScope:this.timeScope,
        categoryType:categoryType,
        categoryId:this.typeId[categoryType],
      }).then(res =>{
          var data = res.data;
          var consoleTypeArray = new Array();
          var typeArray = new Array();
         
          for (var i = 0;i<data.series.length;i++) {
              var temp = new Object();

              temp.name = data.series[i].name;
              temp.sub = data.series[i].sub;
              temp.value = data.series[i].value;
              temp.categoryType = data.series[i].categoryType;
              temp.categoryId = data.series[i].id;
              temp.totalSq = data.count;

              // console.log(temp);
              consoleTypeArray.push(temp);
              typeArray.push(temp.name);
              //颜色加载
              var colorObject = new Object();
              colorObject.color = this.colors[i];
              temp.itemStyle = colorObject;
              //诉求总数
              this.totalSq = temp.totalSq;
          }
          //数据对象加载至图表           
          this.rightBottom.series[0].data = consoleTypeArray;
          this.rightBottom.legend.data = typeArray;
      })
    },
    getdetails1(event){
      // console.log(event);
      var type = event.data.categoryType+1; 
      var id = event.data.categoryId;
      var nameLevel = event.data.name;
      var value = event.data.value;
      var sub = event.data.sub;
      console.log(sub);
      //点击图表，重新加载下一层数据,目前数据只有两层，写死，以后需要在后台加字段点击请求后返回数据为空再加判断
      if(type <=4&&value!=0&&sub>0){
      this.categoryType = type;
      this.typeId[type] = id;
      console.log(this.typeId[type]);
      //获取下一层数据
      // this.sub =sub;
      this.getconsoleType(type);
      this.nameLevel[type] = nameLevel;
      }
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  font-family: PingFangSC-Semibold;
}
input,button,a {
  outline:0 none !important; blr:expression(this.onFocus=this.blur());
}
.mainListBox{
  float: left;
  width: 99%;
  margin-left: 0.5%;
}
.time{
  width: 100%;
  height: 60px;
  background: rgba(136,153,207,0.10);
}
.time span{
  height: 60px;
  display:inline-block;
  /*float: left;*/
  line-height: 60px;
  margin-left: 20px;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0.18px;
}
.time input{
  width: 186px;
  height: 30px;
  background: rgba(136,153,207,0.20);
  border: 0 solid #8E9FD5;
  margin: 15px 10px;
  color: #FFFFFF;
  text-align: center;
  /*float: left;*/
}
.time select{
  width: 90px;
  height: 30px;
  background: rgba(136,153,207,0.20);
  border: 0 solid #8E9FD5;
  margin: 15px 30px;
  color: #FFFFFF;
  text-align: center;
}
.center-top{
    padding-top: 15px;
    padding-left: 15px;
}
.levelLocation{
  display: inline-block;
  width: auto;
  margin-left: 10px;
  cursor: pointer;
}
.levelLocation li{  
  display: inline-block;
  width: auto;
}
.backUp{
  display: inline-block;
  height: 28px;
  width: 100px;
  float: right;
  margin-right: 20px;
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.18px;
  background: rgba(136,153,207,0.20);
  border: 0 solid #8E9FD5;
  border-radius: 100px;  
  cursor: pointer;

}
.backUpImg{
  height: 16px;
  width: 16px;
  margin-top: -3px;
  line-height: 28px;
}  
.rightChart{
  position: relative;
  margin-top: 10px;
  width: 100%;
  height:877px;
  padding:  15px 15px 15px 15px;
  background-color:  rgba(136,153,207,0.10);
}
.a-download{
  display: inline-block;
  width: 24px;
  height: 24px;
  float: right;  
  margin-right: 20px;
  background-image: url(../assets/download.svg) !important;
  background-size: 100% 100%;
} 
.echarts{
  height: 800px;
  width: 100%;
}
.center-txt{
  position: absolute;
  z-index: 99;
  top: 30.8%;
  left: 46.5%;
}
.center-txt-div1,.center-txt-div2{
  text-align: center;
}
.center-txt-div1{
  width: 110px;
}
.center-txt-div2{
  width: 130px;
}
.center-txt-p1{
  font-size: 48px;
  color: #F5A623;
  letter-spacing: 0.6px;
}
.center-txt-p2{
  font-size: 18px;
  color: #55DDE1;
  letter-spacing: 0.23px;
}
</style>
