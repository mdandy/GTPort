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
	
	select_page: function(element, page_name)
	{
		// Reset selection
		$("#sidebar_nav li").each(function(index) 
		{
			$(this).removeClass("active");
		});
		
		// Select this element
		$(element).parent().addClass("active");
		
		// Load the page
		if (page_name !== undefined)
		{
			if (page_name === "personal_info_student.html")
				UIManager.load_page(page_name, UIManager.init_personal_info_student);
		}
	},
	
	init_personal_info_student: function()
	{
		$("#tutor_courses").pickList({
			sourceListLabel:    "Eligilble",
        	targetListLabel:    "Applied",	
		});
	}
}