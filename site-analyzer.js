import { LitElement, html, css } from "lit";
import "./site-card.js";

export class SiteAnalyzer extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      metadata: { type: Object },
      items: { type: Array },
      loading: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
      .input-section {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }
      input[type="text"] {
        flex-grow: 1;
        padding: 8px;
      }
      button {
        padding: 8px 16px;
        cursor: pointer;
      }
      .overview {
        border: 1px solid #ddd;
        padding: 16px;
        margin-bottom: 20px;
      }
      .overview img {
        max-width: 100px;
        margin-top: 10px;
      }
      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
    `;
  }

  constructor() {
    super();
    this.url = "";
    this.metadata = {};
    this.items = [];
    this.loading = false;
  }

  render() {
    return html`
      <h2>HAX Site Analyzer</h2>
      <div class="input-section">
        <input id="input" placeholder="Enter site URL (e.g., https://haxtheweb.org)" @input="${this.inputChanged}" />
        <button @click="${this.analyzeSite}">Analyze</button>
      </div>

      ${this.metadata && Object.keys(this.metadata).length > 0 ? html`
        <div class="overview">
          <h3>Site Overview</h3>
          <p><strong>Name:</strong> ${this.metadata.title || 'N/A'}</p>
          <p><strong>Description:</strong> ${this.metadata.description || 'N/A'}</p>
          ${this.metadata.logo ? html`<img src="${this.metadata.logo}" alt="Site Logo" />` : ''}
          <p><strong>Theme:</strong> ${this.metadata.theme || 'N/A'}</p>
          <p><strong>Created:</strong> ${this.metadata.created || 'N/A'}</p>
          <p><strong>Last Updated:</strong> ${this.metadata.updated || 'N/A'}</p>
          <p><strong>Hex Code:</strong> ${this.metadata.hexCode || 'N/A'}</p>
          <p><strong>Icon:</strong> ${this.metadata.icon || 'N/A'}</p>
        </div>
      ` : ''}

      <div class="results">
        ${this.items.map(item => html`
          <site-card
            title="${item.title || 'Untitled'}"
            image="${item.image || ''}"
            description="${item.description || 'No description available.'}"
            updated="${item.updated || 'N/A'}"
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

      this.metadata = data.metadata;
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


