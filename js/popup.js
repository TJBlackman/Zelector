'use strict';
// ==== CSS SELECTOR FUNCTION ====
(function(){
    const input = document.querySelector('#selector input');
    const result = document.querySelector('#selector .resultNum');

    function checkSelectors(e){
        if (input.value.length < 1 ) { result.innerText = '0';}
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {selector: input.value}, function(response) {
              try { result.innerText = response.found; }
              catch(e) { /* do nothing :D */ }
          });
        });
    }

    input.addEventListener('keyup', checkSelectors);
}());

// ==== POOP SCRIPT ====
(function(){

    const button = document.querySelector('#poop button');
    const results = document.querySelector('#poop p');
    const resultsNum = document.querySelector('#poop .numPoops');

    function makePoop(){
        hideButtonShowResult();

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {makepoop: true}, function(response) {
              CountPoopsMade(response.madePoops);
          });
        });
    }

    function hideButtonShowResult(){
        button.classList.add('hidden');
        results.classList.remove('hidden');
    }

    function CountPoopsMade(num){
        console.log(num);
        if (typeof num !== 'number') num = +num;
        var counter = 0;
        var interval = setInterval(function(){
            if (counter >= num) clearInterval(interval);
            resultsNum.textContent = counter;
            counter++;
        }, 250)

    }

    button.addEventListener('click', makePoop);

}())
