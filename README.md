# Chat App - React - Typescript - Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
Install `eslint-plugin-react` and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Chat App Features:
- **Account Management:** Users can create an account to access the chat application.
- **User Search:** Users can search for other people to connect with.
- **Friend Requests:** Users can send friend requests to other users.
- **Friend Requests Management:** Users can accept or decline friend requests received from others.
- **Real-time Chat:** Users can start new chats in real-time with their friends.
- **One-to-One Chat:** Users can engage in one-to-one chat conversations with their friends.
- **Security with JWT:** JSON Web Tokens (JWT) are implemented for secure user authentication and authorization.
- **User-friendly UI:** The user interface is designed to be intuitive and easy to understand.
- **Friend List and Chat List:** Users can view their friend list and ongoing chat conversations for easy access.