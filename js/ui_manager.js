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
		
		if (data.prev_education.length > 0)
		{
			form.prev_name1.value = data.prev_education[0].Name_of_School;
			$(form.prev_name1).prop('disabled', true);
			form.prev_major1.value = data.prev_education[0].Major;
			form.prev_degree1.value = data.prev_education[0].Degree;
			form.prev_year1.value = data.prev_education[0].Year_of_Grad;
			$(form.prev_year1).prop('disabled', true);
			form.prev_gpa1.value = data.prev_education[0].GPA;	
		}
		
		if (data.prev_education.length > 1)
		{
			form.prev_name2.value = data.prev_education[1].Name_of_School;
			$(form.prev_name2).prop('disabled', true);
			form.prev_major2.value = data.prev_education[1].Major;
			form.prev_degree2.value = data.prev_education[1].Degree;
			form.prev_year2.value = data.prev_education[1].Year_of_Grad;
			$(form.prev_year2).prop('disabled', true);
			form.prev_gpa2.value = data.prev_education[1].GPA;	
		}
		
		if (data.prev_education.length > 2)
		{
			form.prev_name3.value = data.prev_education[2].Name_of_School;
			$(form.prev_year3).prop('disabled', true);
			form.prev_major3.value = data.prev_education[2].Major;
			form.prev_degree3.value = data.prev_education[2].Degree;
			form.prev_year3.value = data.prev_education[2].Year_of_Grad;
			$(form.prev_year3).prop('disabled', true);
			form.prev_gpa3.value = data.prev_education[2].GPA;	
		}
	},
	
	init_personal_info_faculty: function()
	{
		// Prepopulate data
		var username = sessionStorage.username;
		var query = { q : "faculty",
					  username: username };
					  
		AJAXManager.get_faculty_profile(query, UIManager.populate_faculty_into);
	},
	
	populate_faculty_into: function(data)
	{
		// populate courses dropdown menu
		if (data.course.length > 0)
		{
			$("#course").empty();
			for (var index in data.course)
			{
				var title = data.course[index].Title;
				var code = data.course[index].Code;
				
				$("#course").append(new Option(code,title));	
			}
		}
		
		// populate section dropdown menu
		if (data.section.length > 0)
		{
			$("#section").empty();
			for (var index in data.section)
			{
				var crn = data.section[index].CRN;
				var letter = data.section[index].Letter;
				
				$("#section").append(new Option(letter,crn));	
			}
		}
		
		var form = document.forms["personal_info_faculty_form"];
		form.name.value = data.info[0].Name;
		form.dob.value = data.info[0].DOB;
		form.gender.value = data.info[0].Gender;
		form.address.value = data.info[0].Address;
		form.permanent_address.value = data.info[0].Permanent_Address;
		form.contact.value = data.info[0].Contact_No;
		form.email.value = data.info[0].Email_Id;
		
		form.department.value = data.info[0].Dept_Id;
		form.position.value = data.info[0].Position;
		form.course.value = data.info[0].Title;
		form.section.value = data.info[0].CRN;
		
		form.research.value = "";
		for (var index in data.info)
		{
			form.research.value += data.info[index].Research_Interest + "\n";
		}
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
		
	},
	
	populate_tutor_application: function(data)
	{
		
	}
}