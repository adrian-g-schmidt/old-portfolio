const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const wordsTop = entry.target.querySelector('.w1');
        const wordsBot = entry.target.querySelector('.w2');
        const wordsSingle = entry.target.querySelector('.w0');

        if (entry.isIntersecting) {
            if (wordsTop){
                wordsTop.classList.add('start');
            }
            if (wordsBot){
            wordsBot.classList.add('start');
            }
            if (wordsSingle){
                wordsSingle.classList.add('start');
            }
        return; // if we added the class, exit the function
        }

        // We're not intersecting, so remove the class!
        if (wordsTop){
            wordsTop.classList.remove('start');
        }
        if (wordsBot){
        wordsBot.classList.remove('start');
        }
        if (wordsSingle){
            wordsSingle.classList.remove('start');
        }
    });
});

var headings = document.querySelectorAll('h2');

[].forEach.call(headings, function(head) {
    observer.observe(head);
});


window.onresize = resizeAdjust;

window.onscroll = function (e) {  
    if (window.matchMedia("(max-width: 700px)").matches) {
        document.getElementById("links").style.display="none" 
    }
} 

var width=window.innerWidth;

function resizeAdjust(){
    if (window.innerWidth!= width){
        if (window.matchMedia("(min-width: 700px)").matches) {
            document.getElementById("links").style.display = "flex"
        } else {
            document.getElementById("links").style.display = "none"
        }       
        let collapsible = document.getElementsByClassName("collapsible")[0]
        var content = collapsible.nextElementSibling;
        content.style.maxHeight = null;
        collapsible.classList.remove("active")
        collapsible.innerHTML = "See More Projects";
        width=window.innerWidth;
    }
}

function hamburger() {
    var x = document.getElementById("links");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}