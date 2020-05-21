const template = document.createElement('template');
template.innerHTML = `
  <div class="form-group">
    
  </div>
`;

class SearchBar extends HTMLElement{
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode);
  }
}

window.customElements.define('search-bar', SearchBar)