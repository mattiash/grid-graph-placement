# grid-graph-placement

[![Build Status](https://travis-ci.org/mattiash/grid-graph-placement.svg?branch=master)](https://travis-ci.org/mattiash/grid-graph-placement) [![Coverage Status](https://coveralls.io/repos/github/mattiash/grid-graph-placement/badge.svg?branch=master)](https://coveralls.io/github/mattiash/grid-graph-placement?branch=master)

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
