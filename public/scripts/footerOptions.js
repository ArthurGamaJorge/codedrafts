rankFooter = document.getElementById("rankFooter");
ranks = document.getElementById('ranks')

filtroFooter = document.getElementById("filtroFooter");
filter = document.getElementById("filter")

pageContent = document.getElementById("pageContent")
footer = document.getElementById("ToolBar");


    let toggleRank = () => {
        rankFooter.classList.toggle("bx-x");
        ranks.classList.toggle("open");
        pageContent.style = "flex-direction: row-reverse;"

        filter.classList.remove("open");
};

    let toggleFilter = () => {
        filtroFooter.classList.toggle("bx-x");
        filter.classList.toggle("open");
        ranks.classList.remove("open");

        pageContent.style = "flex-direction: row"
};