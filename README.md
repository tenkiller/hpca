## hpca
A collection of high-performance computer architecture simulation ideas and implementations.

## ideas
- Implement and simple 5-stage processor pipeline on a limited instruction set, and report where stalls in the program exist.
- Given a branch predictor [_n_-bit counter | _n_-bit history with 2-bit saturating counters], the number of iterations to perform, and a string of input text `"NTNTTNTT"`, output the branch prediction results.
- Implement dynamic scheduling of program instructions using [Tomasulo's algorithm](http://en.wikipedia.org/wiki/Tomasulo_algorithm) with a reorder buffer.
- Given a list of instruction addresses, implement a simple L1 cache and output the hit/miss results of each instruction.
