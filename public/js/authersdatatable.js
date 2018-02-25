	 		$(document).ready(function(){
	 		var table = $('#table1').DataTable({	
	 		"ajax": "/Datatable/data", 
	 		"columns": [
	 		{"data":"ID" , "width" : "15%"},
			{"data":"Name" ,"width" : "20%"},
	 		{"data":"E_mail", "width" : "25%"},
	 		{"data":"Actions" , "visible" : false},
	 		{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button class = "updateDataTable">update</button>';}},
			{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button class = "deleteDataTable">delete</button>';}}
	 		]
	 	});

			$("#add").click(function(){
			$("#div2").addClass("hidden");
			$("#div1").removeClass("hidden");
			window.scrollBy(0 ,500); 
		

		    $("form.ajax").validate();
			$("form.ajax").ajaxForm(function(){
        	var table = $("#table1").DataTable();
        	table.ajax.reload(null ,false);
			$("#div1").addClass("hidden");
        	$('form.ajax').clearForm();
       	});
	});

      
		$('#table1 tbody').on('click', '.updateDataTable', function(){
		$("#div1").addClass("hidden");
		$("#div2").removeClass("hidden");
		window.scrollBy(0 ,500);
		var data = table.row($(this).parents('tr')).data();
		var idvalue = data['ID'];
		$.ajax({
			url : "/datatable/edit/?id="+idvalue+"" ,
			dataType :'json',
			success :function(response){
			$(".ajax2").find(".formname").val(response['Name']);
		    $(".ajax2").find(".formemail").val(response['E_mail']);
		    $(".ajax2").find(".formid").val(response['ID']);

			} 
		});

	});

			$("form.ajax2").validate();
			$("form.ajax2").ajaxForm(function(){
			var table = $("#table1").DataTable();
 			table.ajax.reload(null , false);
 			$("#div2").addClass("hidden");
});

			$('#table1 tbody').on('click' , '.deleteDataTable' ,function(){  
			var data = table.row($(this).parents('tr')).data();
			var idvalue = data['ID'];
			$.ajax({url : "/Datatable/delete/?id="+idvalue+"" , dataType: 'json' , success: function(data){
			var row = $("#table1").find("#"+data['ID']+"");
			table.ajax.reload(null , false);
			}
		});
	});
});
