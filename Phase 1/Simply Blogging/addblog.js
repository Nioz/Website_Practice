function addPost() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let url = document.getElementById("link").value;
    posts = JSON.parse(localStorage.getItem("posts") || "[]");
    let post = {ti:title, ct:content, li:url};
    console.log(JSON.stringify(post));
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

}

function displayPost() {
    let postArr = JSON.parse(localStorage.getItem("posts"));
    
    var postHead = "<div class=\"container\"><div class=\"row\">";
    var postBody="";
    var postFoot = "</div></div>"
    postArr.forEach(post=>{
        postBody+=
            "<div class=\"col-4\">"+
                "<div class=\"card mb-3\">"+
                    "<div class=\"card-body\"><h4 class=\"card-title\">" + post.ti + "</h4>" +
                        "<p class=\"card-subtitle\">"+post.ct+"</p>"+ 
                        "<img src=\""+post.li+"\"class=\"img-thumbnail\">" + 
                    "</div>"+
                "</div>"+
            "</div>";

    })
    
    var content = postHead + postBody + postFoot;
    document.getElementById("main").innerHTML=content;
} 