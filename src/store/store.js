import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment"


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
    error: {
      errorShow: false,
      Message: 'Error'
    },
    screen: {
      screenWidth: document.body.clientWidth
    },
    index: {
      flag : 1,
      LatestBlocks: [],
      LatestTransactions: []
    },
    //block info
    block: {
      blockinfo: {},
      blockTable: {},
      totalpage: 0
    },
    //blocks
    blocks: [],
    //address
    address: {
      addrinfo: {},
      addrTable: [],
      totalpage: 0
    },
    //transction info
    transaction: {
      txinfo: {},
      total: {
        totalin : 0,
        totalout : 0
      }
    },
    //address1
    getaddressbalance:{},
    //Voters
    voters:{},
    //Votes
    votes:{}

	},
	getters: {

  },
  actions: {

  },
	mutations: {
    //错误信息
    errorMessage(state, data) {
      state.error.errorShow = data.status;
      state.error.Message = data.msg;
    },

    //例子 计数
    addCount(state, data) {
			state.index.flag = data + 1
    },

    //屏幕大小
    screenSize(state, data) {
      state.screen.screenWidth = data;
    },

    //index 数据
    getindexData(state, data) {
      var LatestTransactions = [];
      var result = [];
      // console.log(result)
      data.forEach(( item, index) => {
        item.result.time = moment(item.result.time*1000).format("YYYY-MM-DD HH:mm:ss");
        result.push(item.result);
        if (item.result.tx) {
          item.result.tx.forEach(( item1, index) => {
            var transItem = {};
            transItem.txhash = item1;
            transItem.time = item.result.time;
            LatestTransactions.push(transItem);
          });
        };
      });
      // console.log(result);
      // console.log(LatestTransactions);
      state.index.LatestBlocks = result;
      state.index.LatestTransactions = LatestTransactions;
    },

    //blocks
    getblocksData(state, data) {
      data.forEach(( item, index) => {
        item.result.time = moment(item.result.time*1000).format("YYYY-MM-DD HH:mm:ss");
      });
      state.blocks = data;
    },

    //block 数据
    getblockData(state, data) {
      var result = data[0].result
      result.time = moment(result.time*1000).format("YYYY-MM-DD HH:mm:ss");
      state.block.blockinfo = result
      state.block.blockTable = data[1]
      state.block.totalpage = result.tx.length
    },

    //transaction 数据
    gettransactionData(state, data) {
      var totalin = 0;
      var totalout = 0;
      data.result.vin.forEach((item, index) => {
        // console.log(item.value)
        if (item.value) {
          totalin = totalin + item.value * 100000000;
        }
      });
      data.result.vout.forEach((item, index) => {
        // console.log(item.value)
        if (item.value) {
          totalout = totalout + item.value * 100000000;
        }
      });
      state.transaction.txinfo = data.result
      state.transaction.total.totalin = totalin / 100000000;
      state.transaction.total.totalout = totalout / 100000000;
    },

    //address 数据
    getaddressData(state, data) {
      state.address.addrinfo = data.addrinfo
      state.address.addrTable = data.addrTable
      state.address.totalpage = data.totalpage
    },

    //addres simple 数据
    getaddressbalance(state, data) {
      state.getaddressbalance = data
    },

    //Voters
    getvoters(state, data) {
      state.voters = data.result
    },
    //Votes
    getvotes(state, data) {
      state.votes = data.result
    }

	}
})

export default store