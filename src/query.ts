class Query {
    constructor(
        private parameters: Record<string, any>,
        private encoded = false
    ) {}

    /**
     * Convierte un objecto a paramatros GET serializados.
     */
    static encode(parameters: Record<string, any>): string {
        return new Query(parameters, true).serialize();
    }

    /**
     * Convierte un objecto a paramatros GET no serializados.
     */
    static toString(parameters: Record<string, any>): string {
        return new Query(parameters, false).serialize();
    }

    private serialize(): string {
        return Object.entries(this.flatten(this.parameters))
            .map((pair: [string, string]) =>
                (this.encoded ? pair.map(encodeURIComponent) : pair).join("=")
            )
            .join("&");
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
                    result[this.join(key, path)] = !this.encoded
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

export default Query;
