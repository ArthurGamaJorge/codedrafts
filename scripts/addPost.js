adicionarPost()


function adicionarPost() {
    let div = document.getElementById('posts')
    
    post = document.createElement("div")
    post.setAttribute("id", "postResult")
    post.innerHTML = "<a href='#'> <h1>A Post</h1></a>" +
    "<i>By <a href='#'>Ion Mateus</a></i> " +
    "<p>AHAHAHAHAHAHAsAHAHAHAHAHAHAsAHAHAHAHAHAHAsAHAHAHAHAHAHAsAHAHAHAHAHAHAsAHAHAHAHAHAHAsAHAHAHAHAHAHAsAHAHAHAHAHAHAs" +
    "consequatur sunt earum impedit aut autem nesciunt inventore vitae quod obcaecati ipsam dolores ipsum similique.</p>" +
    "<b><a href='#'>Programming</a> |<a href='#'>C++</a> |<a href='#'>Google</a> |<a href='#'>Java</a></b>"
    div.appendChild(post);
}