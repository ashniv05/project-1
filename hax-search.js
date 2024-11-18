import { LitElement, html, css } from "lit";
import { DDDSuper  } from "@haxtheweb/d-d-d";
import "./site-card.js";

export class HaxSearch extends LitElement {
  constructor() {
    super();
    this.title = '';
    this.loading = false;
    this.items = [ ];
    this.value = '';
    this.jsonURL = 'https://haxtheweb.org/site.json';
  }

  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
      jsonURL: {type: String, attribute: 'json-url'},
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }

      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
      }

      details {
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-athertonViolet);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      summary {
        font-size: 24px;
        padding: var(--ddd-spacing-2);
        color: white;
      }

      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
        padding: var(--ddd-spacing-2);
        border: var(-ddd-border-sm) solid var(---ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
        box-sizing: border-box;
      }

      input:focus {
        outline: none;
        border-color: var(--ddd-theme-default-skyBlue);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      button {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        font-size: 16px;
        color: var(---ddd-theme-default-white);
        background-color: var(--ddd-theme-default-coalyGray);
        border: none;
        border-radius: var(--ddd-radius-md);
        cursor: pointer;
        margin-top: 8px;
      }

      button:hover {
        background-color: var(--ddd-theme-default-slateGray);
      }

      .card {
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        border: var(-ddd-border-sm) solid var(---ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      .card h3 {
        margin: var(--ddd-spacing-2);
        font-size: 18px;
      }

      .card p {
        font-size: 14px;
        color: var(--ddd-theme-default-limestoneGray);
      }

      .card a {
        color: var(--ddd-theme-default-skyBlue);
        text-decoration: none;
        font-weight: bold;
      }

      .card a:hover {
        text-decoration: underline;
      }
    `;
  }

  constructor() {
    super();
    this.title = "HAX Search";
    this.loading = false;
    this.items = [];
    this.value = "";
    this.url = "";
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <details open>
        <summary>Search Input</summary>
        <div>
          <input
            id="input"
            placeholder="Enter HAX site URL"
            @input="${this.inputChanged}"
          />
          <button @click="${this.searchSite}">Search</button>
        </div>
      </details>
      <div class="results">
        ${this.items.map((item) => html`
            <div class="card">
              <h3>${item.title || "Untitled"} </h3>
              <p>${item.description || "No description available."}</p>
              ${item.slug
                ? html`<a href="${this.url}/${item.slug}" target="_blank">View Page</a>`
                : ""}
            </div>
          `
        )}
      </div>
    `;
  }

  inputChanged(e) {
    this.value = e.target.value;
  }

  async searchSite() {
    if (!this.value) {
      alert("Please enter a URL.");
      return;
    }

    const url = this.value.endsWith("site.json")
      ? this.value
      : `${this.value}/site.json`;

    this.loading = true;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch site.json");

      const data = await response.json();
      if (!data || !data.items) {
        alert("Invalid site.json schema.");
        this.loading = false;
        return;
      }

      this.items = data.items;
    } catch (error) {
      console.error("Error fetching site.json:", error);
      alert("Error fetching site.json. Please check the URL.");
    } finally {
      this.loading = false;
    }
  }

  static get tag() {
    return "hax-search";
  }
}

customElements.define(HaxSearch.tag, HaxSearch);

