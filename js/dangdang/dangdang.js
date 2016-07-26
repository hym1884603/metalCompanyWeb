var DDSwitch = function(options){
	this.SetOptions(options);
	this.oSwithBg = this.options.oSwithBg;
	this.oSwithButton = this.options.oSwithButton;
	this.oSwithImg = this.options.oSwithImg;
	this.oSwithRbutton = this.options.oSwithRbutton;
	this.oSwithLbutton = this.options.oSwithLbutton;
	this.oSwithClear = this.options.oSwithClear;
	
	this.iSwithBg = $(this.oSwithBg);
	this.iSwithButton = $("#" + this.oSwithButton + " > dd");
	this.iSwithTitle = $("#" + this.oSwithButton + " > dt");
	this.iSwithImg = $(this.oSwithImg + " > ul > li");
	this.iSwithRbutton = $(this.oSwithRbutton);
	this.oSwithLbutton = $(this.oSwithLbutton);
	this.iSwithClear = $(this.options.oSwithClear)
	this.timer = null;
	
	this.init();
	
	this.ClickButton();
	
	var _this = this;
	this.iSwithClear.bind("mouseover", function(){
		_this.Stop();
	}).bind("mouseout", function(){
		_this.AutoButton("auto");
	});
	
	this.AutoButton("auto");
	this.ClickRLbutton();
};
DDSwitch.prototype = {
	SetOptions: function(options){
		this.options = {
			oSwithBg: "#swith_bg",
			oSwithButton: "switchButton",
			oSwithImg: "#switch_img",
			oSwithRbutton: ".r_button",
			oSwithLbutton: ".l_button",
			oSwithClear: "#switch_button"
		};
		$.extend(this.options, options || {});
	},
	init: function(){
		this.iSwithBg.css({ opacity: 0.3 });
		$(this.iSwithButton[0]).addClass("current");
		$(this.iSwithTitle[0]).css({ display: "block", width: "208px" });
		$(this.iSwithImg[0]).css({ "z-index": 1, left: 0 });
	},
	ClickButton: function(){
		var _this = this;
		for(var i = 0; i < this.iSwithButton.length; i++){
			(function(){
				var index = i;
				$(_this.iSwithButton[index]).click(function(){
					if($(_this.iSwithButton[index]).attr("class") == "current") return;
					for(var j = 0; j < i; j++){
						if(index == j){
							$(this).addClass("current");
							$(_this.iSwithTitle[index]).css({ display: 'block' });
							$(_this.iSwithTitle[index]).animate({ width: "+=208px" }, 500);
							$(_this.iSwithImg[index]).css({ "z-index": 3 });
							$(_this.iSwithImg[index]).animate({ left: "-=980px" }, {
								duration: 500,
								complete: function(){
									for(var k = 0; k < j; k++){
										k == index ? $(this).css({ "z-index": 1 }) : $(_this.iSwithImg[k]).css({ "z-index": 0, left: "980px" });
									}
								}
							});
						} else {
							$(_this.iSwithTitle[j]).stop(true, true);
							$(_this.iSwithImg[j]).stop(true, true);
							$(_this.iSwithTitle[j]).css({ display: "none", width: 0 });
							$(_this.iSwithButton[j]).removeClass();
						}
					}
				})
			})();
		}
	},
	Pointer: function(){
		for(var i = 0; i < this.iSwithButton.length; i++){
			if($(this.iSwithButton[i]).attr("class") == "current"){
				return i;
			}
		}
	},
	Action: function(state, direction){
		var _this = this, pointer = this.Pointer();
		switch(state.toLowerCase()){
			case "right":
				if(pointer >= (_this.iSwithButton.length - 1)) { pointer = -1 }
				break;
			case "left":
				if(pointer <= 0) { pointer = _this.iSwithButton.length }
				break;
		}
		var index = pointer + direction;
		
		for(var i = 0; i < _this.iSwithButton.length; i++){
			if( i == (index)){
				$(_this.iSwithButton[index]).addClass("current");
				$(_this.iSwithTitle[index]).css({ display: 'block' });
				$(_this.iSwithTitle[index]).animate({ width: "+=208px" }, 500);
				$(_this.iSwithImg[index]).css({ "z-index": 3 });
						$(_this.iSwithImg[index]).animate({ left: "-=980px" }, {
							duration: 500,
							complete: function(){
								for(var k = 0; k < i; k++){
									k == (index) ? $(this).css({ "z-index": 1 }) : $(_this.iSwithImg[k]).css({ "z-index": 0, left: "980px" });
								}
							}
						});
			} else {
				$(_this.iSwithTitle[i]).stop(true, true);
				$(_this.iSwithImg[i]).stop(true, true);
				$(_this.iSwithTitle[i]).css({ display: "none", width: 0 });
				$(_this.iSwithButton[i]).removeClass();
			}
		}
	},
	Stop: function(){
		clearTimeout(this.timer);
  },
	AutoButton: function(){
		var _this = this;
		if(arguments[0] == "auto"){
			this.timer = window.setTimeout(function(){ _this.AutoButton("auto"); _this.Action("right", 1); }, 2960);
		}
	},
	ClickRLbutton: function(){
		var _this = this;
		this.iSwithRbutton.click(function(){ _this.Action("right", 1); });
		this.oSwithLbutton.click(function(){ _this.Action("left", -1); });
	}
};
$(document).ready(function(){
	var zz = new DDSwitch();
});