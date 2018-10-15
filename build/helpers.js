const path = require('path');
const _root = path.resolve(__dirname, '..');

/**
 * 获得绝对路径
 * @param  {...string} dirs
 * @returns {string}
 */
const root = function(...dirs) {
    return path.join(_root, ...dirs);
}

exports.root = root;