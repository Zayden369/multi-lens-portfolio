# Three.js runtime

Version: 0.187.0, MIT license (see LICENSE).
Source: https://registry.npmjs.org/three/-/three-0.187.0.tgz

The archive's SHA-512 integrity was checked against the official npm version metadata before extraction. `three.module.js` and `three.core.js` were bundled using:

```
npx --yes esbuild@0.25.11 vendor/three/three.module.js --bundle --minify --format=esm --target=es2022 --outfile=vendor/three/three.bundle.js
```

Only the bundle and upstream license ship. The runtime is dynamically imported when the spatial lens is selected; no CDN, package manager, or build step is needed to serve the portfolio. The temporary source archive remains in the ignored local review directory.
