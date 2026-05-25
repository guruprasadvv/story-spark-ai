import logo from "../../assets/logoNew.png";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-12 flex items-center justify-center">
            <div className="max-w-4xl w-full text-center">

                <img src={logo} alt="StorySparkAI" className="h-20 mx-auto mb-6" />

                <h1 className="text-4xl font-bold mb-6">
                    Terms and Conditions
                </h1>

                <p className="text-lg text-gray-300 leading-8">
                    Please read these terms carefully before using StorySparkAI.
                    By accessing or using our platform, you agree to be bound by these terms.
                </p>

                <div className="mt-10 bg-zinc-900 p-6 rounded-2xl text-left">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-300 leading-8">
                        By using StorySparkAI, you agree to these Terms and Conditions
                        and our Privacy Policy. If you do not agree, please do not use
                        the platform.
                    </p>
                </div>

                <div className="mt-6 bg-zinc-900 p-6 rounded-2xl text-left">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                        2. Use of the Platform
                    </h2>
                    <ul className="space-y-2 text-gray-300">
                        <li>- You must be at least 13 years old to use this platform.</li>
                        <li>- You are responsible for all content you generate or publish.</li>
                        <li>- You must not use the platform for any unlawful purpose.</li>
                        <li>- You must not attempt to harm or disrupt the platform.</li>
                    </ul>
                </div>

                <div className="mt-6 bg-zinc-900 p-6 rounded-2xl text-left">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                        3. Intellectual Property
                    </h2>
                    <p className="text-gray-300 leading-8">
                        All content generated on StorySparkAI remains the property of
                        the respective users. The platform's code and design are
                        open-source under the MIT License.
                    </p>
                </div>

                <div className="mt-6 bg-zinc-900 p-6 rounded-2xl text-left">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                        4. Limitation of Liability
                    </h2>
                    <p className="text-gray-300 leading-8">
                        StorySparkAI is provided "as is" without any warranties.
                        We are not liable for any damages arising from your use
                        of the platform.
                    </p>
                </div>

                <div className="mt-6 bg-zinc-900 p-6 rounded-2xl text-left">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                        5. Changes to Terms
                    </h2>
                    <p className="text-gray-300 leading-8">
                        We reserve the right to update these terms at any time.
                        Continued use of the platform after changes constitutes
                        acceptance of the new terms.
                    </p>
                </div>

                <div className="mt-8">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-600 transition"
                    >
                        ⬅ Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default TermsAndConditions;