function checkedAllcheckboxOfReport(reportId, collection){

	document.querySelector('.a-IRR-container').addEventListener('click', function(e){

		let allCheckbox = document.querySelectorAll('#' + reportId + ' tbody tr td:first-child input[type="checkbox"]');

		if (e.target.type === 'checkbox' && e.target.closest('.a-IRR-header')){
			
			allCheckbox.forEach(function(inputCheckbox){

				let obj = {
					'documentID' : inputCheckbox.value,
					'collection' : collection
				};

				if (e.target.checked){
					inputCheckbox.setAttribute('checked', 'checked');
					addElementRecall(obj);
				} else {
					inputCheckbox.removeAttribute('checked');
					deleteElementRecall(obj);
				};
				
				});
		};
	});
	
	function addElementRecall(obj) {

		apex.server.process(
			'add_element_collection', {
				x01: obj.documentID,
				x02: obj.collection
		},{
			success: function (request) {
				if (request == 200) {

				} else {
					apex.message.clearErrors();
					apex.message.showErrors([{
						type: "error",
						location: "page",
						message: request,
						unsafe: false
					}]);
				}
			},
			error: function (pjqXHR, pTextStatus, pErrorThrown) {
				console.log("error: " + pErrorThrown);
			},
			dataType: "text",
			async: false
		};
		);
	};

	function deleteElementRecall(obj) {

		apex.server.process(
			'delete_element_collection', {
			x01: obj.documentID,
			x02: obj.collection
		},{
			success: function (request) {
				if (request == 200) {

				} else {
					apex.message.clearErrors();
					apex.message.showErrors([{
						type: "error",
						location: "page",
						message: request,
						unsafe: false
					}]);
				}
			},
			error: function (pjqXHR, pTextStatus, pErrorThrown) {
				console.log("error: " + pErrorThrown);
			},
			dataType: "text",
			async: false
		});
	};
};