$(document).ready(function () {
	$('.Submit').click(function () {
		console.log(editor_description.root.innerHTML)

		var id = $('input[name=name]').val().split(' ').join('-');
		var data = {
			id:id,
			name:$('input[name=name]').val(),
			description:editor_description.root.innerHTML,
			eventFormat:editor_eventformat.root.innerHTML,
			Prize_pool:$('input[name=Prize_money]').val(),
			// fromDate:$('.d1').val(),
			// toDate:$('.d2').val(),
			Rules:editor_rules.root.innerHTML,
			ContactDetails:editor_contact.root.innerHTML
		};
		if (window.location.pathname.startsWith("/editEvents")) {
			$.post('/edit',data,function (response) {
				console.log(response);
				if (response=="Sucess") {
					// window.setTimeout(function () {
					// 	window.location = "/"
					// },3000)
					window.location = "/"
				}
			})
		}
		else{
			$.post('/newEvent',data,function(response){
				console.log(response)
			})
		}

	});
	if (window.location.pathname.startsWith("/editEvents")) {
		var url = window.location.href;
		var eventid = url.split('?')[1].split("=")[1];
		console.log(eventid);
		$.get('/events/'+eventid,function (response) {
			console.log(response);
			$('input[name=name]').val(response.name);
			$('input[name=Prize_money]').val(response.Prize_pool);
			// $('.d1').val(response.fromDate);
			// $('.d2').val(response.toDate);
			editor_description.clipboard.dangerouslyPasteHTML(response.description);
			editor_contact.clipboard.dangerouslyPasteHTML(response.ContactDetails);
			editor_rules.clipboard.dangerouslyPasteHTML(response.Rules);
			editor_eventformat.clipboard.dangerouslyPasteHTML(response.eventFormat);
		});
		
	}
});