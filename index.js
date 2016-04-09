import 'bootstrap/css/bootstrap.css!';
import 'font-awesome/css/font-awesome.css!';
import './css/default.css!';

import $ from 'bootstrap';
import process from './src/branch_prediction';
import Pipeline from './src/processor_pipeline';

let parseForm = (data) => {
  let inputs = {};
  
  $.each(data, function(i, obj) {
    // convert string numbers to its integer value
    if (obj.value % 1 === 0) {
      obj.value = parseInt(obj.value);
    }
    
    inputs[obj.name] = obj.value;
  });
  
  return inputs;
};

let predForm = $('#prediction > form'),
    predTable = $('#pred_output'),
    pipeForm = $('#pipeline > form'),
    pipeList = $('#pipe_list').find('ol');

predForm.submit(function(e) {
  let data = $(this).serializeArray(),
      inputs = parseForm(data);
  
  // TODO: implement function as a Promise
  let results = process(inputs.bits, inputs.type, inputs.pattern, inputs.pass);
  
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
      <td>${result[2] ? 'Taken' : 'Not Taken'}</td>
      <td>${result[3] ? 'Taken' : 'Not Taken'}</td>
      <td>${correct}</td>
    </tr>`);
  }
  
  e.preventDefault();
});

pipeForm.submit(function(e) {
  let data = $(this).serializeArray(),
      inputs = parseForm(data),
      pipeline = new Pipeline(inputs.instructions.split('\n')),
      output = pipeline.run();
  
  $.each(output, function(i, obj) {
    pipeList.append($('<li>').text(obj));
  });
      
  e.preventDefault();
});

pipeForm.on('reset', function() {
  $('#output').find('ol > li').remove();
});
