# AniLibrary

**AniLibrary** is a web application for browsing information about anime and manga, created to demonstrate the use of a third-party **AniList API**.

The project uses API requests to retrieve, filter, and display anime and manga data without using its own database.

> ⚠️ **Note:** The website may partially or completely stop working in the future due to changes or updates to the AniList API that are outside the scope of this project.

## Features

* Fetching anime and manga data from the **AniList API**
* GET requests with **pagination**
* Data filtering
* Multiple anime and manga lists with different categories
* **TOP 10** list based on ratings
* Separate detailed pages for:

  * Anime
  * Manga
* Fetching detailed information about individual titles using API requests

## API

The project uses the third-party **AniList API** to retrieve anime and manga data.

The application uses API requests with support for:

* Pagination
* Filtering
* Retrieving lists of titles
* Retrieving detailed information about individual titles

## Website Structure

The website contains several pages for working with different types of content:

* **Anime** — anime lists with different categories
* **Manga** — manga lists with different categories
* **Top 10** — anime and manga with the highest ratings
* **Anime Details** — detailed information about a selected anime
* **Manga Details** — detailed information about a selected manga

## Project Purpose

The main purpose of this project is to demonstrate practical experience working with a third-party API and retrieving data dynamically.

The project includes:

* Working with HTTP GET requests
* Processing API responses
* Pagination
* Data filtering
* Dynamically displaying information on web pages
* Passing title IDs between pages to retrieve detailed information

## Technologies Used

* HTML
* CSS
* JavaScript
* AniList API

## API Disclaimer

AniLibrary does not maintain its own database of anime and manga. All information is retrieved directly from the AniList API.

Therefore, changes to the API, its endpoints, response structure, or access rules may affect the functionality of the website.
