/**
 * Utilitario para manejar los parametros como objeto y luego convertirlos a string
 * y unirlos a una url.
 */
export default class Query {
    private parameters;
    private url;
    /**
     * @property {boolean}
     */
    private encode;
    /**
     *
     * @param {Object} parameters Parametros a ser serializados.
     * @param {string|undefined} url (Opcional) url que se unirá a los parametros.
     */
    constructor(parameters: Record<string, any>, url?: string);
    /**
     * Serializa los parametros y lo concatena a la url.
     *
     * @param {boolean} encode Condificar los caracteres especiales.
     * @returns {string}
     */
    serialize(encode?: boolean): string;
    private concat;
    private handleEncode;
    private flatten;
    private join;
}
