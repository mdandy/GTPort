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
	
	update_student_info: function(query, success)
	{
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/profile.php";
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
				{
					var template = "<div class='alert alert-success'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Success!</strong> Student profile has been updated.</div>";
					$("#personal_info_student_1_alert").append(template);
		
					var query = { q : "tutor_application",
					      		  username: sessionStorage.username };	  
					AJAXManager.get_tutor_application(query, success);
				}
				else
				{
					var template = "<div class='alert alert-error'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Error!</strong> Unable to update student profile.</div>";
					$("#personal_info_student_1_alert").append(template);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	update_student_previous_education: function(query, error)
	{
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/profile.php";
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
				{
					var template = "<div class='alert alert-success'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Success!</strong> Student previous education has been updated.</div>";
					$("#personal_info_student_3_alert").append(template);
				}
				else
				{
					var template = "<div class='alert alert-error'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Error!</strong> Unable to update student previous education.</div>";
					$("#personal_info_student_3_alert").append(template);
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
			type: "GET",
			url: loadUrl,
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
	
	get_tutor_application: function(query, success)
	{
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/profile.php?q=" + query.q + "&username=" + query.username;
		$.ajax ({
			type: "GET",
			url: loadUrl,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
				{
					success(data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	update_faculty_info: function(query)
	{
		$.ajaxSetup (
		{
			cache: false
		});

		var loadUrl = "server/profile.php";
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
				{
					var template = "<div class='alert alert-success'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Success!</strong> Faculty profile has been updated.</div>";
					$("#personal_info_faculty_alert").append(template);
				}
				else
				{
					var template = "<div class='alert alert-error'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Error!</strong> Unable to update faculty profile.</div>";
					$("#personal_info_faculty_alert").append(template);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	get_faculty_profile: function(query, success, error)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/profile.php?q=" + query.q + "&username=" + query.username;
		$.ajax ({
			type: "GET",
			url: loadUrl,
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