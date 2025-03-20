type NodeRecord = {
    current?: object;
    prev?: object;
};
export declare class LocalNodes {
    private static events;
    private static eventTypeSx;
    static truncate(): void;
    static addNode(nodeName: string, value?: unknown): void;
    private static getEventType;
    static read(nodeName: string): NodeRecord;
    static write(nodeName: string, value: {
        [key: string]: unknown;
    }): void;
    static subscribe(nodeName: string, cb?: CallableFunction): void;
    static unsubscribe(nodeName: string, cb?: CallableFunction): void;
    static clear(nodeName: string): void;
}
export {};
//# sourceMappingURL=LocalNodes.d.ts.map