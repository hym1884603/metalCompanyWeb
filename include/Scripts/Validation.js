//������麯��
/*
��������:
�����Ƿ�Ϊ��: RequiredFieldValidator
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="����" errormessage="�����ı�" evaluationfunction="RequiredFieldValidator" initialvalue="��ʼֵ" style="display:none;">RequiredFieldValidator</span>

����Ƚϣ�����һ������ı��Ƚ�): CompareValidator
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="Ҫ�Ƚϵı���" errormessage="�����ı�" type="�Ƚϵ���������:string,integer,double,date" evaluationfunction="CompareValidator" controltocompare="�ܱȽϵı���" valuetocompare="�Ƚ�ֵ" style="display:none;">CompareValidator</span>

������������(��֤������������): TypeValidator
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="����" errormessage="�����ı�" evaluationfunction="typeValidator" type="��������:string,integer,double,date" style="display:none;">typeValidator</span>

�����Ƿ��ڷ�Χ�ڣ�RangeValidator�����򸽼ӣ�valid="Range" MaximumValue="���ֵ" MinimumValue="��Сֵ"

�����Ƿ���������ʽ�ķ�Χ�ڣ�RegularExpressionValidator,���򸽼�:valid="RegularExpression" pattern="������ʽ"
<span style="display:none;"><input type="hidden" id="validator" controltovalidate="����" errormessage="�����ı�" evaluationfunction="RegExpValidator" pattern="������ʽ" style="display:none;">RegExpValidator</span>

*/

//------------------------------------------------------------------------------------------
/*����hidden����������,�������
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
/*���ܣ������Ƿ�Ϊ��
���룺hidden�������
����� ����ֵ
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
���ܣ����Ƚ�
���룺hidden�������
���������ֵ
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
�����������ͼ���
���룺hidden�������
���������ֵ
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
���ܣ�ʹ��������ʽ��֤������
���룺hidden�������
���������ֵ
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