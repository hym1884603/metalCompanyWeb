//表单域检验函数
/*
检验类型:
表单域是否为空: RequiredFieldValidator
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="表单域" errormessage="出错文本" evaluationfunction="RequiredFieldValidator" initialvalue="初始值" style="display:none;">RequiredFieldValidator</span>

表单域比较（与另一表单域或文本比较): CompareValidator
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="要比较的表单域" errormessage="出错文本" type="比较的数据类型:string,integer,double,date" evaluationfunction="CompareValidator" controltocompare="受比较的表单域" valuetocompare="比较值" style="display:none;">CompareValidator</span>

表单域数据类型(检证表单域数据类型): TypeValidator
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="表单域" errormessage="出错文本" evaluationfunction="typeValidator" type="数据类型:string,integer,double,date" style="display:none;">typeValidator</span>

表单域是否在范围内：RangeValidator，表单域附加：valid="Range" MaximumValue="最大值" MinimumValue="最小值"

表单域是否在正则表达式的范围内：RegularExpressionValidator,表单域附加:valid="RegularExpression" pattern="正则表达式"
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="表单域" errormessage="出错文本" evaluationfunction="RegExpValidator" pattern="正则表达式" style="display:none;">RegExpValidator</span>

*/

//------------------------------------------------------------------------------------------
/*遍历hidden表单域检验对像,检验表单域
*/
function checkForm(formObj){
	var i
	var isValid=true;
	var errormessage="";
	//alert(document.formMember.abcd)
	if(typeof(formObj.validator)!="undefined"){
		if(typeof(formObj.validator.length)!="undefined"){
			for(i=0;i<formObj.validator.length;i++)
			{
				if(!eval(formObj.validator[i].evaluationfunction+"(formObj.validator[i]);")){
					errormessage+="- "+formObj.validator[i].errormessage+"\n";
					isValid=false;
				}
			}
		}
		else{
			if(!eval(formObj.validator.evaluationfunction+"(formObj.validator);")){
				errormessage+="- "+formObj.validator.errormessage+"\n";
				isValid=false;
			}
		}
	}
	if(!isValid)
		alert(errormessage);
	return isValid
}



function checkForm1(formObj){
	var i
	var isValid=true;
	var errormessage="";
	//alert(document.formMember.abcd)
	if(typeof(formObj.validator)!="undefined"){
		if(typeof(formObj.validator.length)!="undefined"){
			for(i=0;i<formObj.validator.length;i++)
			{
				if(!eval(formObj.validator[i].evaluationfunction+"(formObj.validator[i]);")){
					errormessage+="- "+formObj.validator[i].errormessage+"\n";
					isValid=false;
				}
			}
		}
		else{
			if(!eval(formObj.validator.evaluationfunction+"(formObj.validator);")){
				errormessage+="- "+formObj.validator.errormessage+"\n";
				isValid=false;
			}
		}
	}
	if(!isValid)
	{	
		alert(errormessage);
	}
	else
	{
		document.all.thtml.value=document.getElementById("mailbody").innerHTML;
	}
	return isValid
}

//------------------------------------------------------------------------------------------
/*功能：表单域是否为空
输入：hidden表单域对象
输出： 布尔值
*/
function RequiredFieldValidator(hiddenObj){
	var validateObj;
	validateObj=eval("document.all."+hiddenObj.controltovalidate);
	if(jTrim(validateObj.value)==""){
		return false;
	}
	return true;
}
//------------------------------------------------------------------------------------------
/*
功能：表单比较
输入：hidden表单域对象
输出：布尔值
*/
function CompareValidator(hiddenObj){
	var isValid=true
	var validateObj
	var compareObj
	var compareTxt
	var type
	validateObj=eval("document.all."+hiddenObj.controltovalidate);
	compareTxt=hiddenObj.valuetocompare;
	if(typeof(eval("document.all."+hiddenObj.controltocompare))!="undefined"){
		compareObj=eval("document.all."+hiddenObj.controltocompare);
		compareTxt=compareObj.value;
	}
	type=hiddenObj.datatype;
	
	if(type=="string"){
		if(jTrim(validateObj.value)!=jTrim(compareTxt)){
			isValid=false;
		}
	}
	return isValid
}
//------------------------------------------------------------------------------------------
/*
表单域数据类型检验
输入：hidden表单域对象
输出：布尔值
*/
function typeValidator(hiddenObj){
	var isValid=true
	var validateObj
	var type
	validateObj=eval("document.all."+hiddenObj.controltovalidate);
	type=hiddenObj.datatype
	if(type=="integer"){
		if(!isNothing(validateObj.value))
		{
			if(!isInt(validateObj.value))
			{
				isValid=false;
			}
		}
	}
	if(type=="dateTime"){
		if(!isNothing(validateObj.value))
		{
			if(!jIsDate(validateObj.value)){
				isValid=false;
			}
		}
	}
	return isValid
}
//---------------------------------------------------------------------------------------------
/*
功能：使用正则表达式验证表单数据
输入：hidden表单域对象
输出：布尔值
*/
function RegExpValidator(hiddenObj) {
	var validateObj
	var pattern
	validateObj=eval("document.all."+hiddenObj.controltovalidate);
	pattern=hiddenObj.pattern

    var value=validateObj.value;
    if (jTrim(value).length==0)
        return true;        
    var rx = new RegExp(pattern);
    var matches = rx.exec(value);
    return (matches!=null && value==matches[0]);
}