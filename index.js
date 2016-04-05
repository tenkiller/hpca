import 'bootstrap/css/bootstrap.css!';
import 'font-awesome/css/font-awesome.css!';
import './css/default.css!';

import $ from 'bootstrap';
import processPattern from './src/branch_prediction';
import Pipeline from './src/processor_pipeline';

let parseForm = (data) => {
  let inputs = {};
  
  $.each(data, function(i, obj) {
    inputs[obj.name] = obj.value;
  });
  
  return inputs;
};

let predForm = $('#prediction > form'),
    predTable = $('#prediction > table'),
    pipeForm = $('#pipeline > form');

predForm.submit(function(e) {
  let data = $(this).serializeArray(),
      inputs = parseForm(data);
  
  // TODO: implement different branch predictor types
  // TODO: implement function as a Promise
  let results = processPattern(inputs.pattern, inputs.pass);
  
  // clear out any previous rows in the results table
  predTable.find('tbody > tr').remove();
  
  for (let result of results) {
    let correct = (result[4]) ? '<i class="fa fa-check text-success"></i>' : 
                                '<i class="fa fa-close text-danger"></i>';
    
    // TODO: format pass number as a group header rather than a column
    // TODO: display prediction and outcome as full text
    predTable.append(`<tr>
      <td>${result[0]}</td>
      <td>${result[1]}</td>
      <td>${result[2]}</td>
      <td>${result[3]}</td>
      <td>${correct}</td>
    </tr>`);
  }
  
  e.preventDefault();
});

pipeForm.submit(function(e) {
  let data = $(this).serializeArray(),
      inputs = parseForm(data),
      pipeline = new Pipeline(inputs.instructions.split('\n')),
      output = pipeline.run(),
      list = $('#output').find('ol');
  
  $.each(output, function(i, obj) {
    list.append($('<li>').text(obj));
  });
      
  e.preventDefault();
});

pipeForm.on('reset', function() {
  $('#output').find('ol > li').remove();
});
