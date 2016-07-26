function Go(myform)
{
	var count=myform.mode.length;
	for(var i=0;i<count;i++)
	{
		if(myform.mode[i].checked==true)
		{
			if(myform.mode[i].value=="product")
			{
				myform.action="/gb/products.asp?act=search&Keywords=" + myform.Keywords.value; 
				myform.submit();
			}
			if(myform.mode[i].value=="news")
			{
				myform.action="/gb/newsList.asp?act=search&Keywords=" + myform.Keywords.value; 
				myform.submit();
			}
			if(myform.mode[i].value=="all")
			{
				myform.action="/gb/search.asp?act=search&Keywords=" + myform.Keywords.value; 
				myform.submit();
			}
		}
	}
}

