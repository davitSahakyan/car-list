export const languageObject = (eng, rus, arm) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const loginedUserLanguage = users.find(user => user.isLogged === true).language;

    let languageObject = {};
    const changeLanguage = (lng) => {
        languageObject = { ...lng };
    };
    switch (loginedUserLanguage) {
        case "eng":
            changeLanguage(eng);
            break;
        case "rus":
            changeLanguage(rus);
            break;
        case "arm":
            changeLanguage(arm);
            break;
        default:
            changeLanguage(eng);
    }

    return languageObject;
};