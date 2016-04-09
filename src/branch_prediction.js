/**
 * Base class for the Counter and Predictor classes.
 * @class Base
 * @abstract
 */
class Base {
  constructor(n) {
    this._bits = n;
    this._history = 0;
  }
  
  get history() {
    let bin = this._history.toString(2); 
    return bin.length >= this._bits ? bin : new Array(this._bits - bin.length + 1).join('0') + bin;
  }
}

/**
 * @class Counter
 */
class Counter extends Base {
  constructor(n) {
    super(n);    
    this._max = 0;
        
    for (let i = 0; i < this._bits; i++) {
      this._max += Math.pow(2, i);
    }
    
    this._saturated = Math.floor(this._max / 2);
  }
  
  increment() {
    this._history += (this._history < this._max) ? 1: 0;
  }
  
  decrement() {
    this._history -= (this._history > 0) ? 1: 0;
  }
    
  predict() {
    return this._history > this._saturated;
  }
  
  update(outcome) {
    if (outcome) {
      this.increment();
    } else {
      this.decrement();
    }
  }
}

/**
 * @class Predictor
 */
class Predictor extends Base {
  constructor(n) {
    super(n);
    this._mask = 0;
    this._counters = [];
    
    for (let i = 0; i < this._bits; i++) {
      this._mask += Math.pow(2, i);
    }
    
    for (let j = 0; j < Math.pow(2, this._bits); j++) {
      this._counters.push(new Counter(2));
    }
  }
  
  predict() {
    return this._counters[this._history].predict();
  }
  
  update(outcome) {
    this._counters[this._history].update(outcome);
    this._history = ((this._history << 1) + (outcome << 0)) & this._mask;
  }
}

/**
 * Process a given branch behavior pattern and return the results.
 * @param {Number} n - Number of bits for the counter or history.
 * @param {Number} type - Type of branch predictor.
 * @param {String} pattern - Branch behavior pattern.
 * @param {Number} pass - Number of passes to perform.
 * @return {Array} Prediction results.
 */
let process = (n, type, pattern, pass) => {
  let bpred = (type) ? new Predictor(n) : new Counter(n),
      steps = pattern.split('').map((char) => { return /[tT]/.test(char) ? true : false; }), 
      results = [];
  
  for (let p = 1; p <= pass; p++) {
    for (let s = 0; s < steps.length; s++) {
      let prediction = bpred.predict(),
          outcome = steps[s],
          correct = (prediction === outcome);
      
      results.push([p, bpred.history, prediction, outcome, correct]);      
      bpred.update(outcome);
    }
  }

  return results;
};

export default process;
