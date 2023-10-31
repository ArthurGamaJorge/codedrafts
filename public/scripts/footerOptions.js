rankFooter = document.getElementById("rankFooter");
ranks = document.getElementById('ranks')

filtroFooter = document.getElementById("filtroFooter");
filter = document.getElementById("filter")

pageContent = document.getElementById("pageContent")
footer = document.getElementById("ToolBar");

boxPosts = document.getElementById('boxPosts')


    let toggleRank = () => {
        rankFooter.classList.toggle("bx-x");
        ranks.classList.toggle("open");
        pageContent.style = "flex-direction: row-reverse;"
        boxPosts.classList.toggle("oculto")
        filter.classList.remove("open");
};

    let toggleFilter = () => {
        filtroFooter.classList.toggle("bx-x");
        filter.classList.toggle("open");
        ranks.classList.remove("open");
        boxPosts.classList.remove("oculto")

        pageContent.style = "flex-direction: row"
};