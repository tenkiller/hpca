
class Buffer {
  constructor(limit) {
    this.buffer = [];
    this.limit = limit;
  }
  
  add(element) {
    if (this.size < this.limit) {
      this.buffer.push(element);
      return true; 
    }
    return false;
  }
  
  get size() {
    return this.buffer.length;
  }
}

class RegisterFile extends Buffer {
  constructor(limit) {
    super(limit);
  }
}

class ReservationStation extends Buffer {
  constructor(limit) {
    super(limit);
  }
}

class ReservationStationElement {
  constructor(type, tagA, tagB, valA, valB) {
    this.type = type;
    this.tags = [tagA, tagB];
    this.vals = [valA, valB];
    this.answer = null;
  }
}

class ReOrderBuffer extends Buffer {
  constructor(limit) {
    super(limit);
  }
}

class DynamicScheduler {
  constructor(queue, rs, rob) {
    this.queue = queue;
    this.rs = rs;
    this.rob = rob;
  }
}

export { DynamicScheduler, ReservationStation, ReOrderBuffer };