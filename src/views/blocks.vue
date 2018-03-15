<style lang="less" scoped>
  @import "../styles/common.css";
  .blocks{
    // width: 1170px;
		margin: 100px 0 60px 0;
		font-size: 14px;
		.container{
        margin-right: auto;
        margin-left: auto;
        padding: 0 15px;
        h1{
            font-size: 36px;
            margin: 20px 0 15px 0;
            font-weight:400;
        }
        .search-show {
            // display: none;
            border-color: #e7e7e7;
            margin-top: 23px;
            margin-left: 15px;
            #search-form{
              width: 100%;
            }
        }
        .ivu-table-tbody{
          a{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .ivu-table-cell{
            padding-left: 12px;
            padding-right: 12px;
          }
        }
    }
    .ivu-table-cell{
      padding-left: 12px;
      padding-right: 12px;
    }
    .page{
      display: inline-block;
      cursor: pointer;
      background-color: #eceff1;
      border-radius: 2px;
      border: 1px solid #cfd8dc;
      margin: 10px 5px;
      padding: 8px 10px;
    }
  }
</style>

<template>
  <div class="blocks">
    <div class="container">
      
      <h1>Latest Blocks<p></p></h1>
      <!-- <Table :columns="(screenWidth > 550)? Blocks.thead : Blocks.thead1" :data="Blocks.blocks" no-data-text=""></Table> -->
      <Table :columns="(screenWidth > 650) ? Blocks.thead : Blocks.thead1" :data="blocks" no-data-text=""></Table>
      <Row>
        <div class="page" @click="previousPage($event)" v-if="page > 1">
          Previous page
        </div>
        <div class="page" @click="nextPage($event)" v-if="Blocks.blocks != []">
          Next page
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
  import config from "../config/config";

  export default {
    name: "blocks",
    components: {
      
    },
    computed: {
      screenWidth() {
        return this.$store.state.screen.screenWidth
      },
      blocks() {
        return this.$store.state.blocks
      }
    },
    data () {
      return {
        page: 1,
        Blocks:{
					thead:[
						{
							title: 'Height',
							key: 'result.height',
							render: (h, params) => {
								return h('div', [
									h('router-link', {
										props: {
											to: {
												path: '/blockinfo', query: { param: params.row.result.height }
											}
										}
									}, params.row.result.height)
								])
							}
						},
						{
							title: 'Timestamp',
							key: 'Approx.Time',
							width:'180px',
							align: 'center',
							render: (h, params) => {
								return h( "span", params.row.result.time ? params.row.result.time : 0)
							}
						},
						{
							title: 'Transactions',
							key: 'Transactions',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.result.tx ? params.row.result.tx.length : 0)
							}
						},
						{
							title: 'Size',
							key: 'size',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.result.size ? params.row.result.size : 0)
							}
						},
						{
							title: 'Confirmations',
							key: 'confirmations',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.result.confirmations ? params.row.result.confirmations : 0)
							}
						},
						{
							title: 'Version',
							key: 'version',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.result.version ? params.row.result.version : 0)
							}
						},
					],
					thead1:[
						{
							title: 'Height',
							key: 'result.height',
							render: (h, params) => {
								return h('div', [
									h('router-link', {
										props: {
											to: {
												path: '/blockinfo', query: { param: params.row.result.height }
											}
										}
									}, params.row.result.height)
								])
							}
						},
						{
							title: 'Timestamp',
							key: 'Approx.Time',
							width:'180px',
							align: 'center',
							render: (h, params) => {
								return h( "span", params.row.result.time ? params.row.result.time : 0)
							}
						},
						{
							title: 'Transactions',
							key: 'Transactions',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.result.tx ? params.row.result.tx.length : 0)
							}
						}
          ],
          blocks:[]
        }
      };
    },

    created () {

      let _this = this;
      let getData = this.page;
      this.getBlocks(getData);
      
    },
    mounted () {

    },
    methods: {

      getBlocks(getData) {
        var _this = this;
        $.getJSON(config.api.dev + 'index3',{ 'page' : getData },function(data,status){
          if (!data.error) {
            // _this.Blocks.blocks = [];
            window.scrollTo(0, 0);
            _this.$store.commit('getblocksData',data);
            // _this.Blocks.blocks = data.block
          }else{
            _this.Blocks.blocks = [];
          }
        });

      },

      nextPage() {
        // console.log('下一页');
        this.page = this.page + 1;
        var getData = this.page;
        this.getBlocks(getData);
      },
      
      previousPage() {
        // console.log('上一页')
        if (this.page > 1) {
          this.page = this.page - 1;
          var _this = this;
          var getData = this.page;
          this.getBlocks(getData);
        }else {
          return;
        }
      },

    },
    watch: {
      
    }
  }
</script>