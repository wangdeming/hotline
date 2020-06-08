<template>
  <div class="contentDiv clearfix">
     <div class="time1">
        <div class="center-top">
              <date-select @change="onChangeDate"></date-select>
          </div>
      </div> 
    <div id="SZmain">
       <div class="leftListBox">
            <div class="head">
                <div class="titleBox">
                    <div class="titleImg"></div>
                    <div class="font1">行政区域分析库</div> 
                </div>
            </div>
            <div class="clear"></div>
            <!-- 表格-->
            <table id="table" ></table>
        </div>
        <div class="rightListBox">
             <div class="rightChart">
                <div class="divTitle">
                    <span>承办量分布</span>
                    <a></a>
                </div>
                <chart ref="rightBottom" :options="rightBottom" :auto-resize="true"></chart>
            </div>         
        </div> 
    </div>
 
  </div>
</template>

<script>
import cfg from '@/api/config'
import api from '@/api'
import DateSelect from '@/components/DateSelect'
export default {
  name: 'Szdw',
  props: ['departType', 'query'],
  components: {
    DateSelect
  },
  mounted () {
    const _this  =this;
    $(function(){
       $('#table').on('click-row.bs.table', function (e, row, element){
        //$(element).css({"color":"blue","font-size":"16px;"});
        log.debug(row);
        _this.gotoPage(row);
  });
      $('#table').bootstrapTable({
      method:"post",
      url: cfg.getUrl('departhomepage_page'), 
      cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
      pagination: true, // 分页组件
      pageList: [1, 15], // 页面可以显示的数据条数
      pageSize: 15, // 页面数据条数
      pageNumber: 1 ,// 首页页码
      sidePagination: 'server', // 设置为服务器端分页
      contentType : "application/x-www-form-urlencoded",
      queryParams: function (params) {
          var offset = (this.pageNumber-1)*this.pageSize
          return {
            // timeScope:"1",//时间范围-本周、月
            beginTime:_this.startTime,
            endTime:_this.endTime,
            timeScope:_this.timeScope,
            departType: '2',
            offset: offset,
            limit: this.pageSize,
          }
      },
      columns: [
          {
              field: '', 
              title: '序号', 
              align: 'left', // 左右居中
              valign: 'middle', //
              width: 100,
              formatter: function (value, row, index) {
                    return index+1;
                    // var page = getPage();
                    // var num = page.pageSize*(page.pageNumber-1)+index+1;
                    // return num;
             }     
          }, {
              field: 'name',// 返回json数据中的name
              title: '单位名称',
              align: 'left',
              valign: 'middle'
          }, {
              field: 'score',
              title: '综合评分',
              align: 'center',
              valign: 'middle'
          }, {
               field: 'appealNum',
               title: "承办量（件）",
               align: 'center',
               valign: 'middle',
               width: 100, 
          }, {
               field: 'finishedAppealNum',
               title: "回复量（件）",
               align: 'center',
               valign: 'middle',
               width: 100, 
          }, {
               field: 'replayOnTimeRate',
               title: "按期回复率",
               align: 'center',
               valign: 'middle',
               width: 100, 
          },{
               field: 'praiseRate',
               title: "群众满意度",
               align: 'center',
               valign: 'middle',
               width: 100, 
          }
      ],
      onLoadSuccess: function(){  //加载成功时执行
            // console.info("加载成功");
      },
      onLoadError: function(){  //加载失败时执行
            // console.info("加载数据失败");
      }



      });
    })
  },
  data () {
        var rightBottomData = new Array();
        return {
            timer: null,
            startTime: '',
            endTime: '',
            timeScope: 1,
            colors:['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
      '#8d98b3','#e5cf0d','#97b552','#dc69aa','#9a7fd1',
      '#588dd5','#f5994e','#1FD2FF','#FF9F7F'],
            rightBottom:{
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // left:'10%',
                    // right : '10%',
                    top : '75%',
                    // x : 'center',
                    // y : 'bottom',
                    width: '80%',
                    height: '80%',
                    itemWidth: 14,
                    itemHeight: 14,
                    padding: [30, 30],
                    itemGap: 20,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: 'PingFangSC-Regular',
                    },
                data:[]
                },
                series : [
                    {
                        name:'承办量分布',
                        type:'pie',
                        radius : 150,
                        center : ['50%', '40%'],
                        data:[]
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
  methods : {
    gotoPage(item){
        this.$router.push({
        name: 'xzzhfx',
        params: {
          departId: item.id
        },
        query: {
          type: 'xzqy'
        }
      });
    },
    getPage(){
            return {
                pageSize:this.pageSize,
                pageNumber:this.pageNumber
        }   
      },  
    initIndex () {
       this.getTaskDistribution();
       $('#table').bootstrapTable('refresh', {query: {
          beginTime:this.beginTime,
          endTime:this.endTime,
          timeScope:this.timeScope,
       }});
    },
    onChangeDate (state) {
      this.timeScope = state.timeScope;
      this.startTime = state.beginTimeFormatted;
      this.endTime = state.endTimeFormatted;
      this.initIndex(); 
      $('#table').bootstrapTable('refresh', {query: {
          beginTime:this.beginTime,
          endTime:this.endTime,
          timeScope:this.timeScope,
       }});
    }, 
    getTaskDistribution(){
      api.get_taskDistribution({
        departType:2,
        beginTime:this.startTime,
        endTime:this.endTime,
        timeScope:this.timeScope,
        topNum:14,
        containElseNum:true
      }).then(res =>{
          var data = res.data;
          var taskDistributionArray = new Array();
          var taskArray = new Array();
          for (var i = 0;i<15;i++) {
              var temp = new Object();
              temp.value = data[i].value;
              temp.name = data[i].name;
              var colorObject = new Object();
              colorObject.color = this.colors[i];
              temp.itemStyle = colorObject;
              taskDistributionArray.push(temp);   
              taskArray.push(data[i].name);
          }           
          this.rightBottom.series[0].data = taskDistributionArray;
          this.rightBottom.legend.data = taskArray;
      })
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .fixed-table-container{
        border: none !important;
    }
    .fixed-table-body thead th .th-inner{
        color: #8E9FD5;
        font-size: 14px;
    } 
    .fixed-table-container thead th{
        border-left: none;
    }
    .bootstrap-table .table > thead > tr > th{
        border-bottom: none;
    }
    .table td, .table th{
        border-top: none;
    } 
    /*.table thead th{
        border-bottom: none;
    }*/
    .bootstrap-table .table{
        border-bottom: 1px dashed #fff;
    }
    .fixed-table-container tbody tr td{
        border-left: none;
        border-bottom: 1px dashed #7d88a9;
        color: #fff;
        font-size: 14px;
        letter-spacing: 0.18px;
        height: 45px;
        cursor: pointer;
    }
    .pagination-detail{
        display: none;
    }
    .fixed-table-pagination .pagination a{
        color: #fff !important;
    }
    .fixed-table-loading{
        background: transparent;
    }
    .no-records-found{}
</style>
<style scoped>
    .clear{
        clear: both;
    }
    #SZmain{
        width: 96.5%;
        margin-right: 2.5%;
        margin-left: 2.5%;
        position: relative;
    }
    .leftListBox{
        float: left;
        width: 62.5%;
        height: 840px;
        display: inline-block;
        /*margin-left: 2.5%;*/
        margin-right: 1%;
        background-color: rgba(99,123,190,0.10);
        padding: 20px 20px 20px 40px;
    }
    .rightListBox{
        position: absolute;
        float: left;
        display: inline-block;
        width: 35%;
        height: 840px;
        background-color: rgba(99,123,190,0.10);
    }
    .head{
        width: 100%;
        height: 40px;
    }
    .titleBox{
        display: inline-block;
        float: left;
        width: 25%;
    }
    .titleImg{
        height: 16px;
        width: 16px;margin-top: 4px;
        background-image: url('../assets/库.svg');
        display: inline-block;
        float: left;
        margin-right: 8px;
    }
    .searchBox{
        display: inline-block;
        float: right;
        width: 25%;
    }
    .search{
        width:100%; 
        background: none;
        border:none;
        border-bottom: solid 2px #55DDE1;
    }
    .searchImg{
        height: 20px;
        width: 20px;
        float: right;
        background-image: url('../assets/搜索.svg');
        margin-top: -25px;
        cursor: pointer;
    }
    .font1{
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #55DDE1;
        letter-spacing: 0.2px;
    }
    .rightChart{
        width: ;
        height: 281px;
    }
    .rightChart>.divTitle>span{
        width: 240px !important;
    }
    .echarts{
        width: 100%;
        height: 600px;
    }
    .comDiv{
        width: 100%;
        height: calc(100% - 58px);
    }
    .comItem{
        width: 50%;
        height: 20px;
        line-height: 20px;
        margin-top: 30px;
        float: left;
    }
    .comSpan{
        display: inline-block;
        width: 14px;
        height: 14px;
        float: left;
        margin-right: 10px;
    }
    .comName{
        width: auto;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #FFFFFF;
    }
    .divTitle{
        width: 100%;
        height: 58px;
        position: relative;
        margin-bottom: 40px;
    }
    .divTitle>span{
        display: inline-block;
        width: 160px;
        height: 38px;
        line-height: 38px;
        position: absolute;
        top: 20px;
        left: 50%;
        -webkit-transform:translateX(-50%);
        transform:translateX(-50%);
        font-size: 16px;
        color: #55DDE1;
        letter-spacing: 0.2px;
        text-align: center;
        background-image: url(../assets/title.png);
        background-size: 100% 100%;
    }

    .time1{
    width: 95%;
    height: 60px;
    background: rgba(99,123,190,0.10);
    margin: 10px;
    margin-right: 2.5%;
    margin-left: 2.5%;
    }
    .center-top{
    padding-top: 15px;
    padding-left: 15px;
    }
    

</style>
