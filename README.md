## Blocksuite Development

Blocksuite is now structured as a Gutenberg block collection plugin.

### Prerequisites

- PHP dependencies:
  ```bash
  composer install
  ```
- JS dependencies:
  ```bash
  npm install
  ```

### Development Workflow

- Start watch mode for block development:
  ```bash
  npm run start
  ```
- Create production block assets:
  ```bash
  npm run build
  ```

### Block Collection Structure

```text
src/
  index.js
  blocks/
    notice/
      block.json
      index.js
      edit.js
      save.js
      editor.scss
      style.scss
build/
  blocks/
    <block-name>/
      block.json
      index.js
      *.asset.php
      *.css
```

### Add a New Block

1. Create a new folder in `src/blocks/<your-block-name>/`
2. Add `block.json`, `index.js`, `edit.js`, `save.js`, and styles
3. Import the block from `src/index.js`
4. Run `npm run build`

`includes/BlockManager.php` auto-registers every built block found in `build/blocks/*/block.json`.

### Build Release

Set execution permission once:
```bash
chmod +x bin/build.sh
```

Run release build script:
```bash
bin/build.sh
```