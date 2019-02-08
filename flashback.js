let json_feed_url = "https://blog.amitgawande.com/feed.json";
let tz = "Asia/Kolkata";
let container = document.getElementById('on-this-day');

function renderPost(post) {
    var postEl = document.createElement('article');
    postEl.className = 'h-entry entry';
    container.appendChild(postEl);

    if (post.title != null) {
        var titleEl = document.createElement('h2');
        titleEl.className = 'p-name';
        titleEl.innerText = decodeURIComponent(post['title']);
        postEl.appendChild(titleEl);
    }


    var contentEl = document.createElement('div');
    contentEl.className = 'e-content';
    contentEl.innerHTML = decodeURIComponent(post['content_html']);
    postEl.appendChild(contentEl);

    var metapost = document.createElement('span');
    metapost.className = 'small';
    
    var calIcn = document.createElement('i');
    calIcn.className = "fa fa-calendar";
    metapost.appendChild(calIcn);

    var permalinkEl = document.createElement('a');
    permalinkEl.className = 'small date u-url';
    permalinkEl.setAttribute("style", "padding-left: 5px;");
    permalinkEl.href = decodeURIComponent(post.url);
    metapost.appendChild(permalinkEl);
    postEl.appendChild(metapost);

    var publishedEl = document.createElement('time');
    publishedEl.className = 'dt-published';
    publishedEl.datetime = post['date_published'];

    var published = post['date_published'];
    published = new Date(published);

    publishedEl.innerText = published.toDateString();
    permalinkEl.appendChild(publishedEl);    
}

function renderNoContent() {
    var noPostsEl = document.createElement('p');
    noPostsEl.innerText = 'No posts found for this day. Check back tomorrow!';
    container.appendChild(noPostsEl);
}

var xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.open('GET', json_feed_url, true);
xhr.send();

xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        container.innerHTML = '';

        let posts_items = xhr.response.items;
        let filtered_items = [];
        posts_items.forEach((item) => {
            let item_date = new Date(item.date_published);
            var localTime = new Date().toLocaleString("en-US", {timeZone: tz});
            let now_date = new Date(localTime);

            if((now_date.getDate() === item_date.getDate()) 
                && (now_date.getMonth() === item_date.getMonth())
                && (now_date.getFullYear() !== item_date.getFullYear())){
                    filtered_items.push(item);
            }
        });

        if (filtered_items.length == 0) {
            renderNoContent();
        } else {
            filtered_items.forEach(function(post) {
                renderPost(post);
            });
        } 
    }   
}