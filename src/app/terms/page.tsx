import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    <div className="prose dark:prose-invert max-w-4xl mx-auto">
                        <h1>Terms of Service</h1>
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <h2>1. Introduction</h2>
                        <p>Welcome to Adspace. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms.</p>

                        <h2>2. Use of Our Service</h2>
                        <p>You must be at least 18 years old to use our service. You are responsible for any activity that occurs through your account and you agree you will not sell, transfer, license or assign your account, username, or any account rights.</p>

                        <h2>3. Content</h2>
                        <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>

                        <h2>4. Intellectual Property</h2>
                        <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Adspace and its licensors. The Service is protected by copyright, trademark, and other laws of both Ghana and foreign countries.</p>

                        <h2>5. Termination</h2>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                        <h2>6. Limitation Of Liability</h2>
                        <p>In no event shall Adspace, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                        
                        <h2>7. Governing Law</h2>
                        <p>These Terms shall be governed and construed in accordance with the laws of Ghana, without regard to its conflict of law provisions.</p>
                        
                        <h2>8. Changes</h2>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                        <h2>9. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
