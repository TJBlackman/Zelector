'use strict';
// ==== CSS SELECTOR FUNCTION ====
(function(){
    const input = document.querySelector('#css_selector input');
    const results = document.querySelector('#css_selector .text-muted');
    const resultsNumber = results.querySelector('.resultNum');

    const send_data_to_extension = (payload, callback) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, payload, callback);
        });
    };

    input.addEventListener('input', () => {
        const action = {
            type: "SELECTOR",
            payload: input.value
        };
        send_data_to_extension(action, (num) => { resultsNumber.innerText = isNaN(num) ? 0 : num }); 
    });

    const reactButton = document.getElementById('react_classnames');
    reactButton.addEventListener('click', () => { 
        send_data_to_extension({type:'CLASS_NAME'}); 
    });

}());
