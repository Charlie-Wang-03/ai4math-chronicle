# Contributing

The repository is private during MVP bootstrap. This file freezes the intended public workflow so implementation does not need to be redesigned later.

For an event change:

1. edit or add `data/events/*.yaml`;
2. preserve stable Event IDs;
3. provide authoritative sources and bilingual factual fields;
4. run `npm run validate`, `npm test`, and `npm run build`;
5. open a focused pull request describing evidence and editorial uncertainty.

Do not mark an event `H1` or `independently_verified` solely from automated analysis. These designations require human editorial review.
