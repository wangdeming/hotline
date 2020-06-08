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
                    <div class="font1">市直单位综合库</div> 
                </div>
                <div class="searchBox">
                  <div @click="searchName" class="searchImg"></div>
                  <input 
                  v-model="keyword" 
                  @keyup.enter="searchName" 
                  class="search font1" type="" name="" placeholder="请输入单位名称">
                </div>
            </div>
            <div class="clear"></div>
            <!-- 表格-->
            <table id="table"></table>
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
  // props: ['departType'],
  components: {
    DateSelect
  },
  mounted () {
    const _this =this;
    $(function(){
       $('#table').on('click-row.bs.table', function (e, row, element){
        //$(element).css({"color":"blue","font-size":"16px;"});
        log.debug(row);
        _this.gotoPage(row);
      $('#table').ul.parentNode('pagination').removeClass('float-right');
  });
      var tableName  = $('#table');
      tableName.bootstrapTable({
      method:"post",
      contentType : "application/x-www-form-urlencoded",
      url: cfg.getUrl('departhomepage_page'), 
      cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
      sidePagination: 'server', // 设置为服务器端分页
      pagination: true, // 分页组件
      pageList: [1, 15], // 页面可以显示的数据条数
      pageSize: 15, // 页面数据条数
      pageNumber: 1 ,// 首页页码 
      queryParamsType:'limit',//查询参数组织方式
      queryParams: function (params) {
          var offset = (this.pageNumber-1)*this.pageSize
          this.offset = offset
          return {
            // timeScope:"1",//时间范围-本周、月
            beginTime:_this.startTime,
            endTime:_this.endTime,
            timeScope:_this.timeScope,
            departType: '1',
            offset: offset,
            limit: this.pageSize,
            keyword:_this.keyword
          }
      },
      responseHandler: function(res) {
          return {
              "total": res.total,//总页数
              "rows": res.rows   //数据
           };
           console.log("1:"+this.keyword);
      },
      columns: [
          {
              field: '', 
              title: '序号', 
              align: 'left', // 左右居中
              valign: 'middle', //
              width: 100,
              formatter: function (value, row, index) {
                    // return index+1;
                  var pageSize = tableName.bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
                   var pageNumber =tableName.bootstrapTable('getOptions').pageNumber; 
                   var offset = (pageNumber-1)*pageSize
                    return offset+index+1;
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
              valign: 'middle',

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
            keyword:'',
            timer: null,
            startTime: '',
            endTime: '',
            timeScope: 1,
            colors:[ '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
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
    // getPage(page){
    //     return {
    //         pageSize:this.pageSize,
    //         pageNumber:this.pageNumber
    //     }   
    //   }, 
    onChangeDate (state) {
      this.timeScope = state.timeScope;
      this.startTime = state.beginTimeFormatted;
      this.endTime = state.endTimeFormatted;
      this.initIndex();
      // console.log("2:"+this.keyword)
    }, 
    initIndex () {
       this.getTaskDistribution();
       $('#table').bootstrapTable('refresh', {query: {
          beginTime:this.startTime,
          endTime:this.endTime,
          timeScope:this.timeScope,
          keyword:this.keyword
       }});
       log.debug("时间段："+this.timeScope);
       // console.log("3:"+this.keyword)
    },    
    searchName(){
      $('#table').bootstrapTable('refresh', {query: {
          beginTime:this.startTime,
          endTime:this.endTime,
          timeScope:this.timeScope,
          keyword:this.keyword,
          offset: this.offset,
      }});
          // console.log("4:"+this.keyword);
    },
    // jumpToDetail(){
    //     $("#table").bootstrapTable({
    //     onClickRow: function (row) { log.debug("click:" + row.name) }
    //     }) 
    // },
    getTaskDistribution(){
      api.get_taskDistribution({
        departType:1,
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
        font-family: PingFangSC-Regular;
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
        font-family: PingFangSC-Regular;
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
    .no-records-found{
      /*display: none;*/
    }
    .page-item{
      /*background-color: rgba(99,123,190,0.10);*/
    }
    .page-item.active,.page-link{
      border-color:#b9c3cf !important;
      /*background-color: none;*/
      background: #45538C;
      
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    }
</style>
<style scoped>
    input,button,a {
    outline:0 none !important; 
    }
    a {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    }
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
        width: 30%;
        border-bottom: solid 2px #55DDE1;
    }
    .search{
        width:90%; 
        background: none;
        border:none;
        /*border-bottom: solid 2px #55DDE1;*/
    }
    .search:active{
        border:none;
    }
    .searchImg{
        display: inline-block;
        height: 20px;
        width: 20px;
        float: right;
        background-image: url('../assets/搜索.svg');
        cursor: pointer;
        /*margin-top: -25px;*/
    }
    .searchBox >input::placeholder{
      font-size: 13px;
      color: rgba(85,221,225,0.60);
      letter-spacing: 0.16px;
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
