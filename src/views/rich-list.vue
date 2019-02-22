<style lang="less" scoped>
@import "../styles/common.css";
.rich-list {
  h2 {
    text-align: center;
    padding-top: 50px;
  }
  margin-bottom: 60px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .tdBg {
    background-repeat: no-repeat;
    background-size: 90% 100%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEVxzZ0Co3lHAAAAAXRSTlMmkutdmwAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=");
  }
}
.myTable tr {
  text-align: left;
}
.myTable tr td,
.myTable tr th {
  white-space: nowrap;
}
</style>

<template>
  <div class="rich-list">

    <loader v-if="loading"></loader>
		
    <div class="container" v-if="!loading">
			<h2 class="pt25" style="">Lightning Bitcoin Rich List</h2>
			<div class="table-container" style="max-width: 780px;margin: 0 auto;">
				<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%" style="overflow:auto">
					<thead>
						<tr>
							<th>
								#
							</th>
							<th>
								Balance
							</th>
							<th>
								Addresses
							</th>
							<th>
								% Addresses
							</th>
              <th>
                Coins
              </th>
							<th>
								% Coins
							</th>
							<th>
								Time
							</th>
						</tr>
					</thead>
					<tbody is="transition-group" name="list">
						<tr v-for="item in richList" :key="item['Addresses']">
							<td>{{item['index']}}</td>
							<td>{{item['threshold']}}</td>
							<td>{{item['Addresses']}}</td>
							<td :style="item['% Addresses Style']" class="tdBg">{{item['% Addresses']}}</td>
              <td>{{item["Coins"]}}</td>
							<td :style="item['% Coins Style']" class="tdBg">{{item['% Coins']}}</td>
							<td>{{item['time']}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2 class="pt25" style="">Top 300 Richest Lightning Bitcoin Address</h2>
			<div class="table-container" style="max-width: 1100px;margin: 0 auto;">
				<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%" style="overflow:auto">
					<thead>
						<tr>
							<th>
								#
							</th>
							<th>
								Address
							</th>
							<th>
								Balance
							</th>
							<th>
								% coins
							</th>
							<th>
								Time
							</th>
						</tr>
					</thead>
					<tbody is="transition-group" name="list">
						<tr v-for="item in top100List" :key="item['address']">
							<td>{{item['index']}}</td>
							<td>
								<router-link :to="{path:'/addrinfo',query: {param: item['address']}}" class="ellipsis">{{item['address']}}</router-link>          									
							</td>
							<td>{{item['balance']}}</td>
							<td :style="item['% Coins Style']" class="tdBg" :title="item['% Coins']">{{item['% Coins']}}</td>
							<td>{{item['time']}}</td>
						</tr>
					</tbody>
				</table>
			</div>
    </div>
  </div>
</template>

<script>
import config from "../config/config";
import Loader from "./loader.vue";
import calc from "calculatorjs";
import moment from "moment";

export default {
  name: "rich-list",
  components: {
    Loader
  },
  data() {
    return {
      loading: true,
      styled: {
        backgroundSize: "20% 100%"
      },
      page: 1,
      st: "",
      sw: true,
      sortStatus: "",
      openSort: {
        rankUp: true,
        rankDown: false,
        votesUp: false,
        votesDown: false,
        ratioUp: false,
        ratioDown: false
      },
      listwitnesses: [],
      richList: [],
      top100List: [],
      forgedtotal: 101,
      notforgedtotal: 0,
      notforgedarry: []
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screen.screenWidth;
    }
  },
  destroyed() {
    window.clearInterval(this.st);
    window.removeEventListener("scroll", this.handleFun);
  },
  created() {
    this.st = window.setInterval(() => {
      this.getlbtcrichpre();
      this.getlbtcrichlist();
    }, 600000);
    this.getlbtcrichpre();
    this.getlbtcrichlist();

    // window.addEventListener("scroll",this.handleFun);
  },
  mounted() {},
  methods: {
    handleFun() {
      var _this = this;
      window.addEventListener("scroll", function() {
        var scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        var innerHeight = window.innerHeight; 
        var offsetHeight = document.body.offsetHeight;
        var scrollHeight = document.documentElement.scrollHeight;
        if (innerHeight + scrollTop >= offsetHeight - 30) {
          if (_this.sw == true) {
            _this.sw = false;
            if (
              _this.page > 0 &&
              _this.page < Math.ceil(_this.listwitnesses1.length / 100)
            ) {
              _this.page = _this.page + 1;
              _this.listwitnesses = _this.listwitnesses1.slice(
                0,
                _this.page * 100
              );
              _this.sw = true;
            }
          }
        }
      });
    },

    getlbtcrichpre() {
      var _this = this;
      $.getJSON(config.api.dev + "v2/getlbtcrichpre", function(data, status) {
        if (data.error) {
          _this.listwitnesses1 = [];
        } else {
          let result = [];
          data.msg.forEach((item, index) => {
            let obj = {};
            obj.index = index + 1;
            if (index > 0) {
              obj["threshold"] =
                calc.div(data.msg[index - 1].threshold, 100000000) +
                " - " +
                calc.div(item.threshold, 100000000);
            } else {
              obj["threshold"] = "0 - " + calc.div(item.threshold, 100000000);
            }
            obj["Addresses"] = item.addresses;
            obj["% Addresses"] = (calc.div(item.addresses, data.alladdrs) * 100).toFixed(4) + "%";
            obj["Coins"] = calc.div(item.coins, 100000000).toFixed(0) + " LBTC";
            obj["% Coins"] = (calc.div(item.coins, data.allcoins) * 100).toFixed(4) + "%";
            obj["% Addresses Style"] = {
              backgroundSize: obj["% Addresses"] + " 100%"
            };
            obj["% Coins Style"] = {
              backgroundSize: obj["% Coins"] + " 100%"
            };
            obj.time = moment(data.timestamp * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            result.push(obj);
          });
          // console.log(result);
          _this.loading = false;
          _this.richList = result;
        }
      });
    },

    getlbtcrichlist() {
      var _this = this;
      $.getJSON(config.api.dev + "v2/getlbtcrichlist", function(data, status) {
        if (data.error) {
          _this.listwitnesses1 = [];
        } else {
          let result = [];
          data.msg.forEach((item, index) => {
            let obj = {};
            obj.index = index + 1;
            obj["address"] = item.address;
            obj["balance"] = calc.div(item.balance, 100000000).toFixed(0) + " LBTC";
            obj["% Coins"] = (calc.div(item.balance, data.allcoins) * 100).toFixed(4) + "%";
            obj["% Coins Style"] = {
              backgroundSize: obj["% Coins"] + " 100%"
            };
            obj.time = moment(data.timestamp * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            result.push(obj);
          });
          // console.log(result);
          _this.loading = false;
          _this.top100List = result;
        }
      });
    },

    insert_flg(num) {
      var num = (num || 0).toString(),
        result = "";
      while (num.length > 8) {
        result = "," + num.slice(-8) + result;
        num = num.slice(0, num.length - 8);
      }
      if (num) {
        result = num + result;
      }
      return result;
    },

    toPercent(param) {
      Number.prototype.toPercent = function() {
        return (Math.round(param * 10000) / 100).toFixed(2) + "%";
      };
    }
  },
  watch: {}
};
</script>