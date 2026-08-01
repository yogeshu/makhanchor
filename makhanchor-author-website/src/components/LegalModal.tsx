/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, RefreshCw, HelpCircle, Scale } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'refund';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDocType: LegalDocType;
}

export default function LegalModal({ isOpen, onClose, initialDocType }: LegalModalProps) {
  const [activeTab, setActiveTab] = React.useState<LegalDocType>(initialDocType);

  // Sync tab with initial doc type when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialDocType);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialDocType]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const docTitle = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    refund: 'Refund Policy',
  };

  const docIcons = {
    privacy: <Shield className="w-5 h-5 text-brand-coral" />,
    terms: <FileText className="w-5 h-5 text-brand-coral" />,
    refund: <RefreshCw className="w-5 h-5 text-brand-coral" />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4"
          id="legal-modal-backdrop"
        >
          {/* Main Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-4xl h-[85vh] sm:h-[80vh] rounded-2xl bg-[#0e0a1b] text-white border border-white/10 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header with Navigation tabs */}
            <div className="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-black/20">
              <div className="flex items-center space-x-3">
                {docIcons[activeTab]}
                <span className="font-serif text-lg font-bold tracking-tight">
                  {docTitle[activeTab]}
                </span>
              </div>

              {/* Tabs list inside header */}
              <div className="flex items-center space-x-1 bg-white/5 rounded-xl p-1 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === 'privacy' ? 'bg-brand-coral text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Privacy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === 'terms' ? 'bg-brand-coral text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Terms
                </button>
                <button
                  onClick={() => setActiveTab('refund')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeTab === 'refund' ? 'bg-brand-coral text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Refunds
                </button>
              </div>

              {/* Close icon */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:static p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content Viewport */}
            <div className="flex-grow overflow-y-auto px-6 py-8 sm:px-10 space-y-6 text-sm text-white/80 leading-relaxed font-sans text-left">
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-serif text-2xl font-bold text-white tracking-tight">Privacy Policy</h1>
                    <p className="text-xs font-mono text-white/40">Last Updated: July 10, 2026</p>
                  </div>
                  <p>
                    Welcome to the digital sanctuary of Yogesh Bhavsar, author of <strong className="text-white">Love, Loss and Life</strong>. We are committed to protecting your privacy and providing a secure online experience. This privacy policy outlines how we handle, protect, and use any information you provide while interacting with our website.
                  </p>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">1. Information We Collect</h2>
                    <p>
                      We collect minimal information to deliver a personalized experience on our platform:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>
                        <strong className="text-white">Email Addresses:</strong> When you subscribe to our newsletter or join the poetry sanctuary mailing list, we store your email address securely.
                      </li>
                      <li>
                        <strong className="text-white">Midnight Notes (Guestbook):</strong> When you leave an anonymous note, we store your message, your custom pen name, and a selected color aura. We do not require or collect real names, emails, or IP logs for the guestbook.
                      </li>
                      <li>
                        <strong className="text-white">Usage Analytics:</strong> We collect anonymous browser telemetry to keep our embedded ambient background synth players and dynamic booklet animations performing perfectly.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">2. How We Use Your Information</h2>
                    <p>
                      Any information we collect is strictly used to enhance your emotional reading experience:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>To send beautiful poetry directly to your mailbox (you can unsubscribe anytime).</li>
                      <li>To display anonymous shared reflections on the "Midnight Notes" Guestbook Feed.</li>
                      <li>To process direct orders or facilitate seamless redirects to our publishing partners (Amazon and NotionPress).</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">3. Third-Party Integrations</h2>
                    <p>
                      We partner with established platforms to facilitate distribution and interactions:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>
                        <strong className="text-white">Amazon & NotionPress:</strong> When navigating through to purchase physical copies, you will interact with their respective checkout flows and terms of service.
                      </li>
                      <li>
                        <strong className="text-white">Mailing Infrastructure:</strong> Subscription databases are stored securely and never shared or sold to advertising networks.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">4. Cookies and Local Storage</h2>
                    <p>
                      We utilize standard local storage to save your audio player preferences (volume, audio state), reading settings (booklet font size, paper color theme), and newsletter opt-in values so you don’t have to configure them repeatedly on return visits.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">5. Contact Information</h2>
                    <p>
                      If you have any questions or would like your stored email address or guestbook entries permanently deleted from our servers, please contact us directly at:
                      <br />
                      <a href="mailto:yogeshbhavsarauthor@gmail.com" className="text-brand-coral hover:underline mt-1 inline-block">
                        yogeshbhavsarauthor@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-serif text-2xl font-bold text-white tracking-tight">Terms of Use</h1>
                    <p className="text-xs font-mono text-white/40">Last Updated: July 10, 2026</p>
                  </div>
                  <p>
                    By entering and interacting with the website for <strong className="text-white">Love, Loss and Life</strong> by Yogesh Bhavsar (located at makhanchor.in), you acknowledge and agree to the following terms, conditions, and ethical boundaries of our online creative sanctuary.
                  </p>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">1. Copyright & Intellectual Property</h2>
                    <p>
                      All poems, literary excerpts, chapter paragraphs, blog posts, audio compositions, digital assets, and structural interfaces displayed on this website are the intellectual property of <strong className="text-white">Yogesh Bhavsar</strong>, protected under copyright laws.
                    </p>
                    <p>
                      You may share brief verses or quote excerpts on social platforms provided you give clear credit to the author (<strong className="text-white">Yogesh Bhavsar / Makhanchor</strong>). Copying complete chapters, distributing unauthorized PDFs, or commercializing any text is strictly prohibited.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">2. Guestbook Content & Behavior ("Midnight Notes")</h2>
                    <p>
                      Our guestbook is an anonymous, sacred space for readers to share raw reflections, regrets, hopes, or unspoken love notes. To keep this community safe and beautiful:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>Do not post hate speech, advertising, or spam.</li>
                      <li>Do not share doxxing information or disclose personal phone numbers or precise addresses of other real-world individuals.</li>
                      <li>We reserve the right to remove notes that violate basic human respect or undermine the therapeutic, peaceful purpose of the sanctuary.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">3. Purchases & Orders</h2>
                    <p>
                      Our website redirects users to verified, secure channels (Amazon and NotionPress) to order physical paperbacks or Kindle books. Transactions, shipments, and billing queries are managed directly under the merchant systems of those platforms.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">4. Ambient Player & User Comfort</h2>
                    <p>
                      Our integrated interactive page-turn feedback sounds and background ambient noise controllers are built using native browser audio synthetics. They are provided purely to enhance reader immersion. Please adjust your audio volume responsibly to prevent sudden fatigue.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">5. Revisions</h2>
                    <p>
                      These terms may be updated occasionally as our novel's sanctuary introduces new chapters or features. Continued use of makhanchor.in constitutes agreement to any updated conditions.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'refund' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="font-serif text-2xl font-bold text-white tracking-tight">Refund Policy</h1>
                    <p className="text-xs font-mono text-white/40">Last Updated: July 10, 2026</p>
                  </div>
                  <p>
                    Thank you for supporting independent poetry and literature. Because <strong className="text-white">Love, Loss and Life</strong> is sold and shipped across multiple channels, please read the following guidelines regarding exchanges, refunds, and order cancellations.
                  </p>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">1. Purchases via Amazon</h2>
                    <p>
                      For any print books (paperbacks, hardcovers) or digital Kindle editions ordered through Amazon:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>Refunds, returns, and order support are governed entirely by <strong className="text-white">Amazon's standard 7-to-30 day return guidelines</strong>.</li>
                      <li>Please initiate returns directly from the "Your Orders" page on your Amazon account.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">2. Purchases via NotionPress</h2>
                    <p>
                      For physical copies purchased from the NotionPress Store:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-white/70">
                      <li>Cancellations are accepted before the book goes into the printing or shipment queue.</li>
                      <li>If you receive a book with missing pages, water damage, or manufacturing defects, NotionPress will ship a pristine replacement copy free of charge. Please contact NotionPress support directly with your invoice and photos.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">3. Digital/Kindle/PDF Sales</h2>
                    <p>
                      Because our free sample chapters are made completely transparent and free to read on this page, purchases of immediate electronic downloads or Kindle licenses are generally non-refundable once downloaded, except as permitted under Kindle Store policies.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-serif text-lg font-semibold text-white">4. Need Additional Help?</h2>
                    <p>
                      If you experience any platform issues or did not receive the correct order, please email Yogesh Bhavsar directly, providing your order number and store platform. We will do everything in our power to resolve it!
                      <br />
                      <a href="mailto:yogeshbhavsarauthor@gmail.com" className="text-brand-coral hover:underline mt-1 inline-block">
                        yogeshbhavsarauthor@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky footer close */}
            <div className="px-6 py-4 bg-black/40 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={onClose}
                className="bg-brand-coral hover:bg-brand-coral-hover text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                Accept and Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
