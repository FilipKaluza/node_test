const hide = () => {
    nav = document.getElementsByClassName("nav");
    basic_show = document.getElementsByClassName("galery_basic_show");
    footer = document.getElementsByClassName("footer");
    body = document.getElementsByTagName("body")
    /* Give them a hide class */

    nav[0].className += " hide";
    basic_show[0].className += " hide";
    footer[0].className += " hide";
    body[0].className +=" nav_lightbox"

}

const visible = () => {
    nav = document.getElementsByClassName("nav");
    basic_show = document.getElementsByClassName("galery_basic_show");
    footer = document.getElementsByClassName("footer");
    body = document.getElementsByTagName("body")
    /* Class hide is going to die */
    nav[0].className = nav[0].className.replace(" hide", "");
    basic_show[0].className = basic_show[0].className.replace(" hide", "");
    footer[0].className = footer[0].className.replace(" hide", "");
    body[0].className = body[0].className.replace(" nav_lightbox", "");


}