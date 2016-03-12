/**
 * Process a given branch behavior pattern and return the results.
 * @param {String} pattern - The branch behavior pattern.
 * @param {Number} passes - Number of passes to perform.
 * @return {Array} An array of prediction results.
 */
let processPattern = (pattern, passes) => {
  let steps = pattern.toUpperCase().split(''), 
      results = [], 
      history = 0;
  
  for (let p = 1; p <= passes; p++) {
    for (let s = 0; s < steps.length; s++) {
      let prediction = (history) ? 'T': 'N';
      let outcome = steps[s];
      let correct = (prediction === outcome);
      
      results.push([p, history, prediction, outcome, correct]);
      history = (outcome === 'T') ? 1 : 0;
    }
  }

  return results;
};

export default processPattern;
