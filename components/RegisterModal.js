function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '', phone: '', email: '', password: '', confirmPassword: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const validatePhone = (phone) => {
            const phoneRegex = /^1[3-9]\d{9}$/;
            return phoneRegex.test(phone);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            if (!validatePhone(formData.phone)) {
                setError('Please enter a valid phone number');
                setLoading(false);
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setError('Password confirmation does not match');
                setLoading(false);
                return;
            }

            try {
                const user = await AuthService.register(
                    formData.name, 
                    formData.phone, 
                    formData.email, 
                    formData.password
                );
                onRegisterSuccess(user);
                onClose();
            } catch (err) {
                setError(err.message || 'Registration failed, please try again later');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold gradient-text">Register for JEC</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter email address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Confirm password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-600">Already have an account?</span>
                        <button 
                            onClick={onSwitchToLogin}
                            className="text-purple-600 hover:text-purple-800 font-medium ml-1">
                            Login Now
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RegisterModal component error:', error);
        reportError(error);
    }
}
