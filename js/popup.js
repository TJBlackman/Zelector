
    var input = document.getElementById('selectorInput');
    input.addEventListener('keyup', checkSelectors);

    function checkSelectors(e){
        var selectorValue = input.value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {selector: selectorValue}, function(response) {
              // some response could go here.
          });
        });
    }
