const path = require("path");
const _root = path.resolve(__dirname, "..");

/**
 * 获得绝对路径
 * @param  {...string} dirs
 * @returns {string}
 */
const root = function(...dirs) {
    return path.join(_root, ...dirs);
};

const STYLES = {
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m", // 洋红色
    CYAN: "\x1b[36m", // 青色
    WHITE: "\x1b[37m",
    CLEAR: "\x1b[0m" // 清除样式
};

const STAUTS_LOG = {
    ERROR: -2,
    WARN: -1,
    GENERAL: 0,
    SUCCESS: 1
};

class Logger {
    constructor(options = {}) {
        this.preffix = options.preffix || "[easy-vuex] ";
    }
    error(str) {
        this.log(str, STAUTS_LOG.ERROR);
    }
    success(str) {
        this.log(str, STAUTS_LOG.SUCCESS);
    }
    warn(str) {
        this.log(str, STAUTS_LOG.WARN);
    }
    info(str) {
        this.log(str, STAUTS_LOG.GENERAL);
    }
    log(str = "", status = STAUTS_LOG.GENERAL) {
        let content = `${this.preffix}${str}`,
            style = "";
        switch (status) {
            case STAUTS_LOG.ERROR:
                style = STYLES.RED;
                break;
            case STAUTS_LOG.WARN:
                style = STYLES.YELLOW;
                break;
            case STAUTS_LOG.GENERAL:
                style = STYLES.GREEN;
                break;
            case STAUTS_LOG.SUCCESS:
                style = STYLES.BLUE;
                break;
            default:
                style = STYLES.GREEN;
                break;
        }
        content = `${style}${content}${STYLES.CLEAR}`;
        console.log(content);
    }
}

const logger = new Logger();

exports.root = root;
exports.logger = logger;
exports.Logger = Logger;
