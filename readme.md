## diverse sources

- [Michał Trykoszko Github](https://github.com/trykoszko/gutenberg-block-hydration-example)
- [Shelob9 Github](https://github.com/Shelob9/isoblock)
- [Godaddy CoBlocks](https://github.com/godaddy-wordpress/coblocks)
- [WP Data Reddit](https://wordpress.stackexchange.com/questions/390985/how-do-i-access-site-and-block-editor-state-data-and-use-useselect-or-withs)
- [WP Data novo](https://novo-media.ch/en/programming-coding/gutenberg-plugin-development-wp-data-wordpress-rest-api/)
- [WP Data Best practices](https://jsnajdr.wordpress.com/2021/01/22/some-best-practices-for-using-useselect-from-wordpress-data/)
- [Gutenberg examples](https://github.com/WordPress/gutenberg-examples)
- [wait for script to load](https://stackoverflow.com/questions/7308908/waiting-for-dynamically-loaded-script)

## sharing logic across plugins

### global js module

- create a file `inseri-core.ts`

```ts
import domReady from "@wordpress/dom-ready";

const main = {
  foo: 43,
  bar: (a: any) => "meow " + a,
};

domReady(() => {
  // @ts-ignore
  window.InseriCore = main;
});
```

- extend entrypoints

```json
    "build": "wp-scripts build ./src/index ./src/hydration ./src/inseri-core",
    "start": "wp-scripts start ./src/index ./src/hydration ./src/inseri-core"
```

- extend init php and choose an unique script handle 'inseri-core'

```php
function create_block_react_block_block_init() {
	register_block_type( __DIR__ . '/build' );

	$asset_file_inseri = include( plugin_dir_path( __FILE__ ) . 'build/inseri-core.asset.php');
	wp_register_script(
		'inseri-core',
		plugins_url( 'build/inseri-core.js', __FILE__ ),
		$asset_file_inseri['dependencies'],
		$asset_file_inseri['version']
	);
}
add_action( 'init', 'create_block_react_block_block_init' );
```

- now add inseri-core as dependency in other plugin's block.json
  - script: will load in editor and view
  - viewScript: loads only in front
  - editorScript: loads only in editor
- there is no error, if the dependency is missing

```json
	"script": "inseri-core"
```

- now InseriCore is available
