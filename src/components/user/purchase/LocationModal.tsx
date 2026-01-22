"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

export interface PurchaseDetails {
    recipientName: string;
    phoneNumber: string;
    region: string;
    address: string;
    deliveryDate: string;
}

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (details: PurchaseDetails) => void;
    initialDetails?: PurchaseDetails;
}

export default function LocationModal({ isOpen, onClose, onSave, initialDetails }: LocationModalProps) {
    const [details, setDetails] = useState<PurchaseDetails>(
        initialDetails || {
            recipientName: "",
            phoneNumber: "",
            region: "",
            address: "",
            deliveryDate: "",
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(details);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#0D1E32]">Delivery Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="bg-[#E6F4F1] rounded-2xl p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Recipient's Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Recipient&apos;s Name*
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={details.recipientName}
                                    onChange={(e) => setDetails({ ...details, recipientName: e.target.value })}
                                    placeholder="Input the real name"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={details.phoneNumber}
                                    onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
                                    placeholder="enter your number"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                                />
                            </div>

                            {/* Region/City */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Region/City*
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={details.region}
                                    onChange={(e) => setDetails({ ...details, region: e.target.value })}
                                    placeholder="enter your region/city name"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address*
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={details.address}
                                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                                    placeholder="enter your Address"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Delivery Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Delivery Date*
                            </label>
                            <input
                                type="date"
                                required
                                value={details.deliveryDate}
                                onChange={(e) => setDetails({ ...details, deliveryDate: e.target.value })}
                                placeholder="enter your delivery date"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
