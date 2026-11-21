import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';

interface ContactPageProps {
  onSubmitContact: (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<{ queuedOffline: boolean }>;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSubmitContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Parcel tracking inquiry');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ queuedOffline: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setError(null);
    setSending(true);
    try {
      const res = await onSubmitContact({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setResult(res);
      setMessage('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24 lg:pb-16">
      <div className="mb-8">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#6b6b70]">
          Home / Contact
        </span>
        <h1 className="font-display text-4xl text-[#1d1d1f] mt-2">Say hello</h1>
        <p className="text-sm text-[#6b6b70] mt-1">
          24/7 support for tracking, business accounts, and geofence webhooks.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 p-6 flex gap-4">
            <Phone className="w-5 h-5 text-[#1d1d1f] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-extrabold text-sm">Call us</h2>
              <p className="font-mono-tabular text-sm text-[#6b6b70] mt-0.5">+1234567890</p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 p-6 flex gap-4">
            <Mail className="w-5 h-5 text-[#1d1d1f] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-extrabold text-sm">Email</h2>
              <p className="text-sm text-[#6b6b70] mt-0.5">support@goldencourier.demo</p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 p-6 flex gap-4">
            <MapPin className="w-5 h-5 text-[#1d1d1f] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-extrabold text-sm">Head office</h2>
              <p className="text-sm text-[#6b6b70] mt-0.5">
                123 Demo Parcel Lane, Testford, London, ZZ99 9ZZ, United Kingdom
              </p>
            </div>
          </div>

          <div className="bg-[#1d1d1f] text-white p-6 flex gap-4">
            <Clock className="w-5 h-5 text-[#FFCC00] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-extrabold text-sm text-[#FFCC00]">Support hours</h2>
              <p className="text-xs text-neutral-300 mt-1">Chat & phone: 24/7</p>
              <p className="text-xs text-neutral-300 mt-0.5">Sales: Mon–Fri, 8:00–18:00</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 space-y-5">
          {result && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#008a39] shrink-0" />
              <span>
                {result.queuedOffline
                  ? 'You are currently offline — your message has been queued and will send automatically once back online.'
                  : 'Message sent! A Golden Courier support specialist will reply within the hour.'}
              </span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c-name" className="block text-xs font-bold mb-1">
                Name *
              </label>
              <input
                id="c-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-xs font-bold mb-1">
                Email *
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-subject" className="block text-xs font-bold mb-1">
              Subject
            </label>
            <input
              id="c-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm"
            />
          </div>

          <div>
            <label htmlFor="c-msg" className="block text-xs font-bold mb-1">
              Message *
            </label>
            <textarea
              id="c-msg"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm"
            />
          </div>

          {error && <p className="text-xs font-bold text-[#FF5A1F]">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="px-7 py-3.5 bg-[#1d1d1f] text-[#FFCC00] font-extrabold text-sm hover:bg-black transition-colors cursor-pointer disabled:opacity-60"
          >
            {sending ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  );
};
