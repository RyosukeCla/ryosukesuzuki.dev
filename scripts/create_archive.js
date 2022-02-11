const fs = require('fs');
const path = require('path');

const unixtime = Date.now();
const iso = new Date(unixtime).toISOString();
const fileName = `${unixtime}.md`;
const template = `---
title: Title
pubtime: ${iso}
---

hello

`
fs.writeFileSync(path.resolve(__dirname, '../archives', fileName), template);
