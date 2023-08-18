module.exports = {
    extends: ['next', 'turbo', 'prettier'],
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@next/next/no-img-element': 'off',
        'import/no-anonymous-default-export': [
            'error',
            {
                allowArray: false,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: true, // The true value here is for backward compatibility
                allowNew: false,
                allowLiteral: false,
                allowObject: true
            }
        ]
    },
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')]
        }
    }
};
