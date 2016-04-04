/** 
 * @class Pipeline  
 */
class Pipeline {
  constructor(instructionQueue) {
    this.queue = instructionQueue;
    this.log = [];
  }
  
  fetch() {
    // fetch instruction from the queue
    this.instruction = this.queue.shift();
    this.log.push(`FETCHED instruction "${this.instruction}"`);
  }
  
  decode() {
    // interpret instruction opcode and operands
    if (!this.instruction) {
      throw new ReferenceError('No instruction to decode.');
    }
    
    let parts = this.instruction.split(' ');
    this.opcode = parts[0];
    this.operands = parts[1].split(',');
    
    this.log.push(`DECODED instruction into opcode "${this.opcode}" and operands "[${this.operands.join(',')}]"`);
  }
  
  execute() {
    // perform calculations on data and memory addresses
    if (!this.opcode || !this.operands) {
      throw new ReferenceError('No opcode or operands to execute.');
    }
    
    this.log.push(`EXECUTED "${this.opcode}" on "[${this.operands.slice(1).join(',')}]"`);
  }
  
  memory() {
    // load and store data to memory
    this.log.push(`MEMORY accessed for "${this.instruction}"`);
  }
  
  write() {
    // write results to registers
    this.log.push(`WRITE performed to "[${this.operands[0]}]" for "${this.instruction}"`);
  }
  
  run() {
    while(this.queue.length) {
      this.fetch();
      this.decode();
      this.execute();
      this.memory();
      this.write();
    }
  }
}

export default Pipeline;
