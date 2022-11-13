(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?module.exports=f():typeof define==='function'&&define.amd?define(f):(g=typeof globalThis!=='undefined'?globalThis:g||self,g.Query=f());})(this,(function(){'use strict';/**
 * Utilitario para manejar los parametros como objeto y luego convertirlos a string
 * y unirlos a una url.
 */
var Query = /** @class */ (function () {
    /**
     *
     * @param {Object} parameters Parametros a ser serializados.
     * @param {string|undefined} url (Opcional) url que se unirá a los parametros.
     */
    function Query(parameters, url) {
        if (url === void 0) { url = ""; }
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
    Query.prototype.serialize = function (encode) {
        if (encode === void 0) { encode = false; }
        this.encode = encode;
        return this.concat(Object.entries(this.flatten(this.parameters))
            .map(this.handleEncode.bind(this))
            .join("&"));
    };
    Query.prototype.concat = function (params) {
        if (!this.url) {
            return params;
        }
        return this.url.replace(/\/$/, "") + "?" + params;
    };
    Query.prototype.handleEncode = function (pair) {
        return (this.encode ? pair.map(encodeURIComponent) : pair).join("=");
    };
    Query.prototype.flatten = function (obj, path, result) {
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
    };
    Query.prototype.join = function (key, path) {
        if (path) {
            return "".concat(path, "[").concat(key, "]");
        }
        return key;
    };
    return Query;
}());return Query;}));//# sourceMappingURL=query.js.map
