/**
 * Utilitario para manejar los parametros como objeto y luego convertirlos a string
 * y unirlos a una url.
 */
export default class Query {
    /**
     * @property {boolean}
     */
    private encode: boolean = false;

    /**
     *
     * @param {Object} parameters Parametros a ser serializados.
     * @param {string|undefined} url (Opcional) url que se unirá a los parametros.
     */
    constructor(
        private parameters: Record<string, any>,
        private url: string = ""
    ) {}

    /**
     * Serializa los parametros y lo concatena a la url.
     *
     * @param {boolean} encode Condificar los caracteres especiales.
     * @returns {string}
     */
    serialize(encode: boolean = false): string {
        this.encode = encode;

        return this.concat(
            Object.entries(this.flatten(this.parameters))
                .map(this.handleEncode.bind(this))
                .join("&")
        );
    }

    private concat(params: string) {
        if (!this.url) {
            return params;
        }

        return this.url.replace(/\/$/, "") + "?" + params;
    }

    private handleEncode(pair: [string, string]): string {
        return (this.encode ? pair.map(encodeURIComponent) : pair).join("=");
    }

    private flatten(
        obj: Record<string, any>,
        path?: string,
        result?: Record<string, any>
    ): Record<string, string> {
        // Si es la primerera llamada osea cuando no es un llamado de la recursividad
        if (result === undefined) {
            var type = Object.prototype.toString.call(obj);

            if (type === "[object Object]") {
                result = {};
            } else if (type === "[object Array]") {
                result = [];
            } else {
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
                    result[this.join(key, path)] = !this.encode
                        ? encodeURIComponent(obj[key])
                        : obj[key];
                    break;
            }
        }

        return result;
    }

    private join(key: string, path?: string): string {
        if (path) {
            return `${path}[${key}]`;
        }

        return key;
    }
}
