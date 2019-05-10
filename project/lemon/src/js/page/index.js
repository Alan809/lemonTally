require(['./js/config.js'], function() {
	require(['mui', 'picker', 'dom', 'dtpicker',  'echarts','poppicker'], function(mui, picker, dom, dtpicker, echarts) {
		var picke;
		var dtPicker;
		var curYear = new Date().getFullYear(), //年
			curMonth = new Date().getMonth() + 1, //月
			_selectDate = dom('.select-data'),
			status = 'month';

		function init() {
			//初始化
			mui.init();
			//滚动事件
			initScroll();
			//初始化时间
			initData();
			//点击事件
			addEvent();
			//初始化图表
			initEcharts();
			//禁止侧滑菜单
			dom('.mui-inner-wrap').addEventListener('drag', function(event) {
				event.stopPropagation();
			});
		}
		//滚动
		function initScroll() {
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		}
		//初始化年月
		function initData() {
			picker = new mui.PopPicker();
			picker.setData([{
				value: 'month',
				text: '月'
			}, {
				value: 'year',
				text: '年'
			}]);
			//初始化时间
			dtPicker = new mui.DtPicker({
				type: 'month'
			});
		}
		//初始化图表
		function initEcharts() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main'));

			// 指定图表的配置项和数据
			var option = {
				series: [
					{
						name:'访问来源',
						type:'pie',
						radius: ['40%', '55%'],
						data:[
							{value:335, name:'直达'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1048, name:'百度'},
							{value:251, name:'谷歌'},
							{value:147, name:'必应'},
							{value:102, name:'其他'}
						]
					}
				]
			};
		
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}


		//点击事件
		function addEvent() {
			// 打开侧边栏
			dom('.open-aside').addEventListener('tap', function() {
				mui('.mui-off-canvas-wrap').offCanvas('close');
			})

			//关闭侧边栏
			dom('.close-aside').addEventListener('tap', function() {
				mui('.mui-off-canvas-wrap').offCanvas('show');
			})
			//点击切换年月
			dom('.select-type').addEventListener('tap', function() {
				var that = this
				picker.show(function(selectItems) {
					that.innerHTML = selectItems[0].text;
					status = selectItems[0].value;
					var _monthShow = dom('.month-show'),
						_yearShow = dom('.year-show'),
						config = {
							status: 'inline-block',
							width: '50%'
						};
					console.log(_selectDate)
					if (status === 'month') {
						_selectDate.innerHTML = curYear + "-" + curMonth;
					} else {
						_selectDate.innerHTML = curYear;
						config = {
							status: 'none',
							width: '100%'
						};
					}

					dom('h5[data-id="title-m"]').style.display = config.status;
					dom('h5[data-id="title-y"]').style.width = config.width;
					dom('.mui-picker[data-id="picker-m"]').style.display = config.status;
					dom('.mui-picker[data-id="picker-y"]').style.width = config.width;

					// 					_monthShow.style.display = status === 'month' ? 'block' : 'none';
					// 					_yearShow.style.display = status === 'month' ? 'none' : 'block';
				})
			})

			//点击切换时间
			dom('.select-data').addEventListener('tap', function() {
				var that = this
				dtPicker.show(function(selectItems) {
					curYear = selectItems.y.text;
					console.log(selectItems)
					if (status === 'month') {
						that.innerHTML = selectItems.value;
					} else {
						that.innerHTML = curYear;
					}
				})
			})
			
			//tab切换
			var tabItem = Array.from(dom('.tab-list').querySelectorAll('span'));
			mui('.tab-list').on('tap', 'span', function() {
				var id = this.getAttribute('data-id');
				if (id === '0') {
					dom('.bill-wrap').style.display = 'block';
					dom('.table-wrap').style.display = 'none';

				} else {
					dom('.table-wrap').style.display = 'block';
					dom('.bill-wrap').style.display = 'none';
				}
				for (i = 0; i < tabItem.length; i++) {
					tabItem[i].classList.remove('active')
				}
				this.classList.add('active');
			})
			
			//去添加账单页面
			dom('.go-bill').addEventListener('tap',function(){
				location.href='./page/add-bill.html'
			})
		}


		init();
	})
})
