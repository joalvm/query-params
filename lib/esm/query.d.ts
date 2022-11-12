declare class Query {
    private parameters;
    private encoded;
    constructor(parameters: Record<string, any>, encoded?: boolean);
    /**
     * Convierte un objecto a paramatros GET serializados.
     */
    static encode(parameters: Record<string, any>): string;
    /**
     * Convierte un objecto a paramatros GET no serializados.
     */
    static toString(parameters: Record<string, any>): string;
    private serialize;
    private flatten;
    private join;
}
export default Query;
//# sourceMappingURL=query.d.ts.map