// JavaScript Document

var AJAXManager =
{
	url:				"localhost/",
	
	login: function()
	{
		var form = document.forms["login_form"];
		var username = form.username.value;
		var password = form.password.value;
	
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/login.php";
		var query = { username: username, 
					  password: password };

		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "text",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				// Save in Web Storage
				if (data == "")
				{
					sessionStorage.username = "";
					$("#login_alert").show();
				}
				else
				{
					sessionStorage.username = data;
					window.location.href = "index.html";
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	}
};