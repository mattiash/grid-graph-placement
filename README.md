# grid-graph-placement

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
