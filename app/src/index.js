function requireAll(req) {
    req.keys().forEach(function (key) {
        req(key);
    })
}

/**
 * Importation du JS
 */
requireAll(require.context('./js',true,/\.js$/));

/**
 * Importation du CSS
 */
// requireAll(require.context('./css',true,/\.css$/));

/**
 * Importation du SCSS
 */
import './scss/main.scss';

/**
 * Importation des JPG
 */
requireAll(require.context('./img',true,/\.jpg$/));