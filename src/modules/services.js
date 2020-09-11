export async function languageObject() {
    const locale = localStorage.getItem("currentUser").language || "eng";
    return await import(`./langData/${locale}.js`).then(res => res[locale]);
}