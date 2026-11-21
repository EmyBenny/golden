import React from 'react';
import { FLEET_VAN_IMG } from '../data/seedData';
import type { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const milestones = [
    ['2019', 'First 10 couriers in London'],
    ['2021', 'Launched live map tracking'],
    ['2023', 'International network: 120 countries'],
    ['2025', 'Digital stamped receipts & in-app payments'],
    ['2026', '16,000 drop points, offline PWA & geofence telemetry'],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24 lg:pb-16 space-y-12">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#6b6b70]">
            About Golden Courier
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#1d1d1f] text-balance">
            Delivery, tracked to the metre.
          </h1>
          <p className="text-base text-[#6b6b70] leading-relaxed">
            Golden Courier combines real-time GPS courier telemetry, geofencing alerts, and verified digital receipts so senders and receivers always know exactly where every parcel stands.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('track')}
              className="px-6 py-3 bg-[#FFCC00] text-[#1d1d1f] font-extrabold text-sm cursor-pointer"
            >
              See Live Tracking
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 border border-[#1d1d1f] text-[#1d1d1f] font-bold text-sm cursor-pointer"
            >
              Contact our team
            </button>
          </div>
        </div>
        <div className="lg:col-span-6">
          <img
            src={FLEET_VAN_IMG}
            alt="Golden Courier electric delivery van at urban logistics hub"
            referrerPolicy="no-referrer"
            className="w-full h-72 sm:h-88 object-cover border-2 border-[#1d1d1f]"
          />
        </div>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Radical transparency',
            desc: 'Live GPS coordinates, honest pricing, and digital receipts stamped for every penny.',
          },
          {
            title: 'Greener miles',
            desc: 'Consolidated routes and EV vans in 30 cities cut emissions by 40%.',
          },
          {
            title: 'Humans first',
            desc: 'Real support, 24/7, and couriers who are paid fairly and reachable directly in-app.',
          },
        ].map((v) => (
          <div key={v.title} className="bg-white border border-neutral-200 p-7 border-t-4 border-t-[#FFCC00]">
            <h2 className="font-extrabold text-xl text-[#1d1d1f]">{v.title}</h2>
            <p className="text-sm text-[#6b6b70] mt-2 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Our Journey */}
      <div className="bg-[#1d1d1f] text-white p-8 sm:p-10">
        <h2 className="font-display text-3xl text-[#FFCC00] mb-6">Our journey</h2>
        <div className="space-y-4">
          {milestones.map(([year, text]) => (
            <div key={year} className="flex items-baseline gap-6 pb-4 border-b border-white/10 last:border-0 last:pb-0">
              <span className="font-display text-2xl text-[#FFCC00] tabular-nums shrink-0">{year}</span>
              <span className="text-sm sm:text-base text-neutral-200">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
