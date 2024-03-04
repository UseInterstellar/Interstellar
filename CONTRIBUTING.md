# Contributing Guidelines

Thank you for your interest in contributing to this repository! To ensure a smooth collaboration, please review the following guidelines:

## Pull Request Process

1. **Compatibility:**

   - Ensure your changes work seamlessly on both mobile and desktop platforms.

2. **Minifying Code:**

   - Visit the modified file (Ex. `/static/assets/scripts/index.js`), copy the code, and utilize a code minifier. Next, paste the minified code into the corresponding .min. file (Ex. `/static/assets/scripts/index.min.js`).
   - When minifying, you can choose your preferred minifier or use one of the following:
     - [FreeFormatter CSS Minifier](https://www.freeformatter.com/css-minifier.html)
     - [JavaScript Minifier](https://minify-js.com/)

3. **Version Bumping:**

   - Update the version in relevant files (e.g., `index.js?v=number`) to the next consecutive number when modifying any files.

4. **Code Formatting:**

   - Before finalizing changes, run the following command in the terminal for consistent code formatting:
     ```bash
     npm run format
     ```

5. **Test Your Changes:**

   - Conduct thorough testing to ensure modifications don't introduce issues or break existing functionalities.

6. **Descriptive Pull Requests:**

   - Provide clear, concise descriptions for your pull requests. Include details on the problem addressed and how your changes resolve it.

7. **Responsive Design:**

   - Confirm that changes adhere to responsive design principles, ensuring a seamless user experience across various devices.

8. **Collaboration:**
   - Be open to feedback and responsive to comments during the review process.

We appreciate your efforts in contributing to this project!
