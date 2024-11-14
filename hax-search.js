import { LitElement, html, css } from "lit";

export class SiteCard extends LitElement {
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
        border: 1px solid #ddd;
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 240px;
      }

      .card img {
        width: 100%;
        max-width: 200px;
        height: auto;
      }

      .card h3 {
        margin: 10px 0;
        font-size: 18px;
      }

      .card p {
        font-size: 14px;
        color: #666;
      }

      .card a {
        text-decoration: none;
        color: #007acc;
        font-weight: bold;
        margin-top: 5px;
      }

      .card a:hover {
        color: #005b99;
      }
    `;
  }

  constructor() {
    super();
    this.title = '';
    this.image = '';
    this.description = '';
    this.updated = '';
    this.link = '';
    this.sourceLink = '';
  }

  render() {
    return html`
      <div class="card" tabindex="0">
        ${this.image ? html`<img src="${this.image}" alt="${this.title}" />` : ''}
        <h3>${this.title || ''}</h3>
        <p><strong>Last updated:</strong> ${this.updated || 'N/A'}</p>
        <p>${this.description || 'No description.'}</p>
        <a href="${this.link}" target="_blank">Open in new window</a>
        <a href="${this.sourceLink}" target="_blank">Open source</a>
      </div>
    `;
  }

  static get tag() {
    return "site-card";
  }
}

customElements.define(SiteCard.tag, SiteCard);

