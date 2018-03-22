(function(){

  // Dom tree walker, gets text nodes
  const get_text_nodes = function(){
    let current_node = null; 
    const nodes_array = []; 
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (current_node=walk.nextNode()) { 
      nodes_array.push(current_node); 
    }
    return nodes_array; 
  };

  // replace class with className for React
  const class_to_className = function(){
    const nodes = get_text_nodes(); 
    nodes.forEach(n => n.nodeValue = n.nodeValue.replace('class=','className='));
  };

  // replace one word from each text node with "poop"
  const make_poop = function(){
    const nodes = get_text_nodes(); 
    const index = 0; 
    const interval = setInterval(()=> {
      if (index < nodes.length){
        const words_array = nodes[index].nodeValue.split(' ');
        const i = get_random_num(words_array); 
        words_array[i] = 'POOP'; 
        nodes[index].nodeValue = words_array.join(' ');
      } else {
        console.log(`Made ${nodes.length} poops!`);
        clearInterval(interval);
      }
    }, 200);
  };

  // generate random number between 0 - array.length
  const get_random_num = function(array) {
    return Math.floor(Math.random() * array.length);
  };

  // highlight selected elements on page
  const get_css_selections = function(selector){
    remove_highlights(); 
    if (selector.toLowerCase() === 'make poop'){
      make_poop()
    } else {
      const elements = Array.from(document.querySelectorAll(selector));
      if (elements.length > 0){
        const fragment = document.createDocumentFragment('div'); 
        elements.map(el => {
          const newEl = create_new_el(el); 
          fragment.appendChild(newEl);
        });
        document.body.prepend(fragment);
      }
    }
  }

  // remove highlighted elements
  const remove_highlights = function(){
    document.querySelectorAll('.zelector_highlight').forEach(function(el){
      el.remove();
    });
  }

  // return new highlight element
  const create_new_el = function(el){
    const {height, width, top, left} = el.getBoundingClientRect();
    const styles = [
      'background-color: rgba(164,0,0,0.3);',
      'border: 1px solid rgba(164, 0, 0, 1);',
      'display: block;',
      'z-index: 999;',
      'position: absolute;',
      `top: ${top}px;`,
      `left: ${left}px;`,
      `height: ${height}px;`,
      `width: ${width}px;`
    ].join('');
    const newElement = document.createElement('div');
    newElement.classList.add('zelector_highlight');
    newElement.style.cssText = styles; 
    return newElement; 
  }

  chrome.runtime.onMessage.addListener(function({type, payload}, sender, sendResponse){
    switch (type){
      case 'SELECTOR': get_css_selections(payload); break; 
      case 'CLASS_NAME': class_to_className(); break; 
      case 'PANDORA': break; 
      
      default: null; 
    }
  });

  document.body.addEventListener('click', remove_highlights);

}())