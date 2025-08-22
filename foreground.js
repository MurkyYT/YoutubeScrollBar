const style = document.createElement("style");
style.id = 'ytd-scrollbar-hider'
style.textContent = `ytd-app {overflow-x: hidden !important;}`;

function hasStyle(id) {
  return !!document.head.querySelector(`#${id}`);
}

function injectStyle(href)
{
    console.log(href);
    if (href.includes("www.youtube.com/watch?v="))
    {
        if(!hasStyle('ytd-scrollbar-hider'))
        {
            document.head.appendChild(style);
            console.log("add");
        }
    }
    else
    {
        if(hasStyle('ytd-scrollbar-hider'))
            document.head.removeChild(style);
    }    
}

const observeUrlChange = () => {
    let oldHref = document.location.href;
    injectStyle(oldHref);
    const body = document.querySelector('body');
    const observer = new MutationObserver(mutations => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            injectStyle(oldHref);
        }
    });
    observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;