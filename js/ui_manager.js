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
			UIManager.load_page(page_name, UIManager.multiselect_tutor_courses);
		}
	},
	
	multiselect_tutor_courses: function()
	{
		$("#tutor_courses").pickList({
			sourceListLabel:    "Eligilble",
        	targetListLabel:    "Applied",	
		});
	}
}