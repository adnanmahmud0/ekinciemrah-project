"use client";
import React from "react";
import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <section className="relative h-[450px] w-full flex items-center overflow-hidden mb-20">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/vegetable-1.jpg')` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Hero Content */}
                <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Contact Us
                        </h1>
                        <p className="text-lg text-white/90 leading-relaxed font-light">
                            If you have any questions regarding our products or services, feel free to contact us.
                            We're here to help and ensure you have the best experience with us.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {/* Phone Card */}
                    <div className="bg-[#EAF6F6] rounded-lg p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
                        <div className="w-16 h-16 bg-[#1D5DFF] rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/20">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Care Phone</h3>
                        <p className="text-[#05472C] font-medium mb-4">Call us for instant support</p>
                        <p className="text-[#1D5DFF] text-lg font-semibold">1800-245-6747</p>
                    </div>

                    {/* Email Card */}
                    <div className="bg-[#EAF6F6] rounded-lg p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
                        <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-green-500/20">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                        <p className="text-[#05472C] font-medium mb-4">Write to us anytime</p>
                        <p className="text-[#1D5DFF] text-lg font-semibold">Support14@vs.com</p>
                    </div>

                    {/* WhatsApp Card */}
                    <div className="bg-[#EAF6F6] rounded-lg p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
                        <div className="w-16 h-16 bg-[#00E676] rounded-full flex items-center justify-center mb-6 text-white shadow-lg shadow-green-500/20">
                            <MessageCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Whats App Chat</h3>
                        <p className="text-[#05472C] font-medium mb-4">Chat with our team</p>
                        <Button className="bg-[#00E676] hover:bg-[#00C853] text-white font-semibold px-8 mt-2 rounded-md">
                            Start Chat
                        </Button>
                    </div>
                </div>

                {/* Message Form Section */}
                <div className="bg-[#EAF6F6] rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">
                    {/* Form Side */}
                    <div className="lg:w-1/2 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                        <p className="text-gray-600 mb-8">
                            Fill out the form below and our team will respond within 24 hours
                        </p>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <Input placeholder="Jhon" className="bg-white border-none h-12" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <Input placeholder="jhon@gmail.com" type="email" className="bg-white border-none h-12" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Number</label>
                                <Input placeholder="014656..." className="bg-white border-none h-12" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <Input placeholder="Type..." className="bg-white border-none h-12" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Comment</label>
                                <Textarea placeholder="Type..." className="bg-white border-none min-h-[120px] resize-none" />
                            </div>

                            <Button className="bg-[#1B8057] hover:bg-[#146041] text-white h-12 px-6 w-full sm:w-auto">
                                <Send className="w-4 h-4 mr-2" />
                                Submit Message
                            </Button>
                        </form>
                    </div>

                    {/* Image Side */}
                    <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
                        <div className="absolute inset-4 rounded-lg overflow-hidden border-4 border-[#D8C6B9]/30">
                            <img
                                src="/office-team.png"
                                alt="Our responsive team working in a modern office"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
