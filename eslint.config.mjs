import globals from "globals";
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    plugins: {
      'jsx-a11y': jsxA11y
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      // Règles pour l'accessibilité liée aux balises sémantiques
      "jsx-a11y/heading-has-content": ["error", { components: [""] }],
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/anchor-is-valid": "error", // Garantir que les liens sont correctement utilisés
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/role-supports-aria-props": "error",

      // Règles pour s'assurer que toutes les images incluent des descriptions alternatives via l'attribut alt
      "jsx-a11y/alt-text": [
        "error",
        {
          "elements": ["img", "object", "area", "input[type='image']"], // Types d'éléments à vérifier
        },
      ],
      // Règles pour la navigation au clavier
      "jsx-a11y/interactive-supports-focus": "error", // S'assurer que les éléments interactifs sont accessibles au clavier
      "jsx-a11y/click-events-have-key-events": "error", // S'assurer que les éléments avec des événements click sont accessibles via le clavier
      "jsx-a11y/no-static-element-interactions": "warn", // Empêcher l'ajout d'événements sur des éléments non interactifs
      "jsx-a11y/no-noninteractive-element-interactions": "warn", // Empêcher l'ajout d'événements sur des éléments non destinés à être interactifs

      // Règles pour le contrôle du focus
      "jsx-a11y/tabindex-no-positive": "error", // Évite l'usage d'un tabindex positif
      "jsx-a11y/no-autofocus": "warn", // Empêche l'utilisation de l'attribut autofocus

      // Règles pour l'accessibilité ds formulaires
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          "assert": "either",
          "depth": 3,
        },
      ], // Assure que les labels sont correctement associés aux contrôles
      "jsx-a11y/aria-role": ["warn"], // Assure que les rôles ARIA sont utilisés correctement
      "jsx-a11y/aria-props": ["warn"], // Assure que les propriétés ARIA sont correctement utilisées
    },
  },
];