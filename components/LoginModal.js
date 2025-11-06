function LoginModal({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) {
    try {
        const [formData, setFormData] = React.useState({ account: '', password: '' });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [showForgotPassword, setShowForgotPassword] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const user = await AuthService.login(formData.account, formData.password);
                onLoginSuccess(user);
                onClose();
            } catch (err) {
                setError('Login failed, please check your phone/email and password');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold gradient-text">Login to JEC</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone/Email</label>
                            <input
                                type="text"
                                value={formData.account}
                                onChange={(e) => setFormData({...formData, account: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter phone number or email"
                                required
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

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                        <div className="mt-4 text-center">
                            <button 
                                onClick={() => setShowForgotPassword(true)}
                                className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                                Forgot Password?
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="text-gray-600">Don't have an account?</span>
                            <button 
                                onClick={onSwitchToRegister}
                                className="text-purple-600 hover:text-purple-800 font-medium ml-1">
                                Register Now
                            </button>
                        </div>
                </div>
                
                {showForgotPassword && (
                    <ForgotPasswordModal 
                        isOpen={showForgotPassword}
                        onClose={() => setShowForgotPassword(false)}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('LoginModal component error:', error);
        reportError(error);
    }
}
