class Query {
    parameters;
    encoded;
    constructor(parameters, encoded = false) {
        this.parameters = parameters;
        this.encoded = encoded;
    }
    /**
     * Convierte un objecto a paramatros GET serializados.
     */
    static encode(parameters) {
        return new Query(parameters, true).serialize();
    }
    /**
     * Convierte un objecto a paramatros GET no serializados.
     */
    static toString(parameters) {
        return new Query(parameters, false).serialize();
    }
    serialize() {
        return Object.entries(this.flatten(this.parameters))
            .map((pair) => (this.encoded ? pair.map(encodeURIComponent) : pair).join("="))
            .join("&");
    }
    flatten(obj, path, result) {
        // Si es la primerera llamada osea cuando no es un llamado de la recursividad
        if (result === undefined) {
            var type = Object.prototype.toString.call(obj);
            if (type === "[object Object]") {
                result = {};
            }
            else if (type === "[object Array]") {
                result = [];
            }
            else {
                return {};
            }
        }
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            if (!obj[key]) {
                continue;
            }
            switch (Object.prototype.toString.call(obj[key])) {
                case "[object Array]":
                case "[object Object]":
                    this.flatten(obj[key], this.join(key, path), result);
                    break;
                default:
                    result[this.join(key, path)] = !this.encoded
                        ? encodeURIComponent(obj[key])
                        : obj[key];
                    break;
            }
        }
        return result;
    }
    join(key, path) {
        if (path) {
            return `${path}[${key}]`;
        }
        return key;
    }
}
export default Query;
