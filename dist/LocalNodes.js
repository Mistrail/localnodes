export class LocalNodes {
    static events = {};
    static eventTypeSx = "NodeChange";
    static truncate() {
        localStorage.clear();
    }
    static addNode(nodeName, value = {}) {
        const data = localStorage.getItem(nodeName);
        if (!data) {
            localStorage.setItem(nodeName, JSON.stringify(value));
        }
        const eventType = LocalNodes.getEventType(nodeName);
        LocalNodes.events[nodeName] = new Event(eventType);
    }
    static getEventType(nodeName) {
        return `${nodeName}${LocalNodes.eventTypeSx}`;
    }
    static read(nodeName) {
        const data = localStorage.getItem(nodeName);
        return data ? JSON.parse(data) : { current: {}, prev: {} };
    }
    static write(nodeName, value) {
        let { prev, current } = LocalNodes.read(nodeName);
        prev = { ...current };
        current = { ...current, ...value };
        const eventType = LocalNodes.getEventType(nodeName);
        if (!LocalNodes.events[nodeName]) {
            console.error(`event.write [${eventType}] not initiated`);
        }
        else {
            localStorage.setItem(nodeName, JSON.stringify({ current, prev }));
            const event = LocalNodes.events[nodeName];
            document.dispatchEvent(event);
        }
    }
    static subscribe(nodeName, cb) {
        const eventType = LocalNodes.getEventType(nodeName);
        const listener = cb ? (ev) => cb(ev, LocalNodes.read(nodeName)) : () => { };
        if (!LocalNodes.events[nodeName]) {
            console.error(`event.subscribe: [${eventType}] not initiated`);
        }
        else {
            console.log(`subscribed to: [${eventType}]`);
            document.addEventListener(eventType, listener);
        }
    }
    static unsubscribe(nodeName, cb) {
        const eventType = LocalNodes.getEventType(nodeName);
        const listener = cb ? (ev) => cb(ev, LocalNodes.read(nodeName)) : () => { };
        if (!LocalNodes.events[nodeName]) {
            console.error(`event.unsubscribe: [${eventType}] not initiated`);
        }
        else {
            document.removeEventListener(eventType, listener);
            console.log(`subscription to [${eventType}] cancelled`);
        }
    }
    static clear(nodeName) {
        localStorage.removeItem(nodeName);
        LocalNodes.unsubscribe(nodeName);
        console.warn(`node [${nodeName}] removed`);
    }
}
//# sourceMappingURL=LocalNodes.js.map