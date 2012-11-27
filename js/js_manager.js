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
		
		var query = { username: username, 
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
		
		if (user_type == "faculty")
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
	}
}