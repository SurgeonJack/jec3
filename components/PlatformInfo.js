function PlatformInfo({ onSectionClick }) {
    try {
        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        return (
            <section data-name="platform-info" data-file="components/PlatformInfo.js" 
                     className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold gradient-text mb-4">About JEC Rhythm healing</h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            JEC is the world's first one-stop rhythm healing platform for mental health and emotional repair, with sports socializing (surfing, skiing, golf, etc.), highlights, and career flow as its core intervention methods. It was passionately created by Jack, the first Chinese surgeon to be featured in European newspapers as China's most innovative surgeon, over a period of 12 years.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 max-w-2xl mx-auto">
                            <p className="text-2xl font-bold text-orange-600 text-center mb-6">
                                JEC (Jack's Brain Science Emotion Course) = The non-homogeneous assets that give meaning to your life
                            </p>
                            <div className="flex flex-col items-center">
                                <img 
                                    src="https://app.trickle.so/storage/public/images/usr_0ead469e10000001/1f15c66d-bec4-4621-be87-773b97379be1.jpeg?w=902&h=1106" 
                                    alt="WeChat QR Code" 
                                    className="w-48 h-48 object-contain mb-4"
                                />
                                <div className="text-gray-700 text-center">
                                    <p className="font-semibold mb-2">SurgeonJack 1v1</p>
                                    <p className="text-sm">The first 100 registered users can scan the code to add Surgeon Jack's wechat → and get a free experience of rhythm therapy guidance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('PlatformInfo component error:', error);
        reportError(error);
    }
}