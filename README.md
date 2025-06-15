# 🐝 Codehive – Blogging & Social Platform

Codehive is a full-stack blogging and social networking web app built with Node.js, Express, MongoDB, and EJS. It allows users to create posts, follow others, comment on posts, and manage their profiles—all within a clean, responsive UI.

> 🚀 Live Demo: [https://codehive-u1q8.onrender.com/posts](https://codehive-u1q8.onrender.com/posts)

---

## 📌 Features

- ✅ Register & Login with secure session-based authentication
- 📝 Create, edit, and delete blog posts with image uploads (Cloudinary)
- 💬 Add and delete comments on posts
- 👤 View user profiles and all posts by a specific user
- ➕ Follow and unfollow other users
- 📋 View followers and following list
- 🔍 Search users by username on the homepage
- ⚙️ Edit profile information
- 💬 Flash messages for interactive user feedback
- 🌐 Fully deployed on Render with MongoDB Atlas

---

## 🛠️ Tech Stack

**Frontend:**
- EJS templating
- Bootstrap 5
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Local Strategy for Auth)
- Cloudinary (Image storage)

**Dev Tools:**
- Render (Deployment)
- Dotenv (Secrets Management)
- Method-Override
- Express-Session
- Connect-Flash

---

## 🚀 Getting Started (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/adarsh9958/Codehive.git
cd Codehive

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory with the following:
MONGO_URL=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
SESSION_SECRET=your_session_secret

# 4. Run the server
node app.js

# App will run on http://localhost:8080

```

# 🗂️ Folder Structure
```
Codehive/
├── models/            # Mongoose models
├── routes/            # Route handlers
├── views/             # EJS templates
├── public/            # Static files (CSS, JS, Images)
├── middleware/        # Auth & validation middleware
├── utility/           # Async wrapper, custom error
├── app.js             # Main app entry point

```

# 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

# 🛡️ License

Feel free to use and modify it for your own ideas 🚀.

# 🙋‍♂️ Author

- Adarsh Pathak 
- 🎓 NIT Hamirpur
- 🔗 [LinkedIn](https://www.linkedin.com/in/adarsh-pathak-a8bb5826a/) | 
      [GitHub](https://github.com/adarsh9958)
