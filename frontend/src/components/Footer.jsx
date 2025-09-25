import React, { useState } from 'react';

export default function Footer() {

    return (
        <footer className="w-full bg-slate-50 border-t border-gray-200 text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-semibold mb-3">LuxuryHotel</h4>
                        <p className="text-sm text-gray-600">Experience the best in comfort and hospitality. Stay with us for unforgettable views, great food and exceptional service.</p>

                        <div className="flex items-center gap-3 mt-4">
                            <a aria-label="Twitter" href="#" className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white shadow hover:shadow-md transition">
                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 19c7.732 0 11.956-6.44 11.956-12.03 0-.183 0-.365-.012-.545A8.573 8.573 0 0 0 22 4.56a8.333 8.333 0 0 1-2.357.646A4.098 4.098 0 0 0 21.448 3c-.8.476-1.688.82-2.63 1.01A4.12 4.12 0 0 0 12.17 7.03a11.66 11.66 0 0 1-8.457-4.287 4.078 4.078 0 0 0 1.275 5.486A4.074 4.074 0 0 1 2.8 7.7v.05a4.12 4.12 0 0 0 3.303 4.04 4.09 4.09 0 0 1-1.085.14c-.265 0-.523-.024-.774-.073a4.126 4.126 0 0 0 3.848 2.86A8.266 8.266 0 0 1 2 17.576 11.645 11.645 0 0 0 8 19"/></svg>
                            </a>
                            <a aria-label="Instagram" href="#" className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white shadow hover:shadow-md transition">
                                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>
                            </a>
                            <a aria-label="Facebook" href="#" className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-white shadow hover:shadow-md transition">
                                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.5c0-2.2 1.3-3.4 3.3-3.4.96 0 1.96.17 1.96.17v2.2h-1.12c-1.1 0-1.45.68-1.45 1.38v1.66h2.47l-.39 2.9h-2.08V22A10 10 0 0 0 22 12z"/></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-lg font-medium mb-3">Quick Links</h5>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#rooms" className="hover:text-gray-900">Rooms & Suites</a></li>
                            <li><a href="#about" className="hover:text-gray-900">About Us</a></li>
                            <li><a href="#blog" className="hover:text-gray-900">Blog</a></li>
                            <li><a href="#contact" className="hover:text-gray-900">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-medium mb-3">Support</h5>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                            <li><a href="#" className="hover:text-gray-900">Booking</a></li>
                            <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-lg font-medium mb-3">Newsletter</h5>
                        <p className="text-sm text-gray-600 mb-3">Get our latest offers and news — no spam.</p>

                    </div>
                </div>

                <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">© {new Date().getFullYear()} LuxuryHotel. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Brand Guidelines</a>
                        <span className="h-4 w-px bg-gray-200" />
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Trademark Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


