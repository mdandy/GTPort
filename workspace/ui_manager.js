var UIManager =
{
	/**
	 * General loading component script
	 */
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
	
	/**
	 * Helper
	 */
	get_URL_Parameter: function (name) 
	{
		return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
	},
	
	/**
	 * Authentication
	 */
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
	
	/**
	 * Initialize pages
	 */
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
			if(sessionStorage.username)
			{
				var username = sessionStorage.username;
				var query = { username: username };
				AJAXManager.get_account_type(query, UIManager.init_main_page_with_type);
			}
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
		
		// Prepopulate data
		var username = sessionStorage.username;
		var query = { q : "student",
					  username: username };
					  
		AJAXManager.get_student_profile(query, UIManager.populate_student_info)
	},
	
	populate_student_info: function(data)
	{
		var form = document.forms["personal_info_student_form"];
		form.name.value = data.info.Name;
		form.dob.value = data.info.DOB;
		form.gender.value = data.info.Gender;
		form.address.value = data.info.Address;
		form.permanent_address.value = data.info.Permanent_Address;
		form.contact.value = data.info.Contact_No;
		form.email.value = data.info.Email_Id;
		form.major.value = data.info.Major;
		form.degree.value = data.info.Degree;
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
	
	//////// Assign Tutor ////////
	init_assign_tutor: function()
	{
		var query = { q : "applicant",
					  username: sessionStorage.username };

		AJAXManager.get_tutor_applicants(query, UIManager.init_assign_tutor_success);
	},

	init_assign_tutor_success: function(data)
	{
		$("#tutor_applicants").empty();		
		for (var index in data) {
			var row = data[index];
			$("#tutor_applicants").append(new Option(row.Name, row.Student_Id));
		}

		$("#tutor_applicants").pickList({
			sourceListLabel:    "Applied",
     	targetListLabel:    "Approved"
		});
	},

	assign_tutor: function()
	{
		var form = document.forms["assign_tutor_form"];
		var applicants = form.tutor_applicants;
		var student_ids = "";
		for (var index=0; index<applicants.length; index++) 
		{
			var app = applicants[index];
			if (app.selected == true)
				student_ids += app.value + "::";
		}

		var query = { q : "assign", 
								username: sessionStorage.username,
								student_id: student_ids };

		AJAXManager.assign_tutor(query, UIManager.assign_tutor_success);
	},

	assign_tutor_success: function(data)
	{
		var template = "<div class='alert alert-success'>";
		template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
		template += "<strong>Success!</strong> Tutors were added.</div>";
		$("#assign_tutor_alert").append(template);
	},
	
	//////// Assign Grade ////////
	init_assign_grade: function()
	{
		
	},
	
	//////// Find Tutors ////////
	init_find_tutors: function()
	{
		$("#tutors").empty();		
	},

	search_by_course_code: function()
	{
		$("#keyword-search").val("");

		$("#tutors").empty();

		if ($("#course-search").val() != "")
		{
			var query = { q: "find_by_code",
									search_entry: encodeURIComponent($("#course-search").val()) };

			AJAXManager.get_tutors(query, UIManager.search_results);
		}
	},

	search_by_keyword: function()
	{
		$("#course-search").val("");

		$("#tutors").empty();

		if ($("#keyword-search").val() != "")
		{
			var query = { q: "find_by_keyword",
									search_entry: encodeURIComponent($("#keyword-search").val()) };

			AJAXManager.get_tutors(query, UIManager.search_results);
		}
	},

	search_results: function(data)
	{
		var template = "";
		for(var index in data)
		{
			template += "<tr>";
			template += "<td>" + data[index].Code + "</td>";
			template += "<td>" + data[index].Title + "</td>";
			template += "<td>" + data[index].Name + "</td>";
			template += "<td>" + data[index].Email_Id + "</td>";
			template += "</tr>";
		}
		$("#tutors").html(template);
	},
	
	//////// Tutor Logbook ////////
	init_tutor_logbook: function()
	{
		$("#tname").val(sessionStorage.username);
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