import { LitElement, html, css } from "lit";
import '@haxtheweb/simple-icon/simple-icon.js';

export class SiteCard extends LitElement {
  constructor() {
    super();
    this.title = "";
    this.image = "";
    this.description = "";
    this.updated = "";
    this.link = "";
    this.sourceLink = "";
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      description: { type: String },
      updated: { type: String },
      link: { type: String },
      sourceLink: { type: String },
    };
  }

  static get styles() {
    return css`
    .card {
        display: inline-block;
        min-height: 350px;
        width: 240px;
        padding: var(--ddd-spacing-4);
        align-items: center;
        border: var(-ddd-border-sm) solid var(---ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
        text-align: center;
        background-color: var(--ddd-theme-default-white);
        transition: transform 0.2s, box-shadow 0.2s;
        overflow: hidden;
        justify-content: space-between; 
      }

      .card:hover {
        transform: translateY(-5px);
        box-shadow:var(--ddd-boxShadow-md);;
        background-color: var(--ddd-theme-default-accent);
      }

      .card img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
        background-color: var(--ddd-theme-default-athertonViolet);
      }

      .card h3 {
        font-size: 18px;
        margin: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-potentialMidnight);
      }

      .card p {
        font-size: 14px;
        color: var(--ddd-theme-default-coalyGray);
        text-align: justify;
        margin: var(--ddd-spacing-2);
      }

      .card a {
        display: block;
        margin-top: 8px;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        text-decoration: none;
        color: var(--ddd-theme-default-slateMaxLight);
        background-color: var(--ddd-theme-default-skyBlue);
        border-radius: var(--ddd-radius-md);
        font-size: 14px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }

      .card a:hover {
        background-color: var(--ddd-theme-default-slateGray);
      }
    `;
  }

  render() {
    return html`
      <div class="card" tabindex="0">
        <img
          src="${this.image ? new URL('/' + this.image, this.link).href : 'https://avatars.githubusercontent.com/u/170651362?s=200&v=4'}"
          alt="${this.title || 'Default Image'}"
        />
        <h3>${this.title || "Untitled"}</h3>
        <p>${this.description || "No description provided."}</p>
        <p><strong>Last Updated:</strong> ${this.updated || "N/A"}</p>
        <a href="${this.link}" target="_blank">View Page</a>
        <a href="${this.link ? new URL(this.sourceLink, this.link).href : this.sourceLink}" target="_blank">View Source</a>
      </div>
    `;
  }

  static get tag() {
    return "site-card";
  }

  firstUpdated() {
    console.group(`Site Card: ${this.title}`);
    console.log('URL:', this.url);
    console.log('Description:', this.description);
    console.log('Theme:', this.metadata?.theme?.name);
    console.log('Created:', this.metadata?.site?.created);
    console.log('Updated:', this.metadata?.site?.updated);
    console.log('Full Data:', this);
    console.groupEnd();
  }
}

customElements.define(SiteCard.tag, SiteCard);