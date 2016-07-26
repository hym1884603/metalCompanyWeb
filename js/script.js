function addEvent(_obj,fun,eventName){
	if(_obj.addEventListener) _obj.addEventListener(eventName,fun,false);
	else _obj.attachEvent("on"+eventName,fun);
}

var Alpha=function(Duration,Overlap){
	if(!Duration) Duration=1;//sec.
	if(!Overlap) Overlap=1.0;//0.0~1.0
	this.area.style.filter="progid:DXImageTransform.Microsoft.Fade(duration="+Duration+",overlap="+Overlap+")";
}
var Pixelate=function(Duration,MaxSquare){
	if(!Duration) Duration=1;//sec.
	if(!MaxSquare) MaxSquare=25;//2~50
	this.area.style.filter="progid:DXImageTransform.Microsoft.Pixelate(duration="+Duration+",maxSquare="+MaxSquare+")";
}
var ppt=function(ppt_img,ppt_title,ppt_url,ppt_info){
	this.img=ppt_img?document.getElementById(ppt_img):null;
	this.title=ppt_title?document.getElementById(ppt_title):null;
	this.url=ppt_url?document.getElementById(ppt_url):null;
	this.info=ppt_info?document.getElementById(ppt_info):null;
	this.area=this.img.parentNode.parentNode;
	this.imgs=[];
	this.links=[];
	this.titles=[];
	this.infos=[];
	this.len=0;
	this.count=0;
	this.sw=false;
	this.action=null;
}
ppt.prototype.setImgs=function(str){
	var img0=str.split("|");
	for(var ii=0;ii<img0.length;ii++){
		this.imgs[ii]=new Image();
		this.imgs[ii].src=img0[ii];
	}
}
ppt.prototype.setLinks=function(str){this.links=str.split("|");}
ppt.prototype.setTitles=function(str){this.titles=str.split("|");}
ppt.prototype.setInfos=function(str){this.infos=str.split("|");}
ppt.prototype.init=function(fun){
	this.action=fun;
	var minlen=function(num1,num2){
		if(num1==0) return num2;
		else if(num2==0) return num1;
		else return num1<num2?num1:num2;
	};
	this.len=minlen(minlen(minlen(this.links.length,this.titles.length),this.infos.length),this.imgs.length);
	if(document.body&&document.body.filters) this.sw=true;
}
ppt.prototype.change=function(){
	this.count++;
	var cc=this.count%this.len;
	if(this.img&&this.imgs.length>0){
		this.img.src=this.imgs[cc].src;
		if(this.titles.length>0) this.img.title=this.titles[cc]
	}
	if(this.url&&this.links.length>0) this.url.href=this.links[cc];
	if(this.title&&this.titles.length>0) this.title.innerHTML=this.titles[cc];
	if(this.info&&this.infos.length>0) this.info.innerHTML=this.infos[cc];
}
ppt.prototype.doit=function(){
	if(this.sw){
		this.action();
		var ff=this.area.filters[0];
		ff.Apply();
	}
	this.change();
	if(this.sw){ff.play();}
}


function AddFavorite(sURL,sTitle){
	try{window.external.addFavorite(sURL,sTitle);}
	catch(e){
		try{window.sidebar.addPanel(sTitle,sURL,"");}
        catch(e){alert("加入收藏失败，请使用Ctrl+D进行添加");}
	}
}
function SetHome(obj,vrl){
	try{obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);}
	catch(e){
		if(window.netscape){
			try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
			catch(e){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");}
			var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',vrl);
		}else alert("设为首页失败。\n"+e);
	}
}
function checkKey(ff){
	if(ff.key.value.length<2||ff.key.value=="请输入关键词"){
		alert('请认真的输入关键词.');
		return false;
	}
}
