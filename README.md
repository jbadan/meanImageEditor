# Bokeh
 A full-stack MERN image editing app inspired by Instagram and ![cssFilters](https://www.cssfilters.co/). [View Site](#).

# Demo

![Home 1](/client/public/screenshot.png)

# Technologies Used
* Mongodb
* Express
* React
* Node.js
* [React Flexbox Grid](https://roylee0704.github.io/react-flexbox-grid/)
* [Cloudinary](https://cloudinary.com/)
* [Material UI](http://www.material-ui.com/#/)
* [Unsplash](https://unsplash.com/)
* [FontAwesome](http://fontawesome.io/)

# React Components

![Components Map](/client/public/download.png)

# Backend Routes
METHOD | URL | Purpose
--- | --- | ---
POST | /auth/signup | Adds new user to user database
POST | /auth/login | Authenticates login details
POST | /auth/me/from/token | Checks if token is present on browser refresh
POST | /image/new | Adds new uploaded image to logged in user's database
POST | /image/grid | Retrieves all images for logged in user from database
POST | /image/unsplash | Searches Unsplash API for query entered in text field, returns 10 photos
POST | /image/save | Saves edited image to logged in user's database
POST | /image/delete | Deletes selected image from logged in user's database


# Next Steps
* Add more editing features
* Add sharing widget (Facebook, Instagram, email)
* Instagram O-auth
* expand presets
