


(function(){

    window.TJB = {};

    // this clear selectors if flag indicates that there are any
    window.addEventListener('click', function(){
        if (TJB.selectionsFound) {
            document.querySelectorAll('.selectorHighlight').forEach(el => el.remove());
            TJB.selectionsFound = false;
        }
    });

    // listen for message from extension window!!
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        console.log(request);
        if      (request.selector)  getSelectors(request.selector, sendResponse);
        else if (request.makepoop)  makePoops(sendResponse);
    });




    // ========== FUNCTION LIB ===========
    // ===================================
    function getSelectors(selector, sendResponse){
        // delete all previous highlights
        if (TJB.selectionsFound)
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


        // send back data on number of matched elements
        sendResponse({"found":elements.length})

        // if nothing found, now is a good time to stop!
        if ( elements.length < 1 ) { return; }

        // set flag
        TJB.selectionsFound = true;

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

    function makePoops(sendResponse){
        // selector a bunch of elements and filter it out to only qualifying elements
    	var elNodeList = document.body.querySelectorAll('a, p, label, span, li, h1, h2, h3, h4, h5, h6');
    	var elArray = Array.from(elNodeList);
    	var elWithText = elArray.filter(function(el, index){
    		if (el.childNodes.length === 1 	&&
    			el.style.display !== 'none' &&
    			el.innerText !== undefined 	&&
    			el.innerText.length > 0 	&&
    			isNaN(el.innerText)) {
    			return true;
    		};
    	});
    	// if none found, end the function
    	if (elWithText.length < 1){console.log('NO SELECTIONS'); return; }

        sendResponse({madePoops:elWithText.length});

    	// make poop every quarter second!
    	var interval = setInterval(makePoop, 250);

    	function makePoop(){
    		// end if no more selections available
    		if (elWithText.length === 0 ) { console.log('POOP FUNCTION IS OVER! MADE '+elWithText.length+' POOPS!'); clearInterval(interval); return; }

    		// create random number, and use it to select element from array of qualifying elements
    		var randomEl = getRandomInt(0, elWithText.length);
    		var elText;
    		try {elText = elWithText[randomEl].innerText }
    		catch(e){ elWithText.splice(randomEl, 1); return; }

    		// split the innerText, measure the array options, get a random one
    		// if the random is a word, replace it with poop, and put it back in place
    		var elTextArray = elText.split(' ');
    		var randomWord = getRandomInt(0, elTextArray.length);
    		if (elTextArray[randomWord].length < 1) {return; }
    		elTextArray[randomWord] = "POOP";
    		elWithText[randomEl].innerText = elTextArray.join(' ');

    		// remove this item from the array
    		elWithText.splice(randomEl, 1);
    	}

    	// function to return random number bewteen min and max value | MDN
    	function getRandomInt(min, max) {
    	  min = Math.ceil(min);
    	  max = Math.floor(max);
    	  return Math.floor(Math.random() * (max - min)) + min;
    	}
    }

}());
