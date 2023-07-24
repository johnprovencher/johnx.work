module.exports = {
    root: true,
    extends: [
        "plugin:react-hooks/recommended" // Add this line to enable react-hooks plugin
        // You can include other ESLint configurations here if needed
    ],
    rules: {
        'new-cap': 'off',
        indent: ['error', 4],
        'no-unused-vars': 'off',
    }
}
