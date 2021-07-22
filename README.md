This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Design Overview

I used https://jsonplaceholder.typicode.com/comments as the JSON dummy data online generator.

Since, the application will look nicer if we have accessible and responsive components like tables, spinners, overlays, toast messages, etc, I decided to use one of Material UI/Ant Design/Chakra UI desgin systems.

I decided to use Chakra UI since I haven't tried it out and wanted to find out how it works. I created the application using this command:

# TypeScript using npm

npx create-react-app my-app --template @chakra-ui/typescript

I decided to build three different views rendered within react's built-in Profiler component. The profiling information of the mount phase and the fetch duration are captured as a single measurement when the Start button is clicked. This measurement is persisted to Local Storage and exposed via a custom hook.

On visiting the Measurements page, information captured in Local Storage is displayed.

# Additional Packages:

I used 'nanoid' package for id generation
'date-fn' for date formatting and
'lodash' for performant deep object comparisons and other utility functions.

# Unit testing:

Jest with React testing Library and React hooks testing library.
