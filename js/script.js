window.onload = function(){
	waterfall('main','box');
	var dataInt = {'data':[{'src': '14.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'15.jpg'},{'src':'4.jpg'},{'src':'10.jpg'}]};
	window.onscroll =function(){
		if(checkScrollSide){
			var oParent = document.getElementById('main');
			for(var i = 0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'img/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,box);//得到类名为box的集合
//	alert(oBoxs.length);//21
	var oBoxWidth = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxWidth);//获取照片列数
//	alert(cols);//6列
	oParent.style.cssText = "width: "+cols*oBoxWidth+"px;margin: 0 auto;";
	
	var hArr = new Array();//存放每一列的高度
	for(var i = 0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
//			hArr[i] = oBoxs[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,hArr);//找到数组里面的最小值
			var minHIndex = getminHIndex(hArr,minH);//找到数组中最小值的索引
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
//			oBoxs[i].style.left = minHIndex*oBoxWidth+'px';
			oBoxs[i].style.left = oBoxs[minHIndex].offsetLeft+'px';
			hArr[minHIndex] += oBoxs[i].offsetHeight; 
		}
	}
}

//封装通过className获取元素的函数
function getByClass(parent,clsName){
	var boxArr = new Array();
	var obj = parent.getElementsByTagName('*');
	for(var i=0;i<obj.length;i++){
		if(obj[i].className==clsName){
			boxArr.push(obj[i]);
		}
	}
	return boxArr;
}

//封装获取数组最小高度索引的函数
function getminHIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//检测是否满足滚动条加载的条件
function checkScrollSide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxHeight = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;//得到滚动条滚动的距离
	var height = document.body.clientHeight||document.documentElement.clientHeight;//得到可视区的高度
	return (lastBoxHeight<screenTop+height)?true:false;
}
