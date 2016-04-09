## hpca
A collection of high-performance computer architecture simulation ideas and implementations.

## ideas

Listed here are a few ideas I think would be challenging and fun to implement. I've restricted myself to using JavaScript for all of the
coding and HTML for presentation. JavaScript probably isn't the best language suited for most of these ideas, but it's what I know well.
I'd rather be spending the hours I'd need to learn the nuiances of a new language on coding instead.

- :white_check_mark: Implement and simple 5-stage processor pipeline on a limited instruction set, and report where stalls exist.
- :white_check_mark: Given a branch predictor [_n_-bit counter | _n_-bit history with 2-bit saturating counters], the number of 
iterations to perform, and a string of input text `"NTNTTNTT"`, output the branch prediction results.
- :white_large_square: Implement dynamic scheduling of program instructions using 
[Tomasulo's algorithm](http://en.wikipedia.org/wiki/Tomasulo_algorithm) with a reorder buffer.
- :white_large_square: Given a list of instruction addresses, implement a simple L1 and L2 cache memory architecture and output the 
hit/miss results of each instruction.
- :white_large_square: Implement a multi-processor cache coherence policy, like MESI and MOESI.
