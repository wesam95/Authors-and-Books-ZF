	 		$(document).ready(function(){
	 		var table = $('#table1').DataTable({	
	 		"ajax": "/Datatable/data", 
	 		"columns": [
	 		{"data":"ID" , "width" : "15%"},
			{"data":"Name" ,"width" : "20%"},
	 		{"data":"E_mail", "width" : "25%"},
	 		{"data":"Actions" , "visible" : false},
	 		{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button id = "editDataTable" role= "button" data-toggle= "modal" data-target= "#updateForm">update</button>';}},
			{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button id = "deleteDataTable" role= "button" data-toggle= "modal" data-target= "#deleteForm">delete</button>';}}
	 		]
	 	});

			
			$("form[name=insert]").validate();

			$("span[aria-hidden=true]").click(function(){
	 		$("label[class=error]").remove();
	 		$("form[name=insert]").clearForm();
	 	});

			$(".btn-default").click(function(){
	 		$("label[class=error]").remove();
	 		$("form[name=insert]").clearForm();
		});

		   	$("#datatableAdd").click(function(){
			$("form[name=insert]").submit();
		});

			$("form[name=insert]").ajaxForm(function(){
			$("#insertForm").modal('hide');
        	var table = $("#table1").DataTable();
        	table.ajax.reload(null ,false);
        	$('form[name=insert]').clearForm();
       	});
	

      
		$('#table1 tbody').on('click', '#editDataTable', function(){
		var data = table.row($(this).parents('tr')).data();
		var idvalue = data['ID'];
		$.ajax({
			url : "/datatable/edit/?id="+idvalue+"" ,
			dataType :'json',
			success :function(response){
			$("form[name=update]").find(".formname").val(response['Name']);
		    $("form[name=update]").find(".formemail").val(response['E_mail']);
		    $("form[name=update]").find(".formid").val(response['ID']);

			} 
		});

	});

			$("form[name=update]").validate();
			$("#datatableEdit").click(function(){
    		$("form[name=update]").submit();
    });
			$("form[name=update]").ajaxForm(function(){
			$("#updateForm").modal('hide');
			var table = $("#table1").DataTable();
 			table.ajax.reload(null , false);
});

			$('#table1 tbody').on('click' , '#deleteDataTable' ,function(){  
			var data = table.row($(this).parents('tr')).data();
			var idvalue = data['ID'];
			$.ajax({url : "/Datatable/delete/?id="+idvalue+"" , dataType: 'json' , success: function(data){
			$("p[id=warning]").text("Are you sure that you want to delete '"+data['Name']+"'");
			$("input[type=hidden][name=id]").val(data['ID']);

			}
		});
	});
		$("#datatableDelete").click(function(){
    	$("form[name=delete]").submit();
    });
		$("form[name=delete]").ajaxForm(function(data){
		var row = $("#table1").find("#"+data['ID']+"");
		table.ajax.reload(null , false);
		});
	});