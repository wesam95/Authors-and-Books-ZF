	 		$(document).ready(function(){
	 		var table = $('#publishtable').DataTable({	
	 		"ajax": "/Publishers/data", 
	 		"columns": [
	 		{"data":"ID" },
			{"data":"Name", "width" : "20%" },
	 		{"data":"Address", "width" : "35%"},
	 		{"data":"Description" , "width" : "50%" },
	 		{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button class = "updatePublisher">update</button>';}},
			{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button class = "deletePublisher">delete</button>';}}
	 		]
	 	});
	 		$("#add").click(function(){
			$("#div2").addClass("hidden");
			$("#div1").removeClass("hidden");
			window.scrollBy(0 ,500);
		
		    $("form.ajax").validate();
			$("form.ajax").ajaxForm(function(){
        	var table = $("#publishtable").DataTable();
        	table.ajax.reload(null ,false);
			$("#div1").addClass("hidden");
        	$('form.ajax').clearForm();
       	});
	});
			$('#publishtable tbody').on('click', '.updatePublisher', function(){
			$("#div1").addClass("hidden");
			$("#div2").removeClass("hidden");
			window.scrollBy(0 ,500);
			var data = table.row($(this).parents('tr')).data();
			var idvalue = data['ID'];
			$.ajax({
				url : "/Publishers/edit/?id="+idvalue+"" ,
				dataType :'json',
				success :function(response){
				$(".ajax2").find(".formname").val(response['Name']);
		    	$(".ajax2").find(".formaddress").val(response['Address']);
		    	$(".ajax2").find(".formdescription").val(response['Description']);
		   		$(".ajax2").find(".formid").val(response['ID']);

			} 
		});

	});
				$("form.ajax2").validate();
				$("form.ajax2").ajaxForm(function(){
				var table = $("#publishtable").DataTable();
 				table.ajax.reload(null , false);
 				$("#div2").addClass("hidden");
		});
				$('#publishtable tbody').on('click' , '.deletePublisher' ,function(){  
				var data = table.row($(this).parents('tr')).data();
				var idvalue = data['ID'];
				$.ajax({
					url : "/Publishers/delete?id="+idvalue+"" , dataType: 'json' , success: function(data){
					var row = $("#publishtable").find("#"+data['ID']+"");
					table.ajax.reload(null , false);
			}
		});
	});


});

