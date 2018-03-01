$(document).ready(function(){
	 
	 $("form[name=insert]").validate();

	 $("span[aria-hidden=true]").click(function(){
	 $("label[class=error]").remove();
	 $("form[name=insert]").clearForm();
	 });

	 $(".btn-default").click(function(){
	 $("label[class=error]").remove();
	 $("form[name=insert]").clearForm();
	 });

	 $("#submitbuttonAdd").click(function(){
	 $("form[name=insert]").submit();
	});

	$("form[name=insert]").ajaxForm(function(data){
	$("#insertForm").modal('hide');
	$("#table1").append(data);
	$("form[name=insert").clearForm();
	});
	


	$('body').on('click', '#edit', function(){
	var idvalue = $(this).parent().parent().attr('id');
	$.ajax({
		url : "/auther/edit/?id="+idvalue+"" ,
		dataType :'json',
		success :function(response){
		$("form[name=edit]").find(".formname").val(response['Name']);
		$("form[name=edit]").find(".formemail").val(response['E_mail']);
		$("form[name=edit]").find(".formid").val(idvalue);
		} 
	});
});
	$("form[name=edit]").validate();

	$("#submitbuttonEdit").click(function(){
    $("form[name=edit]").submit();
    });

	$("form[name=edit]").ajaxForm(function(data){
	$("#updateForm").modal('hide');
    var row = $("#table1").find("#"+data['ID']+"");
	row.find(".name").text(data['Name']);
    row.find(".email").text(data['E_mail']);
	});

	$('body').on('click' , '#delete' ,function(){  
	var idvalue = $(this).parent().parent().attr('id');
	$.ajax({url : "/auther/delete?id="+idvalue+"" , dataType: 'json' , success: function(data){
	$("p[id=warning]").text("Are you sure that you want to delete '"+data['Name']+"'");
    $("input[type=hidden][name=id]").val(data['ID']);
			}
		});
	});

	$("#submitbuttonDelete").click(function(){
    $("form[name=delete]").submit();
    });

      $("form[name=delete]").ajaxForm(function(data){
      var row= $("#table1").find("#"+data['ID']+"");
      $(row).remove(); 
});



//book js


			$("form[name=insertBook]").validate();

			$("span[aria-hidden=true]").click(function(){
	 		$("label[class=error]").remove();
	 		$("form[name=insertBook]").find("input[name=Name]").val("");
	 	});

			$(".btn-default").click(function(){
	 		$("label[class=error]").remove();
	 		$("form[name=insertBook]").find("input[name=Name]").val("");
	 	});
			$("#booksubmitbuttonAdd").click(function(){
     		$("form[name=insertBook]").submit();
     	});
			$("form[name=insertBook").ajaxForm(function(data){
			$("#bookInsertForm").modal('hide'); 
			$("#table2").append(data);
        	$("form[name=insertBook]").clearForm();
		});
  
	


		$("body").on('click', '#updatebook' , function(){
		var idvalue = $(this).parent().parent().attr('id');
		$.ajax({
			url: "/book/edit?id="+idvalue+"" ,
			dataType: 'json',
			success : function(response){
			$("form[name=editBook]").find(".formname").val(response['Name']);
			$("form[name=editBook]").find(".updateBook").val(response['Auther_ID']);
			$("form[name=editBook]").find(".formid").val(idvalue);
			} 
	  });

});

		$("form[name=editBook]").validate();

		$("#booksubmitbuttonEdit").click(function(){
    	$("form[name=editBook]").submit();
    });
		$("form[name=editBook]").ajaxForm(function(data){
		$("#bookUpdateForm").modal('hide');
		var row = $("#table2").find("#"+data['ID']+"");
		$(row).find(".name").text(data['Name']);
		$(row).find(".auther").text(data[0]['Name']);
		$(row).find(".auther").attr('data-id' , data[0]['ID']);
});


		$("body").on('click' , '#deletebook' , function(){
		var idvalue = $(this).parent().parent().attr('id');
		var auther = $(this).parent().parent().find(".auther").text();
		$.ajax({url : "/book/delete?id="+idvalue+"" , dataType: 'json' , success: function(data){
		$("p[id=warning]").text("Are you sure that you want to delete '"+data['Name']+"' by '"+auther+"'");
		$("input[type=hidden][name=id]").val(data['ID']);

	
		}
	});
  });
	$("#booksubmitbuttonDelete").click(function(){
    $("form[name=deleteBook]").submit();
    });

	$("form[name=deleteBook]").ajaxForm(function(data){
	var row = $("#table2").find("#"+data['ID']+"");
	$(row).remove();
	});
});
