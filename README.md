# Coding Challenge

## How to run the project

First, make sure you have Node.js installed on your machine. Then:

1. Install dependencies

```bash
npm install
```

2. Set up the environment variables

Create a `.env` file in the root of the project and add the following environment variables:

```bash
VITE_APP_MOVIEDB_TOKEN=your-token
```

Replace `your-token` with your own API token from [The Movie Database](https://www.themoviedb.org/documentation/api).

3. Run the project

```bash
npm run dev
```

## General Questions

Please answer the following questions with your understanding. We want to know your
experience.

1. If you have a user requirement to create a new page what are the steps you take to
   create the solution focusing on (UI,UX, FE)

I would follow these steps:

- Understand the user requirements and expectations for the new page.
- Sketch or wireframe the layout of the new page, considering the user experience (UX) or talk with the UX designer and get on the same page.
- Design the user interface (UI) in a design tool like Figma.
- Implement the design using front-end (FE) technologies like HTML, CSS, and JavaScript.
- Test the new page on different devices and browsers to ensure it works as expected.

2. Do you have experience using state management libraries? Can you explain how you
   used it?

Yes, I have experience using state management libraries like Redux, Zustand and React Context. These libraries help manage and share state across different components in an application. I've used Redux (with Redux Toolkit) to create a global store of state that can be accessed and manipulated by dispatching actions and using reducers to handle these actions.

I've also used React Query, even though it's not a state management library, it helps manage server state and cache data in a React application. This way, we are left with few pieces of data to manage with something like Redux.

3. What are some of the code best practices you use in your experience?

Some of the code best practices I follow are:

- Keeping the intention of the code clear.
- Using meaningful variable and function names.
- Following the AHA (Avoid Hasty Abstraction by Kent C Dodds), as opposed to the DRY (Don't Repeat Yourself) principle, which can lead to premature abstraction.
- Writing comments only when needed. I try to write code that is self-explanatory.
- Using version control systems like Git. And following a branching strategy like GitFlow.
- Using linters and formatters like ESLint and Prettier to maintain code consistency.
- Using design patterns like Composition, Higher-Order Components, Hook composition, Render Props, Compound Components, Prop Collections and Getters, and so on.
- Testing code with unit tests, integration tests, and end-to-end tests.

4. What are some ways to style components? Can you provide an explanation of each?

- Inline Styles: Directly writing the styles in the component.
- CSS Modules: Writing CSS in separate files and importing them into components.
- Styled Components: Using JavaScript to write CSS in your components.
- CSS-in-JS Libraries: Libraries like Emotion or JSS that allow you to write CSS in JavaScript.

5. Describe 3 ways to pass information from a component to its parent component

- Callback Functions: The parent passes a function to the child, and the child calls this function with the information as an argument. The parent then reacts to this information.
- Lifting State Up: If both components need to share the same state, it can be lifted to their closest common ancestor.
- Using a state management library: Libraries like Redux or React Context can be used to share state across components.

6. Do you have experience in design systems? Can you please share your experience and
   best practices?

Yes, I do. A design system is a set of reusable components, guided by clear standards, that can be assembled together to build any number of applications.
My experience includes maintaining design systems, ensuring consistency across different applications. I have used tools like Storybook to document and showcase components.
Best practices include having clear documentation, ensuring accessibility, and promoting reusability of components.
