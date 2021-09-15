import { html, css, LitElement } from "lit";
import { styleMap } from "lit-html/directives/style-map";

import { fetchDogBreeds } from "./api";

export class IntroductionComponent extends LitElement {
  static get styles() {
    return css`
      :host p::first-letter {
        color: var(--color, blue);
        font-size: x-large;
      }
      p:hover {
        color: orange;
      }
      @keyframes animateName {
        0% {
          transform: rotate(0deg);
          left: 10%;
        }
        25% {
          transform: rotate(70deg);
          left: 30%;
        }
        50% {
          transform: rotate(150deg);
          left: 60%;
        }
        75% {
          transform: rotate(200deg);
          left: 80%;
        }
        100% {
          transform: rotate(-360deg);
          left: 0%;
        }
      }
      .greeting {
        position: relative;
        animation-name: animateName;
        animation-duration: 4s;
        animation-delay: 2s;
        animation-iteration-count: 3;
        display: inline-block;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      timeSpent: { type: { sec: Number, min: Number, hour: Number } },
      timerColour: { type: String },
      dogBreeds: { type: Array },
    };
  }

  _startTimer = () => {
    let { sec, min, hour } = this.timeSpent;
    sec += 1;
    if (sec === 60) {
      min = min + 1;
      sec = 0;
    }
    if (min === 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }
    this.timeSpent = {
      sec,
      min,
      hour,
    };
  };

  _changeColour = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.styles.color = `#${randomColor}`;
  };

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  _fetchData = async () => {
    const breeds = await fetchDogBreeds();
    this.dogBreeds = breeds.slice(0, 4);
  };

  constructor() {
    super();
    this.timeSpent = { sec: 0, min: 0, hour: 0 };
    this.styles = { color: "green" };
    document.addEventListener("DOMContentLoaded", () => {
      setInterval(this._startTimer, 1000);
      setInterval(this._changeColour, 5000);
    });
  }

  _tryChange = (e) => {
    const animal = e.target.value;
    const detail = { animal };
    const event = new CustomEvent("selected", {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
  };

  render() {
    const { sec, min, hour } = this.timeSpent;
    return html`
    <br/>
    <h4 class="greeting">
        Hello <p class="greeting">${this.name}!</p>
    </h4>
    You spent <span style=${styleMap(
      this.styles
    )}>${hour} : ${min} : ${sec}</span> here!
    <div>Show only:
        <input type="radio" @change=${
          this._tryChange
        } value="dog" name="animal">Dog</input>
        <input type="radio" @change=${
          this._tryChange
        } value="cat" name="animal">Cat</input>
    </div>
    <br/>
    Dog breeds:
    <ul>
      ${(this.dogBreeds || []).map(({ name }) => html`<li>${name}</li>`)}
    </ul>
    `;
  }
}

customElements.define("introduction-component", IntroductionComponent);
