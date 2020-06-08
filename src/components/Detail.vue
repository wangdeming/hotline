<template>
    <div class="col-lg-12 detail">

      <ul  class="col-lg-12 detailtop clearfix">
        <li class="col-lg-4">
          诉求主题：<span class="whitefont" v-text="detaildata.title"></span>
        </li>
        <li class="col-lg-4">
          诉求编号：<span class="whitefont" v-text="detaildata.code"></span>
        </li>
        <li class="col-lg-4">
          诉求来源：<span class="whitefont" v-text="detaildata.sourceStr"></span>
        </li>
        <li class="col-lg-4">
          诉求人姓名：<span class="whitefont" v-text="detaildata.askerName"></span>
        </li>
        <li class="col-lg-4">
          诉求人性别：<span class="whitefont">{{detaildata.askSex | tosexstr}}</span>
        </li>
        <li class="col-lg-4">
          诉求人电话：<span class="whitefont" v-text="detaildata.askerPhone"></span>
        </li>
        <li class="col-lg-4">
          诉求人邮箱：<span class="whitefont" v-text="detaildata.askerEmail"></span>
        </li>
        <li class="col-lg-4">
          反映时间：<span class="whitefont" v-text="detaildata.askTime"></span>
        </li>
        <li class="col-lg-4">
          查询密码：<span class="whitefont" v-text="detaildata.queryPass"></span>
        </li>
        <li class="col-lg-4">
          诉求人职业：<span class="whitefont" v-text="detaildata.askerCareer"></span>
        </li>
        <li class="col-lg-8">
          诉求人IP：<span class="whitefont" v-text="detaildata.askerIp"></span>
        </li>
        <li class="col-lg-12">
          诉求人地址：<span class="whitefont" v-text="detaildata.askAddress"></span>
        </li>
        <li class="col-lg-4">
          状态：<span class="whitefont" v-text="detaildata.statusStr"></span>
        </li>
        <li class="col-lg-8">
          评价时间：<span class="whitefont" v-text="detaildata.levelDate"></span>
        </li>
        <li class="col-lg-4">
          反映类别：<span class="whitefont" v-text="detaildata.typeStr"></span>
        </li>
        <li class="col-lg-8">
          诉求人满意度评价：<span class="whitefont" v-text="detaildata.dealLevelStr"></span>
        </li>
        <li class="col-lg-4">
          诉求类别：<span class="whitefont" v-text="detaildata.catagory"></span>
        </li>
        <li class="col-lg-8">
          满意度评价：<span class="whitefont" v-text="detaildata.dealLevelStr"></span>
        </li>
        <li class="col-lg-4">
          所在县市区（管委会）：<span class="whitefont" v-text="detaildata.askDistrict"></span>
        </li>

        <li class="col-lg-8">
          是否重复诉求：<span class="whitefont" >{{detaildata.isRepeat|toboolstr}}</span>
        </li>
      </ul>
      <div class="clearfix bgrg">
        反映的内容：<span class="whitefont" v-text="detaildata.askContent"></span>
      </div>
      <div class="bgrg">
        备注：<span class="whitefont"  v-text="detaildata.remark"></span>
      </div>
      <div class="bgrg">

        <ul  v-for="(item,index) in detaildata.deals"  class="col-lg-12 detailtop clearfix whitefont borderbt" >
          <li class="col-lg-4" ><span style="color: #50E3C2">交办/承办部门：</span><span   v-text="item.dealOrgName"></span></li>
          <li class="col-lg-4" ><span style="color: #50E3C2">经办人：</span><span   v-text="item.dealerName"></span></li>
          <li class="col-lg-4" ><span style="color: #50E3C2">处理类型：</span><span  v-text="item.typeStr"></span></li>
          <li class="col-lg-12" ><span style="color: #50E3C2">交办意见：</span><span  v-text="item.dealContent"></span></li>
        </ul>


      </div>
      <div class="bgrg">
        <ul  class="col-lg-12 detailtop clearfix">
          <li class="col-lg-6">
            办理时限：<span class="whitefont" v-text="detaildata.finalDate"></span>
          </li>
          <li class="col-lg-6">
            回复时间：<span class="whitefont" v-text="detaildata.responseTime"></span>
          </li>
          <li class="col-lg-12">
            回复内容：<span class="whitefont" v-text="detaildata.responseContent"></span>
          </li>
          <!--<li class="col-lg-12">-->
            <!--回复图片：<span class="whitefont" v-text="detaildata.remark"></span>-->
          <!--</li>-->
        </ul>
      </div>

    </div>

</template>

<script>
  import api from '@/api'

    export default {
        name: "Detail",
        props: {
          id: String,
        },
        data(){
          return {
            detaildata:{},
          }
        },
        created(){
          log.debug(this.id);
          this.get_detail();
        },
        methods:{
          get_detail(){
            api.get_detail({
              id:this.id,
            }).then(res => {
              // log.debug('get_detail', res);
              this.detaildata=res.data;
            });
          },
          dealContentf(str){
            log.debug(str);
            return ''+str;
          }

        },
        filters: {
          tosexstr: function (value) {
            if (value==1) return '男';
            return '女'
          },
          toboolstr: function (value) {
            if (value==1) return '是';
            return '否'
          },
        }
    }
</script>

<style scoped>
  div,ul,li{margin:0;padding:0;}
  ul{line-style:none;}
  .detailtop{
    margin-top: 20px;
    padding-bottom: 15px;
  }
  .detailtop:first-child{
    margin-top: 0px;
  }
  .detailtop li {
    list-style: none;
    float: left;
    line-height: 30px;

  }
  .detail{
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #50E3C2;
    letter-spacing: 0.14px;
    min-height: 700px;
    border-radius: 2px;
  }
  .whitefont{
    color:#FFFFFF
  }
  .bgrg{
    background: rgba(60,83,140,0.31);
    padding: 20px 30px;
    margin-top:10px;
  }
  .borderbt{
    border-bottom: 1px dashed #8E9FD5;
  }
</style>
