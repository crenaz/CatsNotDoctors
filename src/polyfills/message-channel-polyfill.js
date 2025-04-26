// MessageChannel polyfill for Cloudflare Workers environment
if (typeof globalThis.MessageChannel === 'undefined') {
  class MessagePort {
    constructor() {
      this.onmessage = null;
    }
    
    postMessage(message) {
      if (this._otherPort && this._otherPort.onmessage) {
        const event = { data: message };
        setTimeout(() => {
          if (this._otherPort.onmessage) {
            this._otherPort.onmessage(event);
          }
        }, 0);
      }
    }
    
    start() {}
    close() {}
  }
  
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = new MessagePort();
      this.port2 = new MessagePort();
      
      this.port1._otherPort = this.port2;
      this.port2._otherPort = this.port1;
    }
  };
}

export default {};