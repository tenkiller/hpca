/** 
 * This class simulates a naive one-issue, 5-stage processor pipeline. Dependencies between instructions are not 
 * enforced. It also assumes that each stage of the pipeline executes in exactly one cycle, with no stalls or bubbles.
 * @class Pipeline
 */
class Pipeline {
  constructor(instructions) {
    this.instructions = instructions;
    this.stack = [];
    this.cycle = 1;
    this.log = [];
  }
  
  fetch([cycle]) {
    // fetch the instruction
    let instruction = this.instructions.shift();
        
    this.stack.push({ cycle: cycle+1, func: this.decode, args: [instruction] });
    this.log.push(`${cycle} : FETCHED instruction "${instruction}"`);
  }
  
  decode([cycle, instruction]) {    
    if (!instruction) {
      throw new ReferenceError('No instruction to decode.');
    }
    
    // interpret instruction opcode and operands
    let parts = instruction.split(' '),
        opcode = parts[0],
        operands = parts[1].split(',');
    
    this.stack.push({ cycle: cycle+1, func: this.execute, args: [instruction, opcode, operands] });
    this.log.push(`${cycle} : DECODED instruction into opcode "${opcode}" and operands "${operands.join(',')}"`);
  }
  
  execute([cycle, instruction, opcode, operands]) {    
    if (!opcode || !operands) {
      throw new ReferenceError('No opcode or operands to execute.');
    }
    // perform calculations on data and memory addresses
    this.stack.push({ cycle: cycle+1, func: this.memory, args: [instruction] });    
    this.log.push(`${cycle} : EXECUTED "${opcode}" on "${operands.slice(1).join(',')}"`);
  }
  
  memory([cycle, instruction]) {
    // load and store data to memory
    this.stack.push({ cycle: cycle+1, func: this.write, args: [instruction] });
    this.log.push(`${cycle} : MEMORY accessed for "${instruction}"`);
  }
  
  write([cycle, instruction]) {
    // write results to registers
    this.log.push(`${cycle} : WRITE performed for "${instruction}"`);
  }
  
  run() {    
    while (true) {
      // if there's an instruction, fetch it
      if (this.instructions.length) {
        this.stack.push({ cycle: this.cycle, func: this.fetch });
      }
      
      // get only the steps in the pipeline stack that execute this cycle
      let steps = this.stack.filter((obj) => {
        return obj.cycle === this.cycle;
      });
      
      // if there's nothing to execute, we're done
      if (!steps.length) {
        this.log.push('--DONE--');
        break;
      }
      
      // run the pipeline steps for this cycle
      while (steps.length) {
        let step = steps.shift();
        step.func.call(this, Array.prototype.concat(step.cycle, step.args));
      }
    
      this.cycle++;
    }
    
    return this.log;
  }
}

export default Pipeline;
