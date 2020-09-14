export class Language {
  constructor() {
    if (Language.exists) {
      return Language.instance;
    }
    this.locale =
      JSON.parse(localStorage.getItem("currentUser")).language || "eng";
    Language.instance = this;
    Language.exists = true;
    return this;
  }
  async languageObject() {
    return await import(`./langData/${this.locale}.js`).then(
      (res) => res[this.locale]
    );
  }
}
