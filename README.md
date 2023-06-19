# Multimedia Web App

This is a multimedia web app built using React. It allows users to manage and view different types of multimedia files such as videos, audios, documents, and images.

## Features

### 1. Searching Files

The app provides a search functionality that allows users to search for files based on their names. When a user enters a search query in the search input field and clicks the "Search" button, the app filters the files and displays only those whose names include the search query. The search is case-insensitive, meaning it matches files regardless of uppercase or lowercase characters.

### 2. Sorting Files

The app also allows users to sort the displayed files based on different criteria: name, type, and date. A select dropdown is provided to choose the sorting option. When a user selects a sorting option, the app sorts the files accordingly and updates the display. The available sorting options are:

- **Sort by Name**: This option sorts the files alphabetically by their names in ascending order.
- **Sort by Type**: This option sorts the files alphabetically by their types in ascending order.
- **Sort by Date**: This option sorts the files chronologically by their dates in ascending order.

The sorting functionality is implemented using the `sortFiles` function, which takes the sorting option and search query as parameters. The function filters the files based on the search query and applies the appropriate sorting logic based on the selected option.

## Code Explanation

- The search functionality is implemented using the `searchQuery` state variable and the `handleSearch` function. The `searchQuery` stores the current search query entered by the user, and the `handleSearch` function filters the files based on the search query and updates the displayed files accordingly.

- The sorting functionality is implemented using the `sortOption` state variable and the `sortFiles` function. The `sortOption` stores the currently selected sorting option, and the `sortFiles` function applies the corresponding sorting logic to the files based on the selected option and search query.

- The `useEffect` hook is used to call the sorting function whenever the search query or sorting option changes. This ensures that the displayed files are always up to date with the latest search and sorting criteria.

## Usage

1. Clone the repository: `git clone https://github.com/fikayo1/Multimedia-app.git`
2. Install dependencies: `npm install`
3. Run the app: `npm start`
4. Open the app in your browser: `http://localhost:3000`

## Technologies Used

- React: JavaScript library for building user interfaces
- Chart.js: JavaScript charting library for creating charts and graphs
- React ChartJS 2: React wrapper for Chart.js library

## Conclusion

The search and sorting features added to the Multimedia Web App enhance its usability and provide users with better control over managing their multimedia files. The search functionality allows users to quickly find specific files by searching for their names, while the sorting functionality enables users to organize files based on their preferences and easily locate files based on different criteria. These features improve the user experience and make the app more efficient and user-friendly.