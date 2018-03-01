	 		$(document).ready(function(){
	 		var table = $('#publishtable').DataTable({	
	 		"ajax": "/Publishers/data", 
	 		"columns": [
	 		{"data":"ID" },
			{"data":"Name", "width" : "20%" },
	 		{"data":"Address", "width" : "35%"},
	 		{"data":"Description" , "width" : "50%" },
	 		{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button id = "editpublisher" role= "button" data-toggle= "modal" data-target= "#publisherUpdateForm">update</button>';}},
			{"data":"ID" ,"width" : "20%","render": function ( data, type, row, meta ) {
      		return '<button id = "deletepublisher" role= "button" data-toggle= "modal" data-target= "#publisherDeleteForm">delete</button>';}}
	 		]
	 	});
			$("form[name=insertPublisher]").validate();

			$("span[aria-hidden=true]").click(function(){
	 		$("label[class=error]").remove();
	 		$("form[name=insertPublisher]").clearForm();
	 	});

			$(".btn-default").click(function(){
	 		$("label[class=error]").remove();
	 		$("form[name=insertPublisher]").clearForm();
	 	});
		
			$("#publisherAdd").click(function(){
     		$("form[name=insertPublisher]").submit();
		});
			$("form[name=insertPublisher]").ajaxForm(function(){
			$("#publisherInsertForm").modal('hide');
        	var table = $("#publishtable").DataTable();
        	table.ajax.reload(null ,false);
        	$("form[name=insertPublisher]").clearForm();
       	});
	
			$('#publishtable tbody').on('click', '#editpublisher', function(){
			var data = table.row($(this).parents('tr')).data();
			var idvalue = data['ID'];
			$.ajax({
				url : "/Publishers/edit/?id="+idvalue+"" ,
				dataType :'json',
				success :function(response){
				$("form[name=editPublisher]").find(".formname").val(response['Name']);
		    	$("form[name=editPublisher]").find(".formaddress").val(response['Address']);
		    	$("form[name=editPublisher]").find(".formdescription").val(response['Description']);
		   		$("form[name=editPublisher]").find(".formid").val(response['ID']);

			} 
		});

	});
				$("form[name=editPublisher]").validate();
				
				$("#publisherEdit").click(function(){
    			$("form[name=editPublisher]").submit();
    });
				$("form[name=editPublisher]").ajaxForm(function(){
				$("#publisherUpdateForm").modal('hide');
				var table = $("#publishtable").DataTable();
 				table.ajax.reload(null , false);
 				
		});
				$('#publishtable tbody').on('click' , '#deletepublisher' ,function(){  
				var data = table.row($(this).parents('tr')).data();
				var idvalue = data['ID'];
				$.ajax({
					url : "/Publishers/delete?id="+idvalue+"" , dataType: 'json' , success: function(data){
					$("p[id=warning]").text("Are you sure that you want to delete '"+data['Name']+"'");
					$("input[type=hidden][name=id]").val(data['ID']);

			}
		});
	});

					$("#publisherDelete").click(function(){
     				$("form[name=deletePublisher]").submit();
			});

					$("form[name=deletePublisher]").ajaxForm(function(data){
					var row = $("#publishtable").find("#"+data['ID']+"");
					table.ajax.reload(null , false);
			});


	});

