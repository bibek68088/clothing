import { useState } from "react";

// Login Form Component
interface LoginFormProps {
  onClose: () => void;
  switchToSignup: () => void;
  navigateToAdmin: () => void;
}

const Login: React.FC<LoginFormProps> = ({
  onClose,
  switchToSignup,
  navigateToAdmin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      // Store admin session (in a real app, you'd store a token)
      localStorage.setItem('isAdmin', 'true');
      
      // Navigate to admin dashboard
      navigateToAdmin();
      onClose();
    } else {
      // Regular user login logic would go here
      setError('Invalid credentials. Try admin@example.com / admin123 for admin access.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
        Don't have an account?{" "}
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

export default Login;
