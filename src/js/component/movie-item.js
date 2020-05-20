const template = document.createElement('template');
template.innerHTML = `
  <style>
    .movie {
      overflow: hidden;
      position: relative;
      top: 0;
      left: 0;
      width: 12em;
      height: 280px;
      padding: 0;
      display: inline-block;
    }

    .movie:hover{
      cursor: pointer;
    }

    .movie img{
      transition: all .3s ease;
      width: 12em;
    }

    .movie:hover img {
      transform: scale(1.1);
    }

    .movie .info {
      display: none;
      transition: all .3s ease;
    }
    
    .movie:hover .info {
      position: absolute;
      background-color: rgba(0,0,0,.7);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .movie:hover .info p, .movie:hover .info h3 {
      color: whitesmoke;
      padding: 0;
      margin: 0;
    }
  </style>
  <div class="movie">
    <img />
    <div class="info">
      <h3><slot name="title"></h3>
      <p><slot name="release_date"></p>
    </div>
  </div>
`;

class MovieItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('poster');
  }
}

window.customElements.define('movie-item', MovieItem);