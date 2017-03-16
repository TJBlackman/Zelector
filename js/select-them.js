chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    getSelectors(request.selector);
});

function getSelectors(str){
    // delete all previous ones
    Array.from(document.querySelectorAll('.selectorHighlight'))
         .forEach(function(el){ el.remove(); });


    if (typeof str !== 'string'){
        try { str = String(str) }
        catch(error) { console.log(error); return; }
    }

    var elements = document.querySelectorAll(str);
    if ( elements.length < 1 ) {
        // show message about no valid selections
        console.log('No selections found.');
        return;
    }

    elements.forEach(function(el){
        var offTop = el.offsetTop;
        var offLeft = el.offsetLeft;
        var screenPosition = el.getBoundingClientRect();

        var hl = document.createElement('div');
            hl.classList.add('selectorHighlight');
            hl.style.backgroundColor = 'rgba(164, 0, 0, 0.3)';
            hl.style.border = '1px solid rgba(164, 0, 0, 1)';
            hl.style.height = (el.offsetHeight - 2)+'px'; // add room for border
            hl.style.width = (el.offsetWidth - 2)+'px';
            hl.style.display = 'block';
            hl.style.zIndex = 999;
            hl.style.position = 'absolute';
            hl.style.top = (screenPosition.top + window.scrollY) + 'px';
            hl.style.left = (screenPosition.left + window.scrollX) + 'px';

        document.body.prepend(hl);
    });

}
