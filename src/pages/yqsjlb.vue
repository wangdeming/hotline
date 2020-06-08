<template>
  <div class="contentDiv clearfix">   
    <div id="SZmain">
      <div class="head">
          <div class="titleBox">
              <div class="titleImg"></div>
              <div class="font1">热点事件列表</div> 
          </div>
          <div class="searchBox">
            <div v-on:click="searchName" class="searchImg"></div>
            <input v-model="keyword" @keyup.enter="searchName" class="search font1" type="" name="" placeholder="请输入热点事件名称">
              
          </div>
      </div>
      <div class="clear"></div>
      <!-- 表格-->
      <div class="yqsjlbTable">
        <table id="table"></table>
      </div>
    </div>
  </div>
</template>

<script>
import cfg from '@/api/config'
import api from '@/api'
export default {
  name: 'Szdw',
  mounted () {
    const _this =this;
    $(function(){
       $('#table').on('click-row.bs.table', function (e, row, element){
        log.debug(row);
        _this.gotoPage(row);
  });
      var tableName  = $('#table');
      tableName.bootstrapTable({
      method:"post",
      url: cfg.getUrl('hotevent_page'), 
      cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
      pagination: true, // 分页组件
      pageList: [1, 15], // 页面可以显示的数据条数
      pageSize: 15, // 页面数据条数
      pageNumber: 1 ,// 首页页码
      sidePagination: 'server', // 设置为服务器端分页
      contentType : "application/x-www-form-urlencoded",
      queryParams: function (params) {
          var offset = (this.pageNumber-1)*this.pageSize;
          return {
            pageNumber:this.pageNumber,
            pageSize:this.pageSize,
            keyword:_this.keyword
          }
      },
      responseHandler: function(res) {
          return {
              "total": res.data.total,//总页数
              "rows": res.data.list   //数据
           };
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
              field: 'content',// 返回json数据中的name
              title: '事件名称',
              align: 'left',
              valign: 'middle'
          }, {
              field: 'happenTime',
              title: '首件诉求反映时间',
              align: 'center',
              valign: 'middle',
              width: 200,
          }, {
               field: 'heat',
               title: "热度",
               align: 'center',
               valign: 'middle',
               width: 150,
               cellStyle:{
                 css:{"color":"yellow"}
               } 
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
        return {
            keyword:''
        }
  },
  created () {
    this.initIndex();
  },
  destroyed () {
    this.initIndex();
  },
  methods : { 
    gotoPage (item) {
      this.$router.push({
        name: 'yqzhfx',
        params: {
          eventId: item.id
        },
        query: {
          type: 'yqsj'
        }
      });
    },
    initIndex () {
       $('#table').bootstrapTable('refresh', {query: {
          pageNumber:this.pageNumber,
            pageSize:this.pageSize,
       }});
    },    
    searchName(){
      $('#table').bootstrapTable('refresh', {query: {
          pageNumber:this.pageNumber,
          pageSize:this.pageSize,
          keyword:this.keyword,
      }});
    },
    
    // jumpToDetail(){
    //     $("#table").bootstrapTable({
    //     onClickRow: function (row) { log.debug("click:" + row.name) }
    //     }) 
    // },
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input,button,a {
    outline:0 none !important; blr:expression(this.onFocus=this.blur());
    }
    .clear{
        clear: both;
    }
    #SZmain{
        width: 95%;
        margin-right:3.5%;
        margin-left: 2.5%;
        position: relative;
    }
    .head{
        width: 100%;
        height: 60px;
        padding:16px 20px;
        background-color: rgba(99,123,190,0.10);
    }
    .titleBox{
        display: inline-block;
        float: left;
        width: 25%;
    }
    .titleImg{
        height: 16px;
        width: 16px;
        margin-top: 5px;
        background-image: url('../assets/列表icon.svg');
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
    .yqsjlbTable{
      width: 100%;
      height: 840px;
      margin-top: 10px;
      padding: 0 15%;
      background-color: rgba(99,123,190,0.10);
    }
</style>
