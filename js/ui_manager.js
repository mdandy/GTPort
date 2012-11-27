var UIManager =
{
	url:				"",
	
	load_page: function(page_name, callback)
	{
		if (page_name !== undefined) 
		{
			if (callback === undefined)
				$("#main").load("page/" + page_name);
			else
				$("#main").load("page/" + page_name, callback);
		}
		else
			$("#main").load("page/lorem_ipsum.html");
	},
	
	load_sidebar: function(sidebar_name, callback)
	{
		if (sidebar_name !== undefined) 
		{
			if (callback === undefined)
				$("#sidebar").load("page/" + sidebar_name);
			else
				$("#sidebar").load("page/" + sidebar_name, callback);
		}
	},
	
	select_page: function(element, page_name)
	{
		if (element != null)
		{
			// Reset selection
			$("#sidebar_nav li").each(function(index) 
			{
				$(this).removeClass("active");
			});
			
			// Select this element
			$(element).parent().addClass("active");
		}
		
		// Load the page
		if (page_name !== undefined)
		{
			// Special care
			if (page_name === "personal_info_student.html")
				UIManager.load_page(page_name, UIManager.init_personal_info_student);
			else if (page_name === "personal_info_faculty.html")
				UIManager.load_page(page_name, UIManager.init_personal_info_faculty);
			else if (page_name === "add_course.html")
				UIManager.load_page(page_name, UIManager.init_add_course);
			else if (page_name === "select_department.html")
				UIManager.load_page(page_name, UIManager.init_select_department);
			else if (page_name === "course_selection.html")
				UIManager.load_page(page_name, UIManager.init_course_selection);
			else if (page_name === "course_selection2.html")
				UIManager.load_page(page_name, UIManager.init_course_selection2);
			else if (page_name === "assign_tutor.html")
				UIManager.load_page(page_name, UIManager.init_assign_tutor);
			else if (page_name === "assign_grade.html")
				UIManager.load_page(page_name, UIManager.init_assign_grade);
			else if (page_name === "find_tutors.html")
				UIManager.load_page(page_name, UIManager.init_find_tutors);
			else if (page_name === "tutor_logbook.html")
				UIManager.load_page(page_name, UIManager.init_tutor_logbook);
			else if (page_name === "report_admin.html")
				UIManager.load_page(page_name, UIManager.init_report_admin);
			else if (page_name === "report_faculty.html")
				UIManager.load_page(page_name, UIManager.init_report_faculty);
			else if (page_name === "report_student.html")
				UIManager.load_page(page_name, UIManager.init_report_student);
			else
				UIManager.load_page(page_name);
		}
	},
	
	get_URL_Parameter: function (name) 
	{
		return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
	},
	
	isAuthenticated: function()
	{
		if (!sessionStorage.username)
			window.location.href = "login.html";
			
		if (sessionStorage.username == "")
			window.location.href = "login.html";
	},
	
	logout: function()
	{
		sessionStorage.username = "";
		window.location.href = "login.html";
	},
	
	init_login: function()
	{
		if (sessionStorage.username)
		{
			var form = document.forms["login_form"];
			form.username.value = sessionStorage.username;
		}
		
		$("#create_account").hide();
	},
	
	show_create_account: function()
	{
		$("#create_account").show("slow");
	},
	
	hide_create_account: function()
	{
		$("#create_account").hide("slow");
	},
	
	init_main_page: function()
	{
		UIManager.isAuthenticated();
		$("#active_user").html(sessionStorage.username);
		
		var register = UIManager.get_URL_Parameter("register");
		if (register == "student")
		{
			UIManager.load_sidebar("sidebar_create_account.html");
			UIManager.load_page("personal_info_student.html");
		}
		else if (register == "faculty")
		{
			UIManager.load_sidebar("sidebar_create_account.html");
			UIManager.load_page("personal_info_faculty.html");
		}
		else
		{
			// Load regular main index
			AJAXManager.get_account_type(UIManager.init_main_page_with_type);
		}
	},
	
	init_main_page_with_type: function (account_type)
	{
		if (account_type == "student")
		{
			UIManager.load_sidebar("sidebar_student.html");
			UIManager.load_page("lorem_ipsum.html");
		}
		else if (account_type == "tutor")
		{
			UIManager.load_sidebar("sidebar_tutor.html");
			UIManager.load_page("lorem_ipsum.html");
		}
		else if (account_type == "faculty")
		{
			UIManager.load_sidebar("sidebar_faculty.html");
			UIManager.load_page("lorem_ipsum.html");
		}
		else if (account_type == "admin")
		{
			UIManager.load_sidebar("sidebar_admin.html");
			UIManager.load_page("lorem_ipsum.html");
		}
		else
		{
			UIManager.load_sidebar("sidebar_error.html");
			UIManager.load_page("lorem_ipsum.html");
		}
	},
	
	init_personal_info_student: function()
	{
		$("#tutor_courses").pickList({
			sourceListLabel:    "Eligilble",
        	targetListLabel:    "Applied"
		});
	},
	
	init_personal_info_faculty: function()
	{
		
	},
	
	init_add_course: function()
	{
		$('#start-time').timepicker({
			minuteStep: 5,
			defaultTime: 'value'
		});
		
		$('#stop-time').timepicker({
			minuteStep: 5,
			defaultTime: 'value'
		});
	},
	
	init_select_department: function()
	{
		
	},
	
	init_course_selection: function()
	{
		
	},
	
	init_course_selection2: function()
	{
		
	},
	
	init_assign_tutor: function()
	{
		$("#tutor_applicants").pickList({
			sourceListLabel:    "Applied",
        	targetListLabel:    "Approved"
		});
	},
	
	init_assign_grade: function()
	{
		
	},
	
	init_find_tutors: function()
	{
		
	},
	
	init_tutor_logbook: function()
	{
		
	},
	
	init_report_admin: function()
	{
		
	},
	
	init_report_faculty: function()
	{
		
	},
	
	init_report_student: function()
	{
		
	}
}