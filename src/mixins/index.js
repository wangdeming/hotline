import { mapState } from 'vuex'

export default {
  props: ['params', 'query'],
  created () {
    log.debug('[mixins]' + this.msg + ':', this.params);
  },
  mounted () {},
  methods: {
    m_clickLeftNav (item) {
      log.debug(item);
      this.$router.push({
        name: item.rname,
        params: this.params,
        query: this.query
      });
    },
    m_getPageIndex(rname){
      switch(rname || this.$route.name){
        case 'Index':
          return 0
        case 'Szdw':
        case 'szzh':
        case 'szzhfx':
        case 'szsqlb':
        case 'szsqcl':
        case 'szrqhx':
          return 1
        case 'Xzqy':
        case 'xzzh':
        case 'xzzhfx':
        case 'xzsqlb':
        case 'xzsqcl':
        case 'xzrqhx':
          return 2
        case 'Yqsj':
        case 'yqsjlb':
        case 'yqzh':
        case 'yqzhfx':
        case 'yqfzqs':
        case 'yqrdly':
        case 'yqrwhx':
          return 3
      }
      return 0;
    },
    m_getLeftNavIndex(rname){
      switch(rname || this.$route.name){
        case 'szzhfx':
        case 'xzzhfx':
        case 'yqzhfx':
          return 0;
        case 'szsqlb':
        case 'xzsqlb':
        case 'yqfzqs':
          return 1;
        case 'szsqcl':
        case 'xzsqcl':
        case 'yqrdly':
          return 2;
        case 'szrqhx':
        case 'xzrqhx':
        case 'yqrwhx':
          return 3;
      }
      return 0;
    },
  },
  computed: {
    ...mapState({
      s_index: 'index',
      s_dept: 'dept',
      s_event: 'event',
    }),
  },
  // watch: {
  //   '$route' (to, from) {
  //     log.debug(arguments)
  //   }
  // }
}