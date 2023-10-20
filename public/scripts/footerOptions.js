function footer(){


rankFooter = document.querySelector("#rankFooter");
ranks = document.querySelector('#ranks')

filtroFooter = document.querySelector("#filtroFooter");
filter = document.querySelector("#filter")

pageContent = document.querySelector("#pageContent")
footer = document.querySelector("#ToolBar");


    rankFooter.onclick = () => {
        rankFooter.classList.toggle("bx-x");
        ranks.classList.toggle("open");
        pageContent.style = "flex-direction: row-reverse;"

        filter.classList.remove("open");
};

    filtroFooter.onclick = () => {
        filtroFooter.classList.toggle("bx-x");
        filter.classList.toggle("open");
        ranks.classList.remove("open");

        pageContent.style = "flex-direction: row"
};
}