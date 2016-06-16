
class Buffer {
  constructor() {
    this.buffer = [];
  }
  
  get size() {
    return this.buffer.length;
  }
}

class RegisterFile {
  constructor(limit) {
    this.registers = {};
    this.size = limit - 1;
    
    for (let i = 1; i <= limit; i++) {
      this.registers['R' + i] = null;
    }
  }
}

class InstructionQueue extends Buffer {
  constructor(queue) {
    super();

    for (let instruction of queue) {
      this.add(instruction);
    }
  }
  
  add(instruction) {
    let parts = this.parse(instruction),
        element = new InstructionQueueElement(parts.opcode, parts.operands);
    
    this.buffer.push(element);
  }
  
  parse(instruction) {
    // interpret instruction opcode and operands
    let parts = instruction.split(' '),
        opcode = parts[0],
        operands = parts[1].split(',');
        
    return { opcode, operands };
  }
}

class InstructionQueueElement {
  constructor(opcode, operands) {
    this.opcode = opcode;
    this.operands = operands;
    this.issued = 0;
    this.executed = 0;
    this.written = 0;
    this.committed = 0;
  }
}

class ReservationStation extends Buffer {
  constructor(limit) {
    super();
    this.limit = limit;
  }
}

class ReservationStationElement {
  constructor(opcode, dest, tagA, tagB, valA, valB) {
    this.opcode = opcode;
    this.dest = dest;
    this.tags = [tagA, tagB];
    this.vals = [valA, valB];
  }
}

class ReOrderBuffer extends Buffer {
  constructor(limit) {
    super();
    this.limit = limit;
  }
}

class ReOrderBufferElement {
  constructor(opcode, dest) {
    this.opcode = opcode;
    this.dest = dest;
    this.value = 0;
    this.done = false;
  }
}

class DynamicScheduler {
  constructor(queue) {
    this.arf = new RegisterFile(8);           // architectural register file
    this.rat = new RegisterFile(8);           // register alias table
    this.rs = new ReservationStation(4);      // reservation station
    this.rob = new ReOrderBuffer(8);          // reorder buffer
    this.queue = new InstructionQueue(queue); // instruction queue
  }

  run() {
    for (let i = 0; i < this.queue.size; i++) {
      // TODO
    }
  }

  output() {
    // NOT IMPLEMENTED
  }
}

export default DynamicScheduler;