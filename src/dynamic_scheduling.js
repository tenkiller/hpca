
class RegisterFile {
  constructor(limit) {
    this.registers = {};
    
    for (let i = 1; i <= limit; i++) {
      this.registers['R' + i] = null;
    }
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

class InstructionQueue {
  constructor(queue) {
    this.queue = [];

    for (let instruction of queue) {
      this.add(instruction);
    }
  }

  parse(instruction) {
    // interpret instruction opcode and operands
    let parts = instruction.split(' '),
        opcode = parts[0],
        operands = parts[1].split(',');
        
    return { opcode, operands };
  }
  
  add(instruction) {
    let opcode, operands = this.parse(instruction),
        element = new InstructionQueueElement(opcode, operands);
    
    this.queue.push(element);
  }

  next() {
    if (this.queue.length) {
      return this.queue.shift();
    }
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

class ReservationStation {
  constructor(limit) {
    this.table = {};
    this.limit = limit;
    this.counter = 0;
  }

  ready() {
    return Object.keys(this.table).length < this.limit;
  }

  add(element) {
    this.table[this.counter] = element;
    return this.counter++;
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

class ReOrderBuffer {
  constructor(limit) {
    this.buffer = {};
    this.limit = limit;
    this.counter = 0;
    this.commit_ndx = 0;
  }

  ready() {
    return Object.keys(this.buffer).length < this.limit;
  }

  add(element) {
    this.buffer[this.counter] = element;
    return this.counter++;
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
    let instruction = this.queue.next();

    while (instruction) {
      // if there are spaces available in the reservation station and reorder buffer
      if (this.rs.ready() && this.rob.ready()) {
        let rs_element = new ReservationStationElement(),
            rob_element = new ReOrderBufferElement();

        this.rs.add(rs_element);
        this.rob.add(rob_element);
      }

      instruction = this.queue.next();
    }
  }

  output() {
    // NOT IMPLEMENTED
  }
}

export default DynamicScheduler;