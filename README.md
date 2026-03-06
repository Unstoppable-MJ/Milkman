 # Milkman Store 🥛

Welcome to the **Milkman Store**, a modern full-stack e-commerce platform designed for managing dairy products, subscriptions, and customer orders. This project features a robust Django backend and a sleek React-based frontend.

## 🚀 Features

- **Product Catalog**: Easy navigation and management of dairy products.
- **Order Tracking**: Real-time status updates for customer purchases.
- **Modern UI**: Built with React, Vite, and Tailwind CSS for a premium user experience.
- **Admin Dashboard**: Comprehensive control over products and staff.

**Folder Structure**

 <img width="346" height="803" alt="image" src="https://github.com/user-attachments/assets/2cf2c0eb-8f04-4215-87df-2e84d53f1046" />
 
**Login page**

<img width="1901" height="901" alt="image" src="https://github.com/user-attachments/assets/402ced12-1ba5-461e-bfdd-99db4a22ed10" />

**Admin dashboard** 

 <img width="1912" height="923" alt="image" src="https://github.com/user-attachments/assets/95365368-20d0-4f21-9769-599bb6a4d775" />
 
 **Add product from admin side**
<img width="1912" height="927" alt="image" src="https://github.com/user-attachments/assets/2c6555f8-ff4d-408b-8670-2540a5368e8f" />

**Order recevied by admin**

<img width="1914" height="822" alt="image" src="https://github.com/user-attachments/assets/bc6fd3ee-118f-4c39-b78c-fe198b076dd2" />

**Add category from admin**

<img width="1915" height="876" alt="image" src="https://github.com/user-attachments/assets/8323f97a-5c68-4a05-a59f-86c9ab000128" />

**Product Store**

  <img src="Image/README_SCREENSHOT_3.png" alt="Customer View Screenshot" width="800">
</div>

**Customer side store**

<img width="1910" height="693" alt="image" src="https://github.com/user-attachments/assets/7ea2a332-6ad4-49cc-8d47-9aedf94c092e" />

<img width="1904" height="850" alt="image" src="https://github.com/user-attachments/assets/cec1aacc-4c90-4715-87c5-1231e13fdb76" />

**Customer cart**

<img width="1907" height="839" alt="image" src="https://github.com/user-attachments/assets/09d88d31-b65d-48d8-b1ee-7ac649abee6d" />

**Placed order**

<img width="1883" height="827" alt="image" src="https://github.com/user-attachments/assets/c324e99c-8193-4c32-8dad-b82e65f64679" />


## 🛠️ Tech Stack

- **Backend**: Python (Django), SQLite
- **Frontend**: React, Vite, Tailwind CSS
- **Tools**: Postman (Collections included), ESLint

## ⚙️ Project Structure

- `milkman/`: Django backend root.
  - `accounts/`, `customer/`, `staff/`: User management.
  - `product/`, `category/`: Inventory management.
  - `order/`: Transactional logic.
- `milkman-frontend/`: React frontend root.
  - `src/`: Component logic and styling.
- `Image/`: Recommended directory for storing documentation assets.

## 🛠️ Getting Started

### Backend Setup
1. Navigate to the `milkman` directory.
2. Install dependencies (it's recommended to use a virtual environment).
3. Run migrations: `python manage.py migrate`
4. Start the server: `python manage.py runserver`

### Frontend Setup
1. Navigate to the `milkman-frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

---
*Created with ❤️ for Milkman Store.*
