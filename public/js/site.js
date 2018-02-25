$(document).ready(function(){
	 $("#add").click(function(){
			$("#div2").addClass("hidden");
			$("#div1").removeClass("hidden");
				window.scrollBy(0 ,500);
				
				            
$("form.ajax").validate();

$("form.ajax").ajaxForm(function(data){
$("#table1").append(data);
$("#div1").addClass("hidden");
$("form.ajax").clearForm();
      
    	});
	});



		$('body').on('click', '.update', function(){
		$("#div1").addClass("hidden");
		$("#div2").removeClass("hidden");
		window.scrollBy(0 ,500);
		var idvalue = $(this).parent().parent().find(".id").text();
		$.ajax({

			url : "/auther/edit/?id="+idvalue+"" ,
			dataType :'json',
			success :function(response){
		    $(".ajax2").find(".formname").val(response['Name']);
		    $(".ajax2").find(".formemail").val(response['E_mail']);
		    $(".ajax2").find(".formid").val(idvalue);
			} 
		});
});

$("form.ajax2").validate();
$("form.ajax2").ajaxForm(function(data){
     	var row = $("#table1").find("#"+data['ID']+"");
		row.find(".name").text(data['Name']);
      	row.find(".email").text(data['E_mail']);
    	$("#div2").addClass("hidden");
});

	$('body').on('click' , '.delete' ,function(){  
	var idvalue = $(this).parent().parent().find(".id").text();

		$.ajax({url : "/auther/delete?id="+idvalue+"" , dataType: 'json' , success: function(data){

			var row = $("#table1").find("#"+data['ID']+"");
			$(row).remove();
			}
		});
	});



//book js


			$("#addbook").click(function(){
			$("#updateDiv").addClass("hidden");
			$("#addDiv").removeClass("hidden");
			window.scrollBy(0 ,500);
			$("form.add").validate();
			$("form.add").ajaxForm(function(data){ 
			$("#table2").append(data);
        	$("#addDiv").addClass("hidden");
        	$("form.add").clearForm();
		});
  
	});


		$("body").on('click', '.updatebook' , function(){
		$("#addDiv").addClass("hidden");
		$("#updateDiv").removeClass("hidden");
		window.scrollBy(0,500);
		var idvalue = $(this).parent().parent().find(".id").text();
		$.ajax({
			url: "/book/edit?id="+idvalue+"" ,
			dataType: 'json',
			success : function(response){
			$("form.edit").find(".formname").val(response['Name']);
			$("form.edit").find(".updateBook").val(response['Auther_ID']);
			$("form.edit").find(".formid").val(idvalue);
			} 
	  });

});

		$("form.edit").validate();
		$("form.edit").ajaxForm(function(data){

		
		var row = $("#table2").find("#"+data['ID']+"");
		$(row).find(".name").text(data['Name']);
		$(row).find(".auther").text(data[0]['Name']);
		$(row).find(".auther").attr('data-id' , data[0]['ID']);
		$("#updateDiv").addClass("hidden");	
});


		$("body").on('click' , '.deletebook' , function(){
		var idvalue = $(this).parent().parent().find(".id").text();
		$.ajax({url : "/book/delete?id="+idvalue+"" , dataType: 'json' , success: function(data){
		var row = $("#table2").find("#"+data['ID']+"");
		$(row).remove();
		}
	});
  });
});
