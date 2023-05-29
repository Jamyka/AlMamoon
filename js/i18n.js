
const lngs = {
    en: { nativeName: 'English' },
    ar: { nativeName: 'Arabic' }
};

const renderBtn = () => {
    Object.keys(lngs).map((lng) => {
        const opt = `<button id="${lng}" class="btn btn-link" onclick="changeLang(${lng})">${lngs[lng].nativeName}</button>`
        if (lng != i18next.resolvedLanguage) {
            $('#languageSwitcher').empty()
            $('#languageSwitcher').append(opt);
        }
    });
}

const changeLang = (str) => {
    let chosenLng = str.getAttribute("id");
    i18next.changeLanguage(chosenLng, () => {
        renderBtn();
        rerender();
    });

}

const rerender = () => {
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('body').localize();
}


$(function () {
    // use plugins and options as needed, for options, detail see
    // https://www.i18next.com
    i18next
        // detect user language
        // learn more: https://github.com/i18next/i18next-browser-languageDetector
        .use(i18nextBrowserLanguageDetector)
        // init i18next
        // for all options read: https://www.i18next.com/overview/configuration-options
        .init({
            debug: true,
            fallbackLng: 'en',
            resources: {
                en: {
                    translation: {
                        // here we will place our translations...
                        nav: {
                            home: "Home",
                            about: "About",
                            services: "Services",
                            clients: "Clients",
                            contact: "Contact",
                        }
                    }
                },
                ar: {
                    translation: {
                        // here we will place our translations...
                        nav: {
                            home: "الرئيسية",
                            about: "عنا",
                            services: "خدمات",
                            clients: "عملاء",
                            contact: "تواصل معنا",
                        }
                    }
                }
            }
        }, (err, t) => {
            if (err) return console.error(err);

            // for options see
            // https://github.com/i18next/jquery-i18next#initialize-the-plugin
            jqueryI18next.init(i18next, $, { useOptionsAttr: true });
            // fill language switcher


            renderBtn();
            rerender();
        });
});