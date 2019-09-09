# grid-graph-placement

[![Build Status](https://travis-ci.org/mattiash/grid-graph.svg?branch=master)](https://travis-ci.org/mattiash/grid-graph) [![Coverage Status](https://coveralls.io/repos/github/mattiash/grid-graph/badge.svg?branch=master)](https://coveralls.io/github/mattiash/grid-graph?branch=master)

Placement algorithm for @mattiash/grid-graph.
Designed for (mostly) loop-free networks.

```
A → B → C
 ↘    ↘
  ↘     D
    E → F
```

Handles nodes that link pair-wise (e.g. A => B and B => A)
by placing them in the same column.
