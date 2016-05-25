
class Buffer {
  constructor() {
    this.buffer = [];
  }
  
  add(element) {
    this.buffer.push(element);
  }
  
  get size() {
    return this.buffer.length;
  }
}

class ReservationStation extends Buffer {
  constructor() {
    super();
  }
}

class ReOrderBuffer extends Buffer {
  constructor() {
    super();
  }
}

class DynamicScheduler {
  constructor(queue, rs, rob) {
    this.queue = queue;
    this.rs = rs;
    this.rob = rob;
  }
}

export default DynamicScheduler;