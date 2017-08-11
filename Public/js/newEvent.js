$(document).ready(function () {
	$('.Submit').click(function () {
		var rules = [];
		$('.rules input[name=Rules]').each(function(){
			if ($(this).val()!="") {
				rules.push($(this).val());
			}
		});
		console.log($('.d1').val())

		var id = $('input[name=name]').val().split(' ').join('-');
		var data = {
			id:id,
			name:$('input[name=name]').val(),
			description:$('textarea').froalaEditor('html.get',true),
			eventFormat:$('textarea1').froalaEditor('html.get',true),
			FirstPrize:$('input[name=Prize_money1]').val(),
			SecondPrize:$('input[name=Prize_money2]').val(),
			ThirdPrize:$('input[name=Prize_money3]').val(),
			fromDate:$('.d1').val(),
			toDate:$('.d2').val(),
			Rules:rules,
			ContactNames:[
				$('input[name=Contact_Name1]').val(),$('input[name=Contact_Name2').val()
			],
			ContactPhNos:[
				$('input[name=Contact_Phone_number1]').val(),$('input[name=Contact_Phone_number2]').val()
			]
		};
		console.log(data);
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
			var html = "";
			$('input[name=name]').val(response.name);
			$('input[name=Prize_money1]').val(response.FirstPrize);
			$('input[name=Prize_money2]').val(response.SecondPrize);
			$('input[name=Prize_money3]').val(response.ThirdPrize);
			$('input[name=Contact_Name1]').val(response.ContactNames[0]);
			$('input[name=Contact_Name2]').val(response.ContactNames[1]);
			$('input[name=Contact_Phone_number1]').val(response.ContactPhNos[0]);
			$('input[name=Contact_Phone_number2]').val(response.ContactPhNos[1]);
			$('.d1').val(response.fromDate);
			$('.d2').val(response.toDate);
			$(".rules input").attr("type","hidden");
			for (var i = 0; i < response.Rules.length; i++) {
				html = "<input  class='form-control' type=text name=Rules value="+response.Rules[i]+"><br>"
				$('.rules').append(html)
			}
			$('textarea').froalaEditor('html.set',response.description);
			$('textarea1').froalaEditor('html.set',response.eventFormat);
		})
		
	}
});