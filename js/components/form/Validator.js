class Validator {
    static isValidName(name) {
        // ne tuscias tekstas
        // tik abeceles raides
        // pirma raide didzioji
        return true;
    }
    static isValidEmail(email) {
        // ne tuscias tekstas
        // ne trumpesnis nei 6 simboliai
        // tik 1 @ simbolis
        // pries @ turi buti nemaziau 1 simbolio
        // uz @ turi buti ne maziau 4 simboliu
        // be @ dar gali buti tik raides, skaiciai, taskas, minusas, underscore
        // domenu dalyje tik 1 taskas
        // lokasioj daly negali eiti keli [taskai, minusai, underscore] is eiles

        return true;
    }
    static isValidMessage(message) {
        // ne tuscias tekstas
        // nevirsyti 1000 simboliu
        // 
        return true;
    }

    static notEmptyString(text) {
        if (typeof text !== 'string') {
            return 'Turi buti tekstas';
        }
        if (text === '') {
            return 'Tekstas negali buti tuscias';
        }
        return true;
    }

}

export { Validator }