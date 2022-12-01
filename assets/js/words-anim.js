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