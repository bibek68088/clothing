import React, { useState } from 'react';
import { User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App'; // Update the path based on your file structure

export const AuthModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleAuthMode = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {/* User icon that opens the modal */}
      <User className="w-5 h-5 text-gray-700 cursor-pointer" onClick={toggleModal} />

      {/* Auth Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button 
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {showLogin ? (
              <LoginForm 
                onClose={toggleModal} 
                switchToSignup={toggleAuthMode} 
                navigateToAdmin={() => navigate('/admin')}
              />
            ) : (
              <SignupForm 
                onClose={toggleModal} 
                switchToLogin={toggleAuthMode} 
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Login Form Component
interface LoginFormProps {
  onClose: () => void;
  switchToSignup: () => void;
  navigateToAdmin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, switchToSignup, navigateToAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use the login function from auth hook
    if (login(email, password)) {
      // Navigate to admin dashboard
      navigateToAdmin();
      onClose();
    } else {
      setError('Invalid credentials. Try admin@example.com / admin123 for admin access.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Login
        </button>
      </form>
      
      <p className="text-center mt-4 text-sm">
        Don't have an account?{' '}
        <button 
          onClick={switchToSignup}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

// Signup Form Component
interface SignupFormProps {
  onClose: () => void;
  switchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Signup logic would go here in a real application
    // For now, just switch to login after "successful" signup
    alert('Account created successfully! Please login.');
    switchToLogin();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Sign Up
        </button>
      </form>
      
      <p className="text-center mt-4 text-sm">
        Already have an account?{' '}
        <button 
          onClick={switchToLogin}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default AuthModal;