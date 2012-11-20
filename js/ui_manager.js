var UIManager =
{
	url:				"",
	
	load_page: function(page_name)
	{
		if (page_name === undefined) 
			$("#main").load("page/create_account.html");
		else
			$("#main").load("page/" + page_name);
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
			UIManager.load_page(page_name);
	}
}