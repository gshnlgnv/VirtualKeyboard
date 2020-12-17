import {keyboards, specialSymblos} from "./languages.js";

const createIconHTML = (icon_name) => {
    return `<i class="material-icons">${icon_name}</i>`;
};

const KEYBOARD = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: "",
        capsLock: false,
        language: "RUS",
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard" , "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        this.drawingKeyboard();
        this.addHandler();
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        //Auto using keyboard with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach((element) => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {

                    console.log(currentValue);

                    element.value = currentValue;
                });
            })
        })

        /*
        //todo
        methos is this prop value v textarea
        zapuskat posle swith
       */

    },

    addHandler() {
        this.elements.keysContainer.addEventListener("click", (event) => {
            const {target: {dataset: {keysymbol}}} = event;

            console.log("this.properties.capsLock", this.properties.capsLock);

            if (event.target.classList.contains("keyboard__key")) {
                switch (keysymbol) {
                    case "backspace":
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
                        this._triggerEvent("oninput");
                        break;

                    case "caps":

                        //todo
                        console.log("event.target.classList = ", event.target.classList);
                        //event.target.classList.toggle("keyboard__key--active");
                        this.properties.capsLock = !this.properties.capsLock;
                        this.drawingKeyboard();
                        break;

                    case "enter":
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                        break;

                    case "space":
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        break;

                    case "done":
                        this.close();
                        this._triggerEvent("onclose");
                        break;

                    case "LANG":
                        this.properties.language = this.properties.language === "RUS" ? "ENG" : "RUS";
                        this.drawingKeyboard();
                        break;

                    default:
                        this.properties.value += event.target.textContent;
                        this._triggerEvent("oninput");
                        break;
                }
            }
        });
    },

    _triggerEvent(handlerName) {
       if (typeof this.eventHandlers[handlerName] == "function") {
          this.eventHandlers[handlerName](this.properties.value);
       }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    },

    drawingKeyboard() {
        const languageType = keyboards[this.properties.language];
        const {raskladka, breakPoints} = languageType;
        const fragment = document.createDocumentFragment();

        raskladka.forEach( (key) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = breakPoints.indexOf(key) !== -1;
            keyElement.setAttribute("type", "button");
            keyElement.setAttribute("data-keysymbol", key);
            keyElement.classList.add("keyboard__key");
            const isSpecialSymbol = Object.keys(specialSymblos).indexOf(key) !== -1;

            if (isSpecialSymbol) {


                //refactor ?

                if (key === "caps" && this.properties.capsLock === true) {
                    keyElement.classList.add("keyboard__key--active");
                } else {
                    keyElement.classList.remove("keyboard__key--active");
                }


                const {classes, icon} = specialSymblos[key];
                keyElement.classList.add(...classes);
                keyElement.innerHTML = createIconHTML(icon);

            } else if (key === "LANG") {
                keyElement.textContent = this.properties.language;
            } else {
                keyElement.textContent = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        this.elements.keysContainer.innerHTML = "";
        this.elements.keysContainer.appendChild(fragment);
    },
};

//when DOM is fully loaded we start to listen the DOM and init our keyboard script
window.addEventListener("DOMContentLoaded", () => {
    KEYBOARD.init();
});
