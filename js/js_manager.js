var JSManager =
{
	/**
	 * LOGIN
	 */
	login: function()
	{
		var form = document.forms["login_form"];
		var username = form.username.value;
		var password = form.password.value;
		
		var query = { q : "login",
					  username: username, 
					  password: password };
					  
		AJAXManager.login(query, JSManager.login_success, JSManager.login_error);	
	},
	
	login_success: function(data)
	{
		// Save in Web Storage
		sessionStorage.username = data.Username;
		window.location.href = "index.html";
	},
	
	login_error: function(data)
	{
		// Save in Web Storage
		sessionStorage.username = "";
		
		var template = "<div class='alert alert-error'>";
		template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
		template += "<strong>Error!</strong> Invalid username and/ or password.</div>";
		$("#create_account_alert").append(template);
	},
	
	/**
	 * Register
	 */
	register: function()
	{
		
		var form = document.forms["create_account_form"];
		var username = form.username.value;
		var password = form.password.value;
		var password2 = form.confirm_password.value;
		
		if (password !== password2)
		{
			var template = "<div class='alert alert-error'>";
			template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
			template += "<strong>Error!</strong> Password does not match.</div>";
			$("#create_account_alert").append(template);
			return;
		}
		
		if (username == "" || password == "")
		{
			var template = "<div class='alert alert-error'>";
			template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
			template += "<strong>Error!</strong> Username and/ or password cannot be empty.</div>";
			$("#create_account_alert").append(template);
			return;
		}
		
		sessionStorage.register_type = form.user_type.value;
		
		var query = { q : "register",
					  username: username, 
					  password: password };
					  
		AJAXManager.register(query, JSManager.register_success, JSManager.register_error);
	},
	
	register_success: function(data)
	{
		var form = document.forms["create_account_form"];
		var username = form.username.value;
		sessionStorage.username = username;
		
		if (sessionStorage.register_type == "faculty")
			window.location.href = "index.html?register=faculty";
		else
			window.location.href = "index.html?register=student";
	},
	
	register_error: function(data)
	{
		var template = "<div class='alert alert-error'>";
		template += "<button type='button' class='close' data-dismiss='alert'>×</button>";
		template += "<strong>Error!</strong> Unable to create account.</div>";
		$("#create_account_alert").append(template);
		var user_type = form.user_type.value;
	},
	
	/**
	 * Student Profile
	 */
	update_student_profile: function(section)
	{
		if (section == "personal")
		{
			var form = document.forms["personal_info_student_form"];
			var name = form.name.value;
			var dob = form.dob.value;
			var gender = form.gender.value;
			var address = form.address.value;
			var permanent_address = form.permanent_address.value;
			var contact = form.contact.value;
			var email = form.email.value;
			var major = form.major.value;
			var degree = form.degree.value;
	
			var query = { q : "student_info",
					      username: sessionStorage.username, 
					      name: name, 
						  email: email, 
						  dob: dob, 
						  address: address, 
						  permanent_address: permanent_address, 
						  gender: gender, 
						  contact_number: contact, 
						  major: major, 
						  degree: degree };
						  
			AJAXManager.update_student_info(query, UIManager.populate_tutor_application);
		}
		else if (section == "tutor")
		{
			var form = document.forms["personal_info_student_form"];
			var applications = form.tutor_courses;
			var codes = "";
			for (var index=0; index<applications.length; index++) 
			{
				var code = applications[index];
				if (code.selected == true)
					codes += code.value + "::";
			}
	
			var query = { q : "student_tutor_application", 
						  username: sessionStorage.username,
						  code: codes };
	
			AJAXManager.update_tutor_application(query);
		}
		else if (section == "education")
		{
			var form = document.forms["personal_info_student_form"];
			var prev_name1 = form.prev_name1.value;
			var prev_major1 = form.prev_major1.value;
			var prev_degree1 = form.prev_degree1.value;
			var prev_year1 = form.prev_year1.value;
			var prev_gpa1 = form.prev_gpa1.value;
			
			var prev_name2 = form.prev_name2.value;
			var prev_major2 = form.prev_major2.value;
			var prev_degree2 = form.prev_degree2.value;
			var prev_year2 = form.prev_year2.value;
			var prev_gpa2 = form.prev_gpa2.value;
		
			var prev_name3 = form.prev_name3.value;
			var prev_major3 = form.prev_major3.value;
			var prev_degree3 = form.prev_degree3.value;
			var prev_year3 = form.prev_year3.value;
			var prev_gpa3 = form.prev_gpa3.value;
	
			if (prev_name1 != "")
			{
				var query = { q : "student_prev_education",
							  username: sessionStorage.username, 
							  name_school: prev_name1, 
							  year_grad: prev_year1, 
							  major: prev_major1, 
							  degree: prev_degree1, 
							  gpa: prev_gpa1 };
							  
				AJAXManager.update_student_previous_education(query);
			}
			
			if (prev_name2 != "")
			{
				var query = { q : "student_prev_education",
							  username: sessionStorage.username, 
							  name_school: prev_name2, 
							  year_grad: prev_year2, 
							  major: prev_major2, 
							  degree: prev_degree2, 
							  gpa: prev_gpa2 };
							  
				AJAXManager.update_student_previous_education(query);
			}
			
			if (prev_name3 != "")
			{
				var query = { q : "student_prev_education",
							  username: sessionStorage.username, 
							  name_school: prev_name3, 
							  year_grad: prev_year3, 
							  major: prev_major3, 
							  degree: prev_degree3, 
							  gpa: prev_gpa3 };
							  
				AJAXManager.update_student_previous_education(query);
			}
		}
		
		var register = UIManager.get_URL_Parameter("register");
		if (register != "null")
				window.location.href = "index.html";
	},
	
	/**
	 * Faculty Profile
	 */
	update_faculty_profile: function()
	{
		var form = document.forms["personal_info_faculty_form"];
		var name = form.name.value;
		var dob = form.dob.value;
		var gender = form.gender.value;
		var address = form.address.value;
		var permanent_address = form.permanent_address.value;
		var contact = form.contact.value;
		var email = form.email.value;
		var department = form.department.value;
		var position = form.position.value;
		var course = form.course.value;
		var section = form.section.value;
		var research_interests = form.research.value;
		research_interests = research_interests.replace(/\n/g,"::");

		var query = { q : "faculty_info",
					  username: sessionStorage.username, 
					  name: name, 
					  email: email, 
					  dob: dob, 
					  address: address, 
					  permanent_address: permanent_address, 
					  gender: gender, 
					  contact_number: contact, 
					  position: position, 
					  research_interests: research_interests,
					  dept_id: department,
					  crn: section };
					  
		AJAXManager.update_faculty_info(query);
	}
}