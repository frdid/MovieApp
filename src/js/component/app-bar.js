class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        :host {
            display: block;
            width: 100%;
            background-color: rgb(13, 37, 63);
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            font-size:62.5%;
        }
        nav {
            padding: 16px;
            color: white;
        }
        nav a{
          display: inline-block;
          color: #90cea1;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
        }
        nav a.navbar-brand{
          color: whitesmoke;
        }
        .navbar-nav{
          float: right;
        }
        .nav-item {
          padding: 0 10px;
        }
        .nav-item.nav-link .sr-only {
          display: none;
        }
        .nav-item.active {
          color: white;
        }
        nav .nav-item:hover{
          color: whitesmoke;
        }
    </style>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">MovieApp</a>
      <div class="navbar-nav">
      <a class="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#now-playing-area">Now Playing</a>
      <a class="nav-item nav-link" href="#discover-movies-area">Discover</a>
      </div>
  </nav>
    `;
  }
}

customElements.define("app-bar", AppBar);