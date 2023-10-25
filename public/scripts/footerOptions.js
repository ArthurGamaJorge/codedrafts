rankFooter = document.querySelector("#rankFooter");
ranks = document.querySelector('#ranks')

filtroFooter = document.querySelector("#filtroFooter");
filter = document.querySelector("#filter")

pageContent = document.querySelector("#pageContent")
footer = document.querySelector("#ToolBar");


    let toggleRank = () => {
        rankFooter.classList.toggle("bx-x");
        ranks.classList.toggle("open");
        pageContent.style = "flex-direction: row-reverse;"

        filter.classList.remove("open");
};

    let toggleFooter = () => {
        filtroFooter.classList.toggle("bx-x");
        filter.classList.toggle("open");
        ranks.classList.remove("open");

        pageContent.style = "flex-direction: row"
};