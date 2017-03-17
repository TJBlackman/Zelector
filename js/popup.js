(function(){

    const input = document.getElementById('selectorInput');
    const result = document.querySelector('.resultNum');
    input.addEventListener('keyup', checkSelectors);

    function checkSelectors(e){
        if (input.value.length < 1 ) { result.innerText = '0';}

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {selector: input.value}, function(response) {
              result.innerText = response.found;
          });
        });
    }

}());
