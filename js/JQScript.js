$(window).on('load',function(){
	waterfall();
	var dataInt = {'data':[{'src': '14.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'15.jpg'},{'src':'4.jpg'},{'src':'10.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSide){
			$.each(dataInt.data, function(index,value) {
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','img/'+$(value).attr('src')).appendTo(oPic);
			});
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs = $('#main>div');
	var width = $boxs.eq(0).outerWidth();//outerWidth():包含了边框和内边距；width():不包含边框和内边距
	var cols = Math.floor($(window).width()/width);
	$('#main').css({
		'width':cols*width+'px',
		'margin':'0 auto'
	});
	var hArr = [];
	$boxs.each(function(index,value){//index是索引，value是对应的DOM对象
		var height = $boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index] = height;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*width+'px'
			});
			hArr[minHIndex] += $boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSide(){
	var lastBox = $('#main>div').last();
	var lastBoxH = lastBox.offset().top+Math.floor(lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxH<scrollTop+documentH)?true:false;
}
