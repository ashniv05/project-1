import { LitElement, html, css } from "lit";
import { DDDSuper  } from "@haxtheweb/d-d-d";
import "./hax-search.js";

 class SiteAnalyzer extends DDDSuper(LitElement) {
  static get properties() {
    return {
      url: { type: String },
      siteData: { type: Array, attribute: "site-data" },
      items: { type: Array },
      loading: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .input-section {
        display: flex;
        align-items: center;
        background-color: #fff; 
        border-radius: 24px;
        gap: 10px;
        width: 100%;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        margin: 20px auto;
        margin-bottom: 20px;
      }
      .search-section:hover {
        box-shadow: 0 1px 8px rgba(32, 33, 36, 0.35)
      }
      .search-icon {
        display: flex;
        align-items: center;
        background-color: #75d9a2; 
      }
      .search-input::placeholder {
        color: #79267d
      }
      .search-input:focus {
        outline: none;
      }
       button { 
        background-color: #11dd07; 
        color: white;
        border: none;
        border-radius: 5px;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        cursor: pointer;
        margin-right: 10px;
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color: #3999af;
      }

      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: 0.5s;
        transition: 0.5s all ease-in-out;

      }
      details {
        margin: 16px;
        padding: 16px;
        background-size: cover;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)
      }
      summary {
        font-size: 24px;
        padding: 16px;
        color: white;
      }
      input {
        font-size: 24px;
        line-height: 40px;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.url = "";
    this.siteData = {};
    this.items = [];
    this.loading = false;
  }

  render() {
    console.log("test")
    return html`
      <h2>HAX Site Analyzer</h2>
      <div class="input-section">
        <input id="input" placeholder="Enter site URL (e.g., https://haxtheweb.org)" @input="${this.inputChanged}" />
        <button @click="${this.analyzeSite}">Analyze</button>
      </div>

      ${this.siteData && Object.keys(this.siteData).length > 0 ? html`
        <div class="overview">
          <h3>Site Overview</h3>
          <p><strong>Name:</strong> ${this.siteData.title || 'N/A'}</p>
          <p><strong>Description:</strong> ${this.siteData.description || 'N/A'}</p>
          ${this.siteData.logo ? html`<img src="${this.siteData.logo}" alt="Site Logo" />` : ''}
          <p><strong>Theme:</strong> ${this.siteData.metadata.theme.name || 'N/A'}</p>
          <p><strong>Created:</strong> ${this.siteData.created || 'N/A'}</p>
          <p><strong>Last Updated:</strong> ${this.siteData.updated || 'N/A'}</p>
          <p><strong>Hex Code:</strong> ${this.siteData.hexCode || 'N/A'}</p>
          <p><strong>Icon:</strong> ${this.siteData.icon || 'N/A'}</p>
        </div>
      ` : ''}

      <div class="results">
        ${this.items.map(item => html`
          <site-card
            title="${item.title || 'Untitled'}"
            image="${item.image || ''}"
            description="${item.description || 'No description available.'}"
            updated="${item.metadata.updated || 'N/A'}"
            link="${item.slug}"
            sourceLink="${item.slug}/index.html"
          ></site-card>
        `)}
      </div>
    `;
  }

  inputChanged(e) {
    this.url = e.target.value;
  }

  async analyzeSite() {
    if (!this.url) {
      alert("Please enter a URL.");
      return;
    }

    const siteUrl = this.url.endsWith("site.json") ? this.url : `${this.url}/site.json`;

    this.loading = true;
    try {
      const response = await fetch(siteUrl);
      if (!response.ok) throw new Error("Failed to fetch site.json");

      const data = await response.json();
      if (!data || !data.metadata || !data.items) {
        alert("Invalid site.json schema.");
        this.loading = false;
        return;
      }

      this.siteData = data;
      this.items = data.items;
    } catch (error) {
      alert("Error fetching or processing site.json: " + error.message);
    } finally {
      this.loading = false;
    }
  }

  static get tag() {
    return "site-analyzer";
  }
}

customElements.define(SiteAnalyzer.tag, SiteAnalyzer);


