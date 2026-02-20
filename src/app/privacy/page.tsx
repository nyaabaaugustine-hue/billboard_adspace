import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    <div className="prose dark:prose-invert max-w-4xl mx-auto">
                        <h1>Privacy Policy</h1>
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <p>Your privacy is important to us. It is OwareAds's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>

                        <h2>1. Information We Collect</h2>
                        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                        <ul>
                            <li><strong>Log data:</strong> When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</li>
                            <li><strong>Personal Information:</strong> We may ask for personal information, such as your name, email, phone number, and payment information.</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to operate, maintain, and provide the features and functionality of the Service, including:</p>
                        <ul>
                            <li>To create and manage your account.</li>
                            <li>To process your transactions.</li>
                            <li>To send you related information, including confirmations, invoices, technical notices, updates, security alerts, and support messages.</li>
                            <li>To communicate with you about products, services, offers, and events offered by OwareAds.</li>
                        </ul>

                        <h2>3. Security of Your Information</h2>
                        <p>We take the security of your data seriously. We use commercially acceptable means to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use, or modification. That said, we advise that no method of electronic transmission or storage is 100% secure, and cannot guarantee absolute data security.</p>
                        
                        <h2>4. Your Rights</h2>
                        <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services. You have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.</p>

                        <h2>5. Third-Party Services</h2>
                        <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>

                        <h2>6. Changes to This Policy</h2>
                        <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.</p>

                        <h2>Contact Us</h2>
                        <p>For any questions or concerns regarding your privacy, you may contact us using the following details: contact@owareads.com</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
