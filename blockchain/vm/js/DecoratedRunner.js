const babel = require("@babel/core");

module.exports = mode => {

    const JsRunner = require("./JsRunner")(mode);
    const contractPlugins = require('./babel')(mode)(babel);

    return class extends JsRunner {
        compile(src) {
            src += `;
const __contract = new __contract_name();
const __metadata = {
    members: [],
    view: [],
    payable: []
}`;
            var result = babel.transformSync(src, {
                parserOpts: {
                    plugins: [
                        'asyncGenerators',
                        'bigInt',
                        'classPrivateMethods',
                        'classPrivateProperties',
                        'classProperties',
                        ['decorators', { decoratorsBeforeExport: false }],
                        'doExpressions',
                        //'dynamicImport',
                        //'exportDefaultFrom',
                        //'exportNamespaceFrom',
                        //'flow',
                        //'flowComments',
                        //'functionBind',
                        //'functionSent',
                        //'importMeta',
                        //'jsx',
                        'logicalAssignment',
                        'nullishCoalescingOperator',
                        'numericSeparator',
                        'objectRestSpread',
                        'optionalCatchBinding',
                        'optionalChaining',
                        ['pipelineOperator', { proposal: 'minimal' }],
                        'throwExpressions',
                    ],
                },
                retainLines: true,
                minified: false,
                plugins: contractPlugins,
                sourceMaps: true,
            });

            //console.log(result.code);
            return result.code;
        }

    }
}
