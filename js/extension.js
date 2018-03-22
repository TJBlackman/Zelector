'use strict';
// ==== CSS SELECTOR FUNCTION ====
(function(){
    const input = document.querySelector('#css_selector input');
    const result = document.querySelector('#css_selector .resultNum');

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
        send_data_to_extension(action, () => {});
    });

    const reactButton = document.getElementById('react_classnames');
    reactButton.addEventListener('click', () => { send_data_to_extension({type:'CLASS_NAME'}); })

}());
