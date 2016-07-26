
/* JavaScript Document
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
*/
//--------------------------------------------------------
/*
功能:去除前后空格的函数
输入:字符串
输出:去除前后空格的字符串
*/
function jTrim(str)
{
    var m = str.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
function o(object,f){
	object.background="../gb/images/dh_bg2.gif"/*tpa=http://www.dg-pf.com/include/gb/images/dh_bg2.gif*/;
	f.style.color="#FFFFFF";
}
function c(object,f){
	object.background="";
	f.style.color="#797979";
}
//-------------------------------------------------------
/*
功能:检查字串是否为空
输入:字符串
输出:boolean值,true:字符串为空,false:字符串不为空
*/
function isNothing(str)
{
	if(jTrim(str)=="")
		return true;
	else
		return false;
}
//--------------------------------------------------------
/*
功能:检查字串是否为整数
输入:字符串
输出:boolean值,true:整数,false:非整数
*/
function isInt(str)
{
	if(parseInt(str).toString()==str.substr(0))
		return true;
	else
		return false;
}
//------------------------------------------------------
/*
功能:生成随机整数
输入:最大值,最小值
输出:随机整数
*/
function rndInt(upperbound,lowerbound){
	return parseInt((upperbound - lowerbound + 1) * Math.random() + lowerbound)
}
//------------------------------------------------------
/*功能:图片缩放
输入:图片对像,宽度,高度
输出:无
*/
function zoomImg(Obj,width,height)
{

	Obj.style.display="block"
	
	var wh
	var hw
	
	var w
	var h
	var d,s=""
	if(Obj.id==""){
		var d = new Date();
		s += d.getHours();
		s += d.getMinutes();
		s += d.getSeconds();
		s += d.getMilliseconds();
		s += rndInt(1000,0)
		Obj.id="img"+s
	}
	if(Obj.width>0)
	{
		if(width==null)width=Obj.width;
		if(height==null)height=Obj.height;
		w=width/Obj.width;
		h=height/Obj.height;
		
		wh=w*Obj.height;
		hw=h*Obj.width
		if(wh<=height&&width<Obj.width)
		{
			Obj.width=width
			Obj.height=wh
		}
		if(hw<=width&&height<Obj.height)
		{
			Obj.width=hw
			Obj.height=height
		}
	}
	else
	{
		window.setTimeout("zoomImg("+Obj.id+","+width+","+height+")",100)
	}
}
//-----------------------------------------------------------------------------------------
/*功能:按钮单击模拟超链接以便Asp中获得Request.ServerVariables("HTTP_REFERER")的值
输入:URL
输出:无
*/
function buttonClick(URL)
{
	strA="<a style='display:none' id=buttonClickURL href='"+URL+"'>buttonClick</a>"
	document.body.insertAdjacentHTML("afterBegin",strA);
	document.all.buttonClickURL.click();
}
//------------------------------------------------------------------------------------------
/*
功能: 删除确认
输入:确认字串
*/
function delConfirm(str){
	return window.confirm(str)
}
				
//---------------------------------------------------------------------------------------------
//功能:全选复选框或单选按扭
//输入:复选框或单选按扭对象
function allSelect(obj){
	if(typeof(obj.length)!="undefined"){
		for(var m=0;m<obj.length;m++){
			obj[m].checked=true;
		}
	}
	else{
		obj.checked=true;
	}
}
//---------------------------------------------------------------------------------------------
//功能:取消选择复选框或单选按扭
//输入:复选框或单选按扭对象
function cancelSelect(obj){
	if(typeof(obj.length)!="undefined"){
		for(var m=0;m<obj.length;m++){
			obj[m].checked=false;
		}
	}
	else{
		obj.checked=false;
	}
}
//------------------------------------------------------------------------------------------------
//功能:判断是否有选择其中的选项
//输入:复选框或单选按钮对象
//输出:True(有选择),False(无选择)
function isSelect(obj){
	if(typeof(obj.length)!="undefined"){
		for(m=0;m<obj.length;m++){
			if(obj[m].checked)
				return true;
		}
	}	
	else{
		if(obj.checked)
			return true;
	}
	return false;
}

//-------------------------------------------------------------------------------------------------
//功能:设置鼠标复盖时的样式
//输入:对象,颜色值
function mouseOver(obj,bgColor,color){
	obj.style.Cursor="hand";
	if(typeof(bgColor)=="undefined"||bgColor==null)bgColor=""
	if(typeof(color)=="undefined"||color==null)color=""
	obj.style.backgroundColor=bgColor;
	obj.style.Color=color
}
//-------------------------------------------------------------------------------------------------
//功能:设置鼠标离开时的样式
//输入:对象,颜色值
function mouseOut(obj,bgColor,color){
	if(typeof(bgColor)=="undefined"||bgColor==null)bgColor=""
	if(typeof(color)=="undefined"||color==null)color=""
	obj.style.backgroundColor=bgColor
	obj.style.color=color
}
//---------------------------------------------------------------------------------------------------
// 功能:检测浏览器属性
//例:
// var b = new BrowserInfo();
// alert(b.version); 
function BrowserInfo()
{
  this.name = navigator.appName;
  this.codename = navigator.appCodeName;
  this.version = navigator.appVersion.substring(0,4);
  this.platform = navigator.platform;
  this.javaEnabled = navigator.javaEnabled();
  this.screenWidth = screen.width;
  this.screenHeight = screen.height;
}
//功能:打开图片窗口
//输入:图片URL
function openImg(imgURL){
	var left=(screen.width-100)/2
	var top=(screen.height-100)/2
	imgWin=window.open("about:blank","","width="+100+","+"height="+100+",left="+left+",top="+top)
	imgWin.document.write("<html><head></head><body leftmargin='0' topmargin='0' marginwidth='0' marginheight='0'>")
	imgWin.document.write("<img id=tmpImg src='"+escape(imgURL)+"'></img>")
	imgWin.document.write("</brody></html>")
	imgWin.document.write("<")
	imgWin.document.write("script language=\"JavaScript\">")
	imgWin.document.write("function openImg(){if(tmpImg.readyState==\"complete\"){window.resizeTo(tmpImg.width+10,tmpImg.height+36);window.moveTo((screen.width-tmpImg.width)/2,(screen.height-tmpImg.height)/2)};else{window.setTimeout(\"openImg()\",500);}}openImg();")
	imgWin.document.write("<")
	imgWin.document.write("/script>")
}
//功能：检测日期格式
//输出：true:正确;false:不正确
function  jIsDate(strDate){  
	//判断是否为日期，要求格式2002-5-13或2002-05-13，是返回true,否返回false
	var str=strDate;
	if(jTrim(str)==""){
		return true;
	}
    var flag;
    //用正则表达式判断
    var reg=/^\d{4}-\d{1,2}-\d{1,2}$/;
    flag=reg.test(str);
    if(flag==false) return flag;

    //判断日期是否正确
    var YMD;
    YMD=str.split("-");
    var year,month,date;            //年，月，日
    year=parseInt(YMD[0],10);
    month=parseInt(YMD[1],10);
    date=parseInt(YMD[2],10);
    if(month>12 || month<1) return false;
    if(date>31 || date<1) return false;
    var maxDate=new Array(12);      //每月的最大日期
    if(month==1) maxDate[0]=31;
    if(month==2) maxDate[1]=28;
    if(month==3) maxDate[2]=31;
    if(month==4) maxDate[3]=30;
    if(month==5) maxDate[4]=31;
    if(month==6) maxDate[5]=30;
    if(month==7) maxDate[6]=31;
    if(month==8) maxDate[7]=31;
    if(month==9) maxDate[8]=30;
    if(month==10) maxDate[9]=31;
    if(month==11) maxDate[10]=30;
    if(month==12) maxDate[11]=31;
    //闰月
    if((year%4==0 && year%100!=0) || (year%400==0)) maxDate[1]=29;
    if(maxDate[month-1]<date) return false;
    else return true;
}
//功能：弹出窗口
//输入：URL,宽,高,其它设置
function openWindow(URL,width,height,sFeatures){
	var left=(screen.width-width)/2
	var top=(screen.height-height)/2
	if(sFeatures==""){
		window.open(URL,"","width="+width+",height="+height+",top="+top+",left="+left)
	}
	else{
		window.open(URL,"","width="+width+",height="+height+",top="+top+",left="+left+","+sFeatures)
	}
}
//分析URL?号之后部分
function queryString(){
	this.item=new ActiveXObject("Scripting.Dictionary");
	var query=location.search.substring(1).split("&");
	for(var i=0;i<query.length;i++){
		this.item.add(query[i].substring(0,query[i].search("=")),query[i].substring(query[i].search("=")+1));
	}
}

//checkboxGroup组件
//输入：ID,宽,高，项(格式：文本|值;文本1|值1|checked(是否选中);...
function checkboxGroup(ID,width,height,item){
	var aItem=item.split(";");
	var aitem
	document.writeln("<table border=\"1\" bgcolor=\"#FFFFFF\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\" bordercolorlight=\"#808080\" bordercolordark=\"#C0C0C0\"><tr><td>");
	document.writeln("<div id=\"Layer1\" style=\"width:"+width+"px; height:"+height+"px; overflow: auto;\">");
	for(var i=0;i<aItem.length;i++){
		aitem=aItem[i].split("|");
		document.writeln("<input type=\"checkbox\" name=\""+ID+"\" id=\""+ID+i+"\" value=\""+aitem[1]+"\" "+aitem[2]+"><label for=\""+ID+i+"\">"+aitem[0]+"</label><br>");
	}
	document.writeln("</div>");
	document.writeln("</td></tr></table>");
}

// 从url 字符串中提取变量的值
function getQueryValue(panStr) 
{ 
	var sorStr=document.URL;
	var vStr=""; 
	if (sorStr==null || sorStr=="" || panStr==null || panStr=="") return vStr; 
	//sorStr = sorStr.toLowerCase();
	panStr += "="; 
	var itmp=sorStr.toLowerCase().indexOf(panStr); 
	if (itmp<0){return vStr;} 
	sorStr = sorStr.substr(itmp + panStr.length); 
	itmp=sorStr.indexOf("&"); 
	if (itmp<0)
	{
		return sorStr; 
	} 
	else 
    {
		sorStr=sorStr.substr(0,itmp); 
		return sorStr;
	} 
}

//设置 Select 的默认选择项
function selected(obj,val){
	for(var i=0;i<obj.options.length;i++){
		if(obj.options[i].value==val){
			obj.options[i].selected=true;
		}
	}
}
//搜索
 