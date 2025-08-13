# FitSpine Authentication App

A simple React application that provides user authentication functionality with login and registration features.

## Features

- **User Login**: Secure login with email and password
- **User Registration**: New user account creation with validation
- **Responsive Design**: Material-UI based interface that works on all devices
- **Form Validation**: Client-side validation for all input fields
- **Error Handling**: Comprehensive error handling and user feedback
- **Local Storage**: Token-based authentication with local storage

## Tech Stack

- **Frontend**: React 19 with Vite
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Context API

## Project Structure

```
src/
├── context/
│   └── AuthContext.jsx      # Authentication context and state management
├── pages/
│   └── auth/
│       ├── Login.jsx        # Login page component
│       ├── Register.jsx     # Registration page component
│       └── Auth.css         # Authentication-specific styles
├── services/
│   ├── api.js              # Axios configuration and interceptors
│   └── auth.service.js     # Authentication service functions
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
└── index.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitspine-auth
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

The application expects the following API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Styling
- Modify `src/pages/auth/Auth.css` for authentication page styles
- Update `src/index.css` for global styles
- Customize Material-UI theme in `src/App.jsx`

### API Configuration
- Update API base URL in `.env` file
- Modify API endpoints in `src/services/auth.service.js`
- Adjust request/response interceptors in `src/services/api.js`

## Features Explained

### Authentication Context
The `AuthContext` provides:
- User state management
- Login/logout functions
- Registration function
- Loading and error states
- Authentication status

### Form Validation
Both login and registration forms include:
- Required field validation
- Email format validation
- Password strength requirements
- Password confirmation matching
- Terms and conditions agreement

### Security Features
- Token-based authentication
- Automatic token refresh handling
- Secure password input with show/hide toggle
- Form submission protection
- Error message sanitization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
