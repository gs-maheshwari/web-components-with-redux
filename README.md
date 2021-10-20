# Launch the project

```bash
$ nvm use
$ npm i
$ npm run start
```

# Chapters

- Creating component with Lit
- Creating a property called "name" in the <main-component> and give it a default value
  - Pass this name to the <introduction-component>
  - In the <introduction-component> displays "Hello ${name}"
- If the dom is ready, start a timer in the <introduction-component> and display time spent on the website
  - Every 5 second, change the color of the timer text
- In the <main-component>, get cats and dogs images using this APIs: https://thedogapi.com/, https://thecatapi.com/
  - Use redux for data management: https://redux.js.org/
    - BONUS: use redux selectors
  - Show an image of a dog and a cat in the <main-component>
- Create an event listener in the <introduction-component> and add event listener in the <main-component> to listen to it
  - When press "d" show a dog image (and hide the cat image)
  - When press "c" show a cat image (and hide the dog image)
- Create a boolean property in <introduction-component>
  - Create an input toggle which change the boolean value if active/inactive
  - Then observe the boolean => if true console log something
- Create a button with a click event, remove the <introduction-component> from DOM and console log "DONE!" when the component has been removed completely from the DOM
- Create an array of your choice and loop through it in the template to display all the data

- Styling:
  - Create a color variable
  - The first letter of your name should be bigger and use the color variable
  - When hovering your name, the color changes
  - On desktop show the image of the animals with a max-width of 500px, on mobile show image full width
  - Bonus: Give a nice CCS animation to "Hello ${name}"
