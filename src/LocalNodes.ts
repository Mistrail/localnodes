type NodeRecord = {
    current?: object,
    prev?: object
}

export class LocalNodes {
    private static events: { [key: string]: Event } = {}
    private static eventTypeSx: string = "NodeChange"
    public static silent: boolean = false

    static log(...args: unknown[]): void {
        if(!LocalNodes.silent){
            console.log(...args)
        }        
    }

    static truncate(): void {
        localStorage.clear()
        for (const nodeName in LocalNodes.events) {
            LocalNodes.unsubscribe(nodeName);
        }
      }

    static addNode(nodeName: string, value: unknown = {}): void {
        const data = localStorage.getItem(nodeName);
        if (!data) {
            localStorage.setItem(nodeName, JSON.stringify(value))
        }
        const eventType: string = LocalNodes.getEventType(nodeName)
        LocalNodes.events[nodeName] = new Event(eventType)
    }

    private static getEventType(nodeName: string): string {
        return `${nodeName}${LocalNodes.eventTypeSx}`
    }

    static read(nodeName: string): NodeRecord {
        const data = localStorage.getItem(nodeName)
        return data ? JSON.parse(data) : {current: {}, prev: {}}
    }

    static write(nodeName: string, value: { [key: string]: unknown }): void {        
        let {prev, current} = LocalNodes.read(nodeName) as NodeRecord;
        prev = {...current}
        current = {...current, ...value}

        const eventType: string = LocalNodes.getEventType(nodeName)
        if (!LocalNodes.events[nodeName]) {
            LocalNodes.log(`event.write [${eventType}] not initiated`)
        } else {
            localStorage.setItem(nodeName, JSON.stringify({ current, prev }))
            const event: Event = LocalNodes.events[nodeName];
            document.dispatchEvent(event)
        }
    }

    static subscribe(nodeName: string, cb?: CallableFunction): void {
        const eventType: string = LocalNodes.getEventType(nodeName)
        const listener = cb ? (ev: Event) => cb(ev, LocalNodes.read(nodeName)) : () => {};
        if (!LocalNodes.events[nodeName]) {
            LocalNodes.log(`event.subscribe: [${eventType}] not initiated`)
        } else {
            LocalNodes.log(`subscribed to: [${eventType}]`)
            document.addEventListener(eventType, listener)
        }
    }

    static unsubscribe(nodeName: string, cb?: CallableFunction): void {
        const eventType: string = LocalNodes.getEventType(nodeName)
        const listener = cb ? (ev: Event) => cb(ev, LocalNodes.read(nodeName)) : () => {};
        if (!LocalNodes.events[nodeName]) {
            LocalNodes.log(`event.unsubscribe: [${eventType}] not initiated`)
        } else {
            document.removeEventListener(eventType, listener)
            LocalNodes.log(`subscription to [${eventType}] cancelled`)
        }
    }

    static clear(nodeName: string): void{
        localStorage.removeItem(nodeName)
        LocalNodes.unsubscribe(nodeName);
        LocalNodes.log(`node [${nodeName}] removed`)
    }

}