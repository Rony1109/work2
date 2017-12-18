/*
	��IE6֧��hover:α��
*/

/*
* �󶨶�����������Ƴ�����ʽ���¼�
* id �󶨶��� JQѡ�����ַ���
* hover ��ʽ����
* fun_in �������Ļص�����
* fun_out ����Ƴ��Ļص�����
*/
csc.hover = function ( id , hover , fun_in , fun_out){
	var hover = hover || "hover";
	$(id).hover(function (){
		$(this).addClass(hover);
		if(typeof(fun_in)=="function") {fun_in(this);}
	},function (){
		$(this).removeClass(hover);
		if(typeof(fun_out)=="function") {fun_out(this);}
	});
	return this;
};