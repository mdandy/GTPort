// JavaScript Document

var AJAXManager =
{
	url:				"localhost/",
	
	/**
	 * Authentication
	 */
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
	
	/**
	 * Student Profile
	 */
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
		
					//var query = { q : "tutor_application",
					//      		  username: sessionStorage.username };	  
					//AJAXManager.get_tutor_application(query, success);
					
					var register = UIManager.get_URL_Parameter("register");
					if (register != "null")
						window.location.href = "index.html";
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
	
	update_tutor_application: function(query)
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
					template += "<strong>Success!</strong> Tutor application has been updated.</div>";
					$("#personal_info_student_2_alert").append(template);
				}
				else
				{
					var template = "<div class='alert alert-error'>";
					template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
					template += "<strong>Error!</strong> Unable to update tutor application.</div>";
					$("#personal_info_student_2_alert").append(template);
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
				{
					success(data.data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	get_student_department: function(query, success)
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
				{
					success(data.data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	/**
	 * Faculty Profile
	 */
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
	
	get_courses_list: function(query, success)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/profile.php?q=" + query.q + "&dept_id=" + query.dept_id;
		$.ajax ({
			type: "GET",
			url: loadUrl,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data.data);
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	get_sections_list: function(query, success)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/profile.php?q=" + query.q + "&course_title=" + query.course_title;
		$.ajax ({
			type: "GET",
			url: loadUrl,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data.data);
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	/**
	 * Report
	 */
	get_report: function(query, success, error)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/report.php?q=" + query.q;
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
						error(data.data);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
	
	/**
	 * Courses
	 */
	get_courses: function(query, success, error){
        $.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/course.php?q=" + query.q + "&dept_id=" + query.dept_id + "&term=" + query.term;
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
    
    register_course: function(query, success, error){
        $.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/course.php";
		$.ajax ({
			type: "POST",
			url: loadUrl,
			data: query,
			dataType: "json",
			timeout: 5000, //5 seconds
            success: function(data) 
			{
				if (data.res == "TRUE"){
					success(data);
                }
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
	
	/**
	 * Tutor
	 */
	get_tutor_applicants: function(query, success, error)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/tutor.php?q=" + query.q + "&username=" + query.username;
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
					error();
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},

	assign_tutor: function(query, success)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/tutor.php";
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
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},

	get_tutors: function(query, success)
	{
		$.ajaxSetup (
		{
			cache: true
		});

		var loadUrl = "server/tutor.php?q=" + query.q + "&search_entry=" + query.search_entry;
		$.ajax ({
			type: "GET",
			url: loadUrl,
			dataType: "json",
			timeout: 5000, //5 seconds
			success: function(data) 
			{
				if (data.res == "TRUE")
					success(data.data);
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				console.error(textStatus);
			}
		});
	},
};