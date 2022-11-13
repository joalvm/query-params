'use strict';/**
 * Utilitario para manejar los parametros como objeto y luego convertirlos a string
 * y unirlos a una url.
 */
class Query {
    /**
     *
     * @param {Object} parameters Parametros a ser serializados.
     * @param {string|undefined} url (Opcional) url que se unirá a los parametros.
     */
    constructor(parameters, url = "") {
        this.parameters = parameters;
        this.url = url;
        /**
         * @property {boolean}
         */
        this.encode = false;
    }
    /**
     * Serializa los parametros y lo concatena a la url.
     *
     * @param {boolean} encode Condificar los caracteres especiales.
     * @returns {string}
     */
    serialize(encode = false) {
        this.encode = encode;
        return this.concat(Object.entries(this.flatten(this.parameters))
            .map(this.handleEncode.bind(this))
            .join("&"));
    }
    concat(params) {
        if (!this.url) {
            return params;
        }
        return this.url.replace(/\/$/, "") + "?" + params;
    }
    handleEncode(pair) {
        return (this.encode ? pair.map(encodeURIComponent) : pair).join("=");
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
                    result[this.join(key, path)] = !this.encode
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
}module.exports=Query;