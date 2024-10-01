import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        files: ['**/*.js'],
        rules: {
            'prefer-const': 'warn',
            'no-constant-binary-expression': 'warn',
            quotes: ['warn', 'single'],
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'no-extra-semi': 'warn',
        },
        languageOptions: { sourceType: 'commonjs' },
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
];
