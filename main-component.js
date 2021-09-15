import { html, css, LitElement } from "lit";
import { ref, createRef } from "lit/directives/ref.js";

import store from "./redux/store";
import {
  fetchDogData,
  RANDOM_DOG_URL,
  fetchCatData,
  RANDOM_CAT_URL,
} from "./api";

export class MainComponent extends LitElement {
  static get styles() {
    return css`
      p {
        color: blue;
      }
      .row {
        display: flex;
      }
      .column {
        flex: 50%;
      }
      .column img {
        width: 100%;
        height: 100%;
        max-width: 500px;
        max-height: 300px;
      }
      @media only screen and (max-width: 600px) {
        .column img {
          max-width: 100%;
        }
      }
    `;
  }

  static properties = {
    name: { type: String },
    dogUrl: { type: String },
    catUrl: { type: String },
    showAnimal: { type: String },
    showRemoveButton: { type: Boolean },
  };

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData = async () => {
    fetchDogData(RANDOM_DOG_URL);
    fetchCatData(RANDOM_CAT_URL);
  };

  constructor() {
    super();
    this.name = "Gouri";
    this.dogUrl = "";
    this.catUrl = "";
    this.showAnimal = "";
    this.showRemoveButton = true;
    store.subscribe(() => {
      const state = store.getState();
      const { dogData, catData } = state.animalReducer;
      if (dogData) {
        this.dogUrl = dogData[0].url;
      }
      if (catData) {
        this.catUrl = catData[0].url;
      }
    });
  }

  _selectionChange = (e) => {
    const { animal } = e.detail;
    this.showAnimal = animal;
  };

  introCompRef = createRef();
  _removeIntroComp = (e) => {
    e.preventDefault();
    this.introCompRef.value.remove();
    this.showRemoveButton = false;
    console.log("DONE!");
  };

  render() {
    let animals = "Loading animals........";
    let removeButton = null;
    if (this.catUrl && this.dogUrl) {
      if (this.showAnimal === "cat") {
        animals = html`<div class="column"><img src=${this.catUrl} alt="I am a Cat"></img></div>`;
      } else if (this.showAnimal === "dog") {
        animals = html`<div class="column"><img src=${this.dogUrl} alt="I am a Dog"></img></div>`;
      } else {
        animals = html`
        <div class="column"><img src=${this.dogUrl} alt="I am a Dog"></img></div>
        <div class="column"><img src=${this.catUrl} alt="I am a Cat"></img></div>`;
      }
    }

    if (this.showRemoveButton) {
      removeButton = html`<button @click=${this._removeIntroComp}>
        Remove Intro Component
      </button>`;
    }
    return html`<p>Ready!</p>
      <div class="row">${animals}</div>
      <br />
      ${removeButton}
      <introduction-component
        ${ref(this.introCompRef)}
        @selected=${(e) => this._selectionChange(e)}
        class="nameClass"
        name=${this.name}
      />`;
  }
}

customElements.define("main-component", MainComponent);
