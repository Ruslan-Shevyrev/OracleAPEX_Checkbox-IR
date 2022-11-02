function checkedAllcheckboxOfReport(reportId, collection){
	
	document.querySelector('#' + reportId).addEventListener('click', function (e){

		if (e.target.type === 'checkbox' && e.target.closest('th')){

			let allInputsCheckbox = this.querySelectorAll('tbody tr td:first-child input[type="checkbox"]');

			for (let i = 0; i < allInputsCheckbox.length; i++) {
				checkedCheckbox(allInputsCheckbox[i], e.target.checked);
			}

		} else if (e.target.type === 'checkbox' && e.target.closest('td')){
			checkedCheckbox(e.target, e.target.checked);
		}

		function checkedCheckbox(inputCheckbox, isChecked) {

			let obj = {
				'documentID': inputCheckbox.value,
				'collection': collection
			}

			if (isChecked) {
				addElementRecall(obj);
				inputCheckbox.checked = !0;
			} else {
				deleteElementRecall(obj);
				inputCheckbox.checked = !!0;
			}
		}
	});

	function addElementRecall(obj){

		apex.server.process(
			'add_element_collection', {
			x01: obj.documentID,
			x02: obj.collection
		}, {
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

	function deleteElementRecall(obj) {

		apex.server.process(
			'delete_element_collection', {
			x01: obj.documentID,
			x02: obj.collection
		}, {
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
}