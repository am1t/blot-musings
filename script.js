{{{appJS}}}


const themeSwitch = document.querySelector('.theme-switcher button[type="button"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
}

function switchTheme(e) {

    if (localStorage.getItem('theme')) {
		localStorage.removeItem('theme');
		document.documentElement.removeAttribute('data-theme');
    } else {
		localStorage.setItem('theme', 'dark');
		document.documentElement.setAttribute('data-theme', 'dark');
    }

    /*if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
    }
    else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	} */   
}

themeSwitch.addEventListener('click', switchTheme, false);

var post_url = window.location.href;

$(document).ready(function(){	
	$("ul#mentions-list").empty();
  $.getJSON("https://webmention.io/api/mentions?per-page=50&page=0&jsonp=?", {
    target: post_url
  }, function(data){
		var social_media_likes = "";
		var social_media_repost = "";
		var social_media_post = "";
		if(data.links.length !== 0){
			$("#post-mentions").show();
		}
  	$.each(data.links, function(i, v){
  		var activity_type = data.links[i].activity.type;
		  
		if(data.links[i].data.author && data.links[i].data.author.name){
			var men_content = "";
			if(activity_type && activity_type == "like"){
				if(!social_media_likes){
					social_media_likes = "<li class=\"mention-social\"><i class=\"fa fa-thumbs-up\"></i> ";
				}
				social_media_likes = social_media_likes + 
				"<a href=\"" + data.links[i].data.url + "\">"
					+ data.links[i].data.author.name + "</a>, ";
			} else if(activity_type && activity_type == "repost"){
				if(!social_media_repost){
					social_media_repost = "<li class=\"mention-social\"><i class=\"fa fa-twitter\"></i> ";
				}
				social_media_repost = social_media_repost + 
				"<a href=\"" + data.links[i].data.url + "\">"
					+ data.links[i].data.author.name + "</a>, ";
			}else if(activity_type && activity_type == "link"){
				if(!social_media_post){
					social_media_post = "<li class=\"mention-social\"><i class=\"fa fa-link\"></i> ";
				}
				social_media_post = social_media_post + 
				"<a href=\"" + data.links[i].data.url + "\">"
					+ data.links[i].data.author.name + "</a>, ";
			} else if(activity_type && activity_type == "reply"){
						let mention_date = new Date(data.links[i].verified_date);
					if(data.links[i].data.content) {
						men_content = data.links[i].data.content;
						if(men_content.startsWith("<p>")){
							men_content = men_content.split(/<p>(.+)/)[1];
						}
						while(men_content.startsWith("<a href=\"https://micro.blog")){
							men_content = men_content.split(/<\/a>(.+)/)[1].trim();
						}
						men_content = "<p>" + men_content;
					}
				$("ul#mentions-list").prepend( "<li class=\"mention\">"
					+ "<div class=\"mention-author u-author\">" 
					+ "<img src=\"" + data.links[i].data.author.photo + "\" class=\"u-photo\"" 
					+ "title=\"" + data.links[i].data.author.name + "\" width=\"40\" style=\"margin-right:10px;border-radius:4px;\">" 
					+ "<a href=\"" + data.links[i].data.author.url + "\">"
					+ data.links[i].data.author.name + "</a> <span class=\"commented\">replied:</span></div>"
					+ "<div class=\"mention-text\">" + men_content + "</div>"
					+ "<a href=\"" + data.links[i].data.url + "\" class=\"small\">"
					+ "<time>" + mention_date.getUTCDate() + "/" + (mention_date.getUTCMonth() + 1) 
					+ "/" + mention_date.getUTCFullYear()
				+ "</time></a>"
				+ "</li>");
			}
		}
  		
	});
    if(social_media_post){
			social_media_post = social_media_post.substr(0, social_media_post.length - 2);
			social_media_post = social_media_post + " <span class=\"commented\">linked to this.</span></li>";
			$("ul#mentions-list").prepend(social_media_post);
		}			
    if(social_media_repost){
			social_media_repost = social_media_repost.substr(0, social_media_repost.length - 2);
    	social_media_repost = social_media_repost + " <span class=\"commented\">reposted this on Twitter.</span></li>";
	    $("ul#mentions-list").prepend(social_media_repost);
		}
		if(social_media_likes){
			social_media_likes = social_media_likes.substr(0, social_media_likes.length - 2);
			social_media_likes = social_media_likes  + " <span class=\"commented\">liked this.</span></li>";
			$("ul#mentions-list").prepend(social_media_likes);
		}
	});
});


// This script is embedded in the footer of every page