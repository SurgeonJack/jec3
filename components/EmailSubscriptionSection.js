function EmailSubscriptionSection() {
    try {
        const [email, setEmail] = React.useState('');
        const [subscribed, setSubscribed] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [showPaymentModal, setShowPaymentModal] = React.useState(false);
        const [selectedPlan, setSelectedPlan] = React.useState(null);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handleEmailSubscribe = async (e) => {
            e.preventDefault();
            setLoading(true);
            
            try {
                const subscriberData = {
                    email: email,
                    subscriptionType: 'free',
                    subscribedAt: new Date().toISOString(),
                    preferences: ['rhythm_calendar', 'action_cards']
                };

                await trickleCreateObject('email_subscriber', subscriberData);
                setSubscribed(true);
                setEmail('');
                alert('Successfully subscribed! You\'ll receive rhythm calendars and action cards.');
            } catch (error) {
                console.error('Subscription failed:', error);
                alert('Subscription failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleSubscription = (plan) => {
            if (plan.name === 'Free Flow') {
                handleEmailSubscribe({ preventDefault: () => {} });
            } else {
                setSelectedPlan(plan);
                setShowPaymentModal(true);
            }
        };

        const subscriptionPlans = [
            {
                name: 'Free Flow',
                price: '$0',
                period: '/month',
                features: ['Basic rhythm calendar', 'Weekly action cards', 'Community access'],
                buttonText: 'Get Started',
                popular: false
            },
            {
                name: 'Flow Pro',
                price: '$29.9',
                period: '/month',
                features: ['Advanced ritual templates', 'Personalized AI reports', 'Priority support', 'Notion premium templates'],
                buttonText: 'Subscribe Now',
                popular: true
            },
            {
                name: 'Flow Master',
                price: '$99.9',
                period: '/month',
                features: ['1-on-1 coaching sessions', 'Custom ritual creation', 'Advanced analytics', 'All premium content'],
                buttonText: 'Subscribe Now',
                popular: false
            }
        ];

        return (
            <section data-name="email-subscription" data-file="components/EmailSubscriptionSection.js" 
                     className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Find your rhythm</h2>
                        <p className="text-lg text-gray-700">Get personalized rhythm calendars and action cards delivered to your inbox</p>
                    </div>

                    <div className="mb-16">
                        <div className="max-w-md mx-auto">
                            <form onSubmit={handleEmailSubscribe} className="flex space-x-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading || subscribed}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                                    {loading ? 'Subscribing...' : subscribed ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {subscriptionPlans.map((plan, index) => (
                            <div key={index} className={`bg-white rounded-2xl p-8 relative ${
                                plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
                            }`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <div className="text-3xl font-bold text-purple-600">
                                        {plan.price}<span className="text-lg text-gray-500">{plan.period}</span>
                                    </div>
                                </div>
                                
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                            <i data-lucide="check" className="w-5 h-5 text-green-500"></i>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <button 
                                    onClick={() => handleSubscription(plan)}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                        plan.popular 
                                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-700 font-medium mb-2">
                        © 2025 Surgeon Jack · EMR Rhythm Science
                    </p>
                    <p className="text-gray-600 text-sm">
                        Designed for global rhythm intelligence flow 🌍
                    </p>
                </footer>

                {showPaymentModal && selectedPlan && (
                    <CreditCardPaymentModal 
                        plan={selectedPlan}
                        onClose={() => setShowPaymentModal(false)}
                        onPaymentSuccess={() => {
                            setShowPaymentModal(false);
                            alert(`Successfully subscribed to ${selectedPlan.name}!`);
                        }}
                    />
                )}
            </section>
        );
    } catch (error) {
        console.error('EmailSubscriptionSection component error:', error);
        reportError(error);
    }
}
