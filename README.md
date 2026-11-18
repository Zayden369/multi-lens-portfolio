# Portfolio rough prototype

Buildless HTML/CSS/JavaScript prototype. Bohemian is the default; nine visual lenses share the content and chapter layout. The current 3D lens uses CSS transforms, not Three.js. Project visuals are abstract compositions awaiting screenshots. Shared scrollytelling animation is planned but not yet implemented.

Run a static server from this directory: `python -m http.server 4174 --bind 127.0.0.1`. Open http://127.0.0.1:4174.

Vercel preview release: https://abhishek-gupta-portfolio-orpin.vercel.app/. This was uploaded through Vercel Drop, so later local edits need a new deployment.

Content comes from the supplied resume and notes. Grades and phone number are omitted. PR totals are a supplied snapshot. Confirm the AWS Student Builder internship status before adding it to the timeline. Later additions: project visuals/demos, individual PR links, resume download, richer scroll choreography, and a live 3D scene.

Sketchbook references ten local font faces under `reference-fonts/`. These downloaded font files are not committed because their licenses restrict redistribution. To see Sketchbook as designed in a local checkout, place the original downloaded fonts in the paths listed by the `@font-face` rules at the top of `style.css`. Other modes work without them; the browser falls back to its default fonts in Sketchbook until those files are present. The [deployed preview](https://abhishek-gupta-portfolio-orpin.vercel.app/) includes the fonts for visual review.
