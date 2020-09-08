export async function languageObject() {
    const users = JSON.parse(localStorage.getItem("users"));
    const locale = users.find(user => user.isLogged === true).language || "eng";
    return await import(`./langData/${locale}.js`).then(res => res[locale]);
}