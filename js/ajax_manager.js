// JavaScript Document

var AJAXManager =
{
	url:				"localhost/",
	
	login: function(query, success, error)
	{
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/login.php";
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data.data);
				else
				{	
					if (error !== undefined)
						error(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	register: function(query, success, error)
	{
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/login.php";
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data);
				else
				{	
					if (error !== undefined)
						error(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	get_account_type: function(query, success, error)
	{	
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/login.php?username=" + query.username;
		$.ajax ({
			type: "GET",
			url: loadUrl,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data.data);
				else
				{	
					if (error !== undefined)
						error(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	get_student_profile: function(query, success, error)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/profile.php?q=" + query.q + "&username=" + query.username;
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data);
				else
				{	
					if (error !== undefined)
						error(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
};