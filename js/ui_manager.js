var UIManager =
{
	course_data:				null,
    register_course_count:      null,
    selectIndex:                null,
	major:						null,
	
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
		
		if (data.tutor_application.length > 0)
		{
			$("#tutor_courses").empty();
			for (var index in data.tutor_application)
			{
				var code = data.tutor_application[index].Code;			
				$("#tutor_courses").append(new Option(code,code));	
			}
		}
		
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
		
		// Picklistify tutor application
		$("#tutor_courses").pickList({
			sourceListLabel:    "Eligilble",
        	targetListLabel:    "Applied"
		});
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
			var reserach_interest = data.info[index].Research_Interest;
			if (reserach_interest != null)
				form.research.value +=  + "\n";
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
        var query = { q : "department",
					  username: sessionStorage.username };
					  
        AJAXManager.get_student_department(query, UIManager.init_course_selection_success);
	},
	
	init_course_selection_success: function(data)
	{
		var input = 0;
		if (data == "AE")
		{
			input = 1;
			UIManager.major = "Aerospace Engineering";
		}
		else if (data == "BIO")
		{
			input = 2;
			UIManager.major = "Biology";
		}
		else if (data == "BME")
		{
			input = 3;
			UIManager.major = "Biomedical Engineering";
		}
		else if (data == "CS")
		{
			input = 4;
			UIManager.major = "Computer Science";
		}
		else if (data == "ECE")
		{
			input = 5;
			UIManager.major = "Electrical & Computer Engineering";
		}
		$("#department").html(UIManager.major);
		
        var term = "Spring2013";
        var query = { q : "course",
					  dept_id: input,
                      term: term };
					  
        AJAXManager.get_courses(query, UIManager.populateCourseSuccess2);
	},
	
	init_course_selection2: function()
	{
		$("#department").html(UIManager.major);
	},
	
	init_assign_tutor: function()
	{
		var query = { q : "applicant",
					  username: sessionStorage.username };

		AJAXManager.get_tutor_applicants(query, UIManager.init_assign_tutor_success, UIManager.init_assign_tutor_error);
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
	
	init_assign_tutor_error: function()
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
		$("#tutors").empty();	
	},
	
	init_tutor_logbook: function()
	{
		$("#tname").val(sessionStorage.username);
		
		var date = new Date();
		var yyyy = date.getFullYear();
		var mm = date.getMonth() + 1;
		var dd = date.getDate();

		var hh = date.getHours();
		var min = date.getMinutes();
		var ss = date.getSeconds();

		$("#time").html(yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss);

		var query = {q: "tutor",
								 username: sessionStorage.username};
		AJAXManager.get_tutor_info(query, UIManager.init_tutor_logbook_success);
	},
	
	init_tutor_logbook_success: function(data) 
	{
		if (data != undefined)
		{
			$("#tname").val(data.name);

			if (data.code !== undefined)
			{
				$("#codes").empty();
				for (var index in data.code)
				{
					var code = data.code[index].Code;		
					$("#codes").append(new Option(code,code));	
				}
			}
		}
	},

	tutor_logbook_submit: function()
	{
		var form = document.forms["tutor_logbook_form"];

		var user = sessionStorage.username;
		var code = form.codes.value;
		var st_id = form.st_id.value;
		var sname = form.sname.value;
		var time = $("#time").text();

		var query = {q: "log",
								 username: user,
								 student_id: st_id,
								 course_code: code};
		AJAXManager.tutor_logbook(query);
	},
	
	init_report_admin: function()
	{
		var query = {q : "admin"}
		AJAXManager.get_report (query, UIManager.init_report_admin_success);
	},
	
	init_report_admin_success: function(data)
	{
		var template = "";
		for(var i in data)
		{
			template += "<tr>";
			template += "<td>" + data[i].Code + "</td>";
			template += "<td>" + data[i].Title + "</td>";
			template += "<td>" + data[i].Average_Grade + "</td>";
			template += "</tr>";
		}
		$("#report").html(template)
	},
	
	init_report_faculty: function()
	{
		var query = {q : "faculty"}
		AJAXManager.get_report (query, UIManager.init_report_faculty_success);
	},
	
	init_report_faculty_success: function(data)
	{
		var template = "";
		var a = data["more_than_three"];
		var b = data["one_to_three"];
		var c = data["zero"];
		
		for(var i in a)
		{
			template += "<tr>";
			template += "<td>" + a[i].Code + "</td>";
			template += "<td>" + a[i].Title + "</td>";
			template += "<td> 3+ </td>"
			template += "<td>" + a[i].Average_Grade + "</td>";
			template += "</tr>";
		}
		for(var x in b)
		{
			template += "<tr>";
			template += "<td>" + b[x].Code + "</td>";
			template += "<td>" + b[x].Title + "</td>";
			template += "<td> 1-3 </td>"
			template += "<td>" + b[x].Average_Grade + "</td>";
			template += "</tr>";
		}
		for(var y in c)
		{
			template += "<tr>";
			template += "<td>" + c[y].Code + "</td>";
			template += "<td>" + c[y].Title + "</td>";
			template += "<td> 0 </td>"
			template += "<td>" + c[y].Average_Grade + "</td>";
			template += "</tr>";
		}
		$("#report").html(template)
	},
	
	init_report_student: function()
	{
		var query = {q : "student"}
		AJAXManager.get_report (query, UIManager.init_report_student_success);
	},
	
	init_report_student_success: function(data)
	{
		var template = "";
		for(var i in data)
		{
			template += "<tr>";
			template += "<td>" + data[i].Name + "</td>";
			template += "<td>" + data[i].Code + "</td>";
			template += "<td>" + data[i].Title + "</td>";
			template += "<td>" + data[i].Average_Grade + "</td>";
			template += "</tr>";
		}
		$("#student-report").html(template)
	},
	
	populate_tutor_application: function(data)
	{
		// populate section dropdown menu
		if (data !== undefined)
		{
			$("#tutor_courses").empty();
			for (var index in data)
			{
				var code = data[index].Code;		
				$("#tutor_courses").append(new Option(code,code));	
			}
		}
	},
	
	populate_courses: function()
	{
		var form = document.forms["personal_info_faculty_form"];
		var dept_id = form.department.value;
		
		var query = {q : "course",
					dept_id : dept_id}
		AJAXManager.get_courses_list(query, UIManager.populate_courses_success);
	},
	
	populate_courses_success: function(data)
	{
		// populate courses dropdown menu
		if (data.length > 0)
		{
			$("#course").empty();
			for (var index in data)
			{
				var title = data[index].Title;
				var code = data[index].Code;
				
				$("#course").append(new Option(code,title));	
			}
		}
	},
	
	/**
	 * Faculty Profile
	 */
	populate_sections: function()
	{
		var form = document.forms["personal_info_faculty_form"];
		var course_title = form.course.value;
		var dept_id = form.department.value;;
		
		var query = {q : "section",
					course_title : encodeURIComponent(course_title),
					dept_id : dept_id}
		AJAXManager.get_sections_list(query, UIManager.populate_section_success);
	},
	
	populate_section_success: function(data)
	{
		// populate section dropdown menu
		if (data.length > 0)
		{
			$("#section").empty();
			for (var index in data)
			{
				var crn = data[index].CRN;
				var letter = data[index].Letter;
				
				$("#section").append(new Option(letter,crn));	
			}
		}
	},
	
	/**
	 * Course Registration
	 */
	 register_course: function(){
        var data = UIManager.course_data;
        
        var crn_str = "";
        var mode_str = "";
        for (var i = 0; i < UIManager.selectedIndex.length; i++) {
            var crn = data[UIManager.selectedIndex[i]].CRN;
            var gmode = $('#grading_mode'+i).val();
            data[UIManager.selectedIndex[i]].gmode = gmode;
            crn_str += crn + "::";
            mode_str += gmode + "::";
        }  
        
        var username = sessionStorage.username;
        
        var query = { username: username,
              crn: crn_str,
              grade_mode: mode_str };
                  
        AJAXManager.register_course(query, UIManager.registerCourseSuccess);
    },
    
    registerCourseSuccess: function(data){
        UIManager.load_page('registration_complete.html', UIManager.populateRegistrationComplete);
    },
    
    populateRegistrationComplete: function(){
        var data = UIManager.course_data;
        var template = "";
        
        for (var i = 0; i < UIManager.selectedIndex.length; i++) {
            
            var gmode = data[UIManager.selectedIndex[i]].gmode;
            
            template += "<tr>";
            template += "<td>"+ data[UIManager.selectedIndex[i]].Code +"</td>";
            template += "<td>"+ data[UIManager.selectedIndex[i]].Title +"</td>";
            template += "<td>"+ data[UIManager.selectedIndex[i]].Letter +"</td>";
            template += "<td>"+ gmode +"</td>";
            template += "</tr>";
        }        
        $("#registration_complete").empty();
        $("#registration_complete").html(template);
    },
    
    populateCourse: function(){
        var form = document.forms["select_department_form"];
        var input = form.department.value;
        var term = "Spring2013";
        
        var query = { q : "course",
					  dept_id: input,
                      term: term };
					  
        AJAXManager.get_courses(query, UIManager.populateCourseSuccess);
    },
    
    populateCourseSuccess: function(data) {
        UIManager.course_data = data;
        UIManager.load_page('course_selection.html', UIManager.populateCourseSuccess2);
    },
    
    returnToCourses: function() {
        UIManager.load_page('course_selection.html', UIManager.init_course_selection);
    },
    
    populateCourseSuccess2: function(data)
    {	
        if (data == undefined)
        	data = UIManager.course_data;
		else
			UIManager.course_data = data;
        var template = "";
        
        for(var i in data){
            template += "<tr>";
            template += "<td><input id=\"registered"+i+"\" name=\"registered\" type=\"checkbox\"></td>";
            template += "<td>"+ data[i].CRN +"</td>";
            template += "<td>"+ data[i].Title +"</td>";
            template += "<td>"+ data[i].Code +"</td>";
            template += "<td>"+ data[i].Letter +"</td>";
            template += "<td>"+ data[i].Name +"</td>";
            template += "<td>"+ data[i].Day +"</td>";
            template += "<td>"+ data[i].Time +"</td>";
            template += "<td>"+ data[i].Location +"</td>";
            template += "</tr>";
        }        
        $("#registration").empty();
        $("#registration").html(template);
    },
    
    populate_course_section2: function()
	{   
        var form = document.forms["course_selection_form"];
        
        UIManager.selectedIndex = new Array();
        var data = UIManager.course_data;
        for(var i in data){
            var isChecked = $('#registered'+i).attr('checked')?true:false;
            if(isChecked){
                UIManager.selectedIndex.push(i);
            }
        }
        
        UIManager.register_course_count = UIManager.selectedIndex.length;
        
        UIManager.load_page('course_selection2.html', UIManager.populate_course_section2_callback);
    },
    
    populate_course_section2_callback: function(){
		$("#department").html(UIManager.major);
		
        var template = "";
        
        var data = UIManager.course_data;
        
        for (var i = 0; i < UIManager.selectedIndex.length; i++) {
            template += "<tr>";
            template += "<td id=\"CRN" + i + "\">"+data[UIManager.selectedIndex[i]].CRN +"</td>";
            template += "<td>"+ data[UIManager.selectedIndex[i]].Title +"</td>";
            template += "<td>"+ data[UIManager.selectedIndex[i]].Code +"</td>";
            template += "<td>"+ data[UIManager.selectedIndex[i]].Letter +"</td>";
            template += "<td>";
            template += "<select id=\"grading_mode" + i + "\" name=\"grading_mode"+ i +"\">";
			template += "<option value=\"registered\">Registered</option>";
			template += "<option value=\"audit\">Audit</option>";
			template += "<option value=\"pass_fail\">Pass/Fail</option>";
            template += "</select>";
			template += "</td>";
            template += "</tr>";
        }        
        $("#registration").empty();
        $("#registration").html(template);
    },
	
	/**
	 * Assign Tutor
	 */
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
	
	
	/**
	 * Find Tutor
	 */
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
}