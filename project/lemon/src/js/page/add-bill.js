require(['../js/config.js'],function(){
	require(['mui','dom'],function(mui,dom){
		function init(){
			//初始化
			mui.init();
			//轮播图
			mui('.mui-slider').slider();
			//点击事件
			addEvent();
		}
		
		//点击事件
		function addEvent(){
			//键盘
			mui('.keyword').on('tap','span',function(){
				var val = this.innerHTML;
				var _text = dom('.text');
				if(val=='x'){
					_text.innerHTML = _text.innerHTML.slice(0,_text.innerHTML.length-1);
					if(_text.innerHTML.length==0){
						_text.innerHTML='0.00'
					}
					return
				}
				if(_text.innerHTML=='0.00'){
					_text.innerHTML='';
					_text.innerHTML+=val
				}else{
					_text.innerHTML+=val
				}
			})
			//tab
			var tabItem = Array.from(dom('.tab-list').querySelectorAll('span'));
			mui('.tab-list').on('tap','span',function(){
				for(var i=0;i<tabItem.length;i++){
					tabItem[i].classList.remove('active')
				}
				this.classList.add('active');
			})
			
		}
		init();
	})
})