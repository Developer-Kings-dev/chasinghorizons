# Chasing Horizons API
The Chasing Horizons API is a backend service for managing blog posts, users, tags, comments, and photos. This API supports CRUD operations for posts, users, and tags, user authentication, and handling media uploads. It uses JWT tokens for secure authentication and integrates with Firebase for file storage.

# Features
User Management: User registration, login, update, and deletion. <br>
Post Management: Create, update, view, and delete blog posts. <br>
Comment Management: Add and manage comments on blog posts.  <br>
Tag Management: Create, update, and delete tags to categorize posts.  <br>
Photo Management: Upload, view, and manage photos.  <br>
Authentication: JWT-based authentication for secure access to API endpoints.  <br>

# Technology Stack
Node.js: Backend runtime environment.  <br>
Express: Web framework for building API routes.  <br>
MongoDB: NoSQL database for persisting data.  <br>
Firebase: Used for storing photos.  <br>
JWT (jsonwebtoken): For authentication and secure access.  <br>
Mongoose: MongoDB object modeling for Node.js.  <br>

# API Endpoints
Auth Endpoints <br>
POST /v1/auth/login - Login an existing user and generate a JWT token. <br>

User Endpoints <br>
POST /v1/user/ - Register a new user.  <br>
PATCH /v1/user/ - Update user information.  <br> 
GET /v1/user/ - Retrieve the currently logged-in user.  <br>
DELETE /v1/user/ - Delete the logged-in user account.  <br>

Post Endpoints <br>
POST /v1/post/ - Create a new post.  <br>
GET /v1/post/ - Retrieve all posts.  <br>
GET /v1/post/{postId} - Get details of a specific post.  <br>
PATCH /v1/post/{postId} - Update an existing post.  <br>
DELETE /v1/post/{postId} - Delete a post.  <br>

Comment Endpoints <br>
POST /v1/comment/{postId} - Add a comment to a specific post.  <br>
GET /v1/comment/{postId} - Retrieve all comments on a specific post.  <br>

Tag Endpoints  <br>
POST /v1/tag/ - Create a new tag.  <br>
GET /v1/tag/ - Retrieve all tags.  <br> 
PUT /v1/tag/{tagId} - Update an existing tag.  <br>
DELETE /v1/tag/{tagId} - Delete a tag.  <br>

Photo Endpoints <br>
POST /v1/photo/ - Upload a new photo.  <br>
GET /v1/photo/ - Retrieve all uploaded photos.  <br>
GET /v1/photo/{photoId} - Retrieve a specific photo by its ID.  <br>

Health Check <br>
GET /health - Check the health status of the API. <br>

# Environment Variables
Create a .env file in the root directory and configure the following variables: <br>
DB_URI=mongodb://localhost:27017/chasing-horizons <br>
PORT=8000 <br>
JWT_SECRET=your_jwt_secret_here <br>
FIREBASE_PROJECT_ID=your_firebase_project_id <br>
FIREBASE_PRIVATE_KEY=your_firebase_private_key <br> 
FIREBASE_CLIENT_EMAIL=your_firebase_client_email <br>

# Setup and Installation
Clone the repository: <br>
git clone https://github.com/yourusername/chasing-horizons.git <br>

Install dependencies: <br>
npm install <br>

Set up environment variables in the .env file (as mentioned above). <br>

Run the server: <br>
npm start <br>

The API will be available at http://localhost:8000 <br>

# Dependencies
express: Web framework for Node.js. <br>
jsonwebtoken: For generating and verifying JWT tokens. <br>
mongoose: MongoDB object modeling. <br>
firebase-admin: For integrating Firebase storage. <br>
bcrypt: For securely hashing passwords. <br>
dotenv: For managing environment variables. <br>
multer: For handling file uploads. <br>
express-async-handler: Simplifies async error handling in Express. <br>

# API Testing with Insomnia
To test the API, you can import the provided Insomnia workspace and test the endpoints directly. <br>
Download the insomnia/api-requests.json file from this repository. <br>
Open Insomnia and go to Application Menu > Import/Export > Import Data. <br> 
Select the downloaded api-requests.json file to load the API requests for this project.<br>

# License
This project is licensed under the MIT License.


