export const keyboards = {
    "ENG": {
        raskladka: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w" ,"e" ,"r" ,"t", "y" ,"u" ,"i", "o", "p",
            "caps", "a", "s", "d", "f", "g" ,"h" ,"j" ,"k", "l", "enter",
            "done" ,"z" ,"x" ,"c" ,"v" ,"b", "n", "m" ,",", ".", "?",
            "LANG", "space"
        ],
        breakPoints: ["backspace" ,"p", "enter", "?"],
    },
    "RUS": {
        raskladka: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "х" ,"ъ" ,
            "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж" ,"э" ,"enter",
            "caps","я", "ч", "с", "м", "и", "т", "ь" ,"б" ,"ю", "." ,"," ,"ё",
            "LANG", "space"
        ],
        breakPoints: ["backspace" ,"ъ", "enter", "ё"],
    },
};

export const specialSymblos = {
    "backspace" : {
        classes: ["keyboard__key--wide"],
        icon : "backspace",
    },
    "caps" : {
        classes: ["keyboard__key--wide", "keyboard__key--activatable" ],
        icon : "keyboard_capslock",
    },
    "enter" : {
        classes: ["keyboard__key--wide"],
        icon : "keyboard_return",
    },
    "space" : {
        classes: ["keyboard__key--extrawide"],
        icon : "space_bar",
    },
    "done" : {
        classes: ["keyboard__key--wide", "keyboard__key--dark"],
        icon : "check_circle",
    },
};
