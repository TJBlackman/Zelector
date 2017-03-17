(function(){

    // TODO: change this to a data connection so I can listen for extension window close
    // for now, just clear divs on window click
    window.addEventListener('click', function(){
        document.querySelectorAll('.selectorHighlight').forEach(el => el.remove());
    });

    // listen for message from extension window!!
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        getSelectors(request.selector, sendResponse);
    });

    function getSelectors(selector, sendResponse){
        // delete all previous highlights
        document.querySelectorAll('.selectorHighlight').forEach(el => el.remove());

        // verify selector type
        if (typeof selector !== 'string'){
            try { selector = String(selector) }
            catch(error) { return; }
        }

        // store dom variable in element
        let elements;
        try { elements = document.querySelectorAll(selector); }
        catch(error) { return; }


        // send back data on matched elements
        sendResponse({"found":elements.length})

        // if nothing found, now is a good time to stop!
        if ( elements.length < 1 ) { return; }

        // highlight every matched element with a
        // hovering, absolutely positioned, colored <div>
        elements.forEach(function(el){
            const offTop = el.offsetTop;
            const offLeft = el.offsetLeft;
            const screenPosition = el.getBoundingClientRect(); // gives coords of matched el

            const hl = document.createElement('div');
            hl.classList.add('selectorHighlight');

            const height = screenPosition.height + 'px';
            const width = screenPosition.width + 'px';
            const top = (screenPosition.top + window.scrollY) + 'px';
            const left = (screenPosition.left + window.scrollX) + 'px';

            hl.style.cssText = 'background-color: rgba(164, 0, 0, 0.3); border: 1px solid rgba(164, 0, 0, 1); display: block; z-index: 999; position: absolute; top: '+top+'; left: '+left+'; height: '+height+'; width: '+width+';'

            document.body.prepend(hl);
        });
    }

}());
