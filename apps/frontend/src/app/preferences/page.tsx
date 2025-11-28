"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/state/auth-store";
import { userApi, type UpdateProfilePayload } from "@/lib/api/user-api";

type PreferenceSection =
    | "profile"
    | "display"
    | "game-behavior"
    | "privacy"
    | "notifications"
    | "account"
    | "network";

export default function PreferencesPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [activeSection, setActiveSection] = useState<PreferenceSection>("profile");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        biography: "",
        flair: "none",
        country: "",
        location: "",
        realName: "",
        fideRating: "",
        uscfRating: "",
        ecfRating: "",
        rcfRating: "",
        cfcRating: "",
        dsbRating: "",
        socialLinks: "",
        // Platform ratings
        bulletRating: "",
        blitzRating: "",
        rapidRating: "",
        classicalRating: "",
    });

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        try {
            setIsLoading(true);
            const profile = await userApi.getProfile();

            // Map ratings array to form fields
            const bullet = profile.ratings.find(r => r.timeControl === 'BULLET')?.rating;
            const blitz = profile.ratings.find(r => r.timeControl === 'BLITZ')?.rating;
            const rapid = profile.ratings.find(r => r.timeControl === 'RAPID')?.rating;
            const classical = profile.ratings.find(r => r.timeControl === 'CLASSICAL')?.rating;

            setFormData({
                biography: profile.biography || "",
                flair: profile.flair || "none",
                country: profile.country || "",
                location: profile.location || "",
                realName: profile.realName || "",
                fideRating: profile.fideRating?.toString() || "",
                uscfRating: profile.uscfRating?.toString() || "",
                ecfRating: profile.ecfRating?.toString() || "",
                rcfRating: profile.rcfRating?.toString() || "",
                cfcRating: profile.cfcRating?.toString() || "",
                dsbRating: profile.dsbRating?.toString() || "",
                socialLinks: profile.socialLinks || "",
                bulletRating: bullet?.toString() || "",
                blitzRating: blitz?.toString() || "",
                rapidRating: rapid?.toString() || "",
                classicalRating: classical?.toString() || "",
            });
        } catch (error) {
            console.error("Failed to load profile:", error);
            setMessage({ type: 'error', text: 'Failed to load profile data' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear message on edit
        if (message) setMessage(null);
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            setMessage(null);

            const payload: UpdateProfilePayload = {
                biography: formData.biography,
                flair: formData.flair,
                country: formData.country,
                location: formData.location,
                realName: formData.realName,
                socialLinks: formData.socialLinks,
                // Parse ratings as numbers if present
                fideRating: formData.fideRating ? parseInt(formData.fideRating) : undefined,
                uscfRating: formData.uscfRating ? parseInt(formData.uscfRating) : undefined,
                ecfRating: formData.ecfRating ? parseInt(formData.ecfRating) : undefined,
                rcfRating: formData.rcfRating ? parseInt(formData.rcfRating) : undefined,
                cfcRating: formData.cfcRating ? parseInt(formData.cfcRating) : undefined,
                dsbRating: formData.dsbRating ? parseInt(formData.dsbRating) : undefined,
                // Platform ratings
                bulletRating: formData.bulletRating ? parseInt(formData.bulletRating) : undefined,
                blitzRating: formData.blitzRating ? parseInt(formData.blitzRating) : undefined,
                rapidRating: formData.rapidRating ? parseInt(formData.rapidRating) : undefined,
                classicalRating: formData.classicalRating ? parseInt(formData.classicalRating) : undefined,
            };

            await userApi.updateProfile(payload);
            setMessage({ type: 'success', text: 'Profile updated successfully' });

            // Reload to get fresh data (including any server-side processing if any)
            await loadProfile();
        } catch (error) {
            console.error("Failed to save profile:", error);
            setMessage({ type: 'error', text: 'Failed to save profile changes' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Preferences</h1>
                    <p className="mt-2 text-slate-400">Customize your chess experience</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <nav className="sticky top-8 space-y-1 rounded-2xl border border-white/10 bg-slate-900/50 p-2 backdrop-blur-sm">
                            <NavItem
                                active={activeSection === "profile"}
                                onClick={() => setActiveSection("profile")}
                                icon={<UserIcon />}
                                label="Edit Profile"
                            />
                            <NavItem
                                active={activeSection === "display"}
                                onClick={() => setActiveSection("display")}
                                icon={<DisplayIcon />}
                                label="Display"
                            />
                            <NavItem
                                active={activeSection === "game-behavior"}
                                onClick={() => setActiveSection("game-behavior")}
                                icon={<GameIcon />}
                                label="Game Behavior"
                            />
                            <NavItem
                                active={activeSection === "privacy"}
                                onClick={() => setActiveSection("privacy")}
                                icon={<PrivacyIcon />}
                                label="Privacy"
                            />
                            <NavItem
                                active={activeSection === "notifications"}
                                onClick={() => setActiveSection("notifications")}
                                icon={<BellIcon />}
                                label="Notifications"
                            />

                            <div className="my-2 border-t border-white/10" />

                            <NavItem
                                active={activeSection === "account"}
                                onClick={() => setActiveSection("account")}
                                icon={<SettingsIcon />}
                                label="Account Settings"
                            />
                            <NavItem
                                active={activeSection === "network"}
                                onClick={() => setActiveSection("network")}
                                icon={<NetworkIcon />}
                                label="Network"
                            />

                            <div className="my-2 border-t border-white/10" />

                            <button className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10">
                                Close Account
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
                            {message && (
                                <div className={`mb-6 rounded-xl p-4 text-sm font-medium ${message.type === 'success'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            {activeSection === "profile" && (
                                <ProfileSection
                                    user={user}
                                    formData={formData}
                                    onInputChange={handleInputChange}
                                    onSave={handleSave}
                                    isLoading={isLoading}
                                />
                            )}
                            {activeSection === "display" && <DisplaySection />}
                            {activeSection === "game-behavior" && <GameBehaviorSection />}
                            {activeSection === "privacy" && <PrivacySection />}
                            {activeSection === "notifications" && <NotificationsSection />}
                            {activeSection === "account" && <AccountSection user={user} />}
                            {activeSection === "network" && <NetworkSection />}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

// Navigation Item Component
function NavItem({ active, onClick, icon, label }: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${active
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
        >
            <span className="h-5 w-5">{icon}</span>
            {label}
        </button>
    );
}

// Profile Section Component
function ProfileSection({ user, formData, onInputChange, onSave, isLoading }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <p className="mt-1 text-sm text-slate-400">All information is public and optional.</p>
            </div>

            {/* Biography */}
            <div>
                <label className="mb-2 block text-sm font-medium text-white">Biography</label>
                <textarea
                    value={formData.biography}
                    onChange={(e) => onInputChange("biography", e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Tell us about yourself, your interests, what you like in chess, your favorite openings, players..."
                />
                <p className="mt-2 text-xs text-slate-500">
                    Markdown is supported. You can add links, format text, etc.
                </p>
            </div>

            {/* Flair */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-white">Flair (Emoji)</label>
                    <select
                        value={formData.flair}
                        onChange={(e) => onInputChange("flair", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                        <option value="none">None</option>
                        <option value="😀">😀 Grinning Face</option>
                        <option value="😎">😎 Smiling Face with Sunglasses</option>
                        <option value="🤓">🤓 Nerd Face</option>
                        <option value="🧐">🧐 Face with Monocle</option>
                        <option value="🤔">🤔 Thinking Face</option>
                        <option value="😴">😴 Sleeping Face</option>
                        <option value="🤯">🤯 Exploding Head</option>
                        <option value="🥳">🥳 Partying Face</option>
                        <option value="🤠">🤠 Cowboy Hat Face</option>
                        <option value="👑">👑 Crown</option>
                        <option value="🏆">🏆 Trophy</option>
                        <option value="⭐">⭐ Star</option>
                        <option value="🔥">🔥 Fire</option>
                        <option value="⚡">⚡ Lightning</option>
                        <option value="🎯">🎯 Direct Hit</option>
                        <option value="🎮">🎮 Video Game</option>
                        <option value="🎲">🎲 Game Die</option>
                        <option value="♟️">♟️ Chess Pawn</option>
                        <option value="🐉">🐉 Dragon</option>
                        <option value="🦅">🦅 Eagle</option>
                        <option value="🦁">🦁 Lion</option>
                        <option value="🐺">🐺 Wolf</option>
                        <option value="🦈">🦈 Shark</option>
                        <option value="🚀">🚀 Rocket</option>
                        <option value="💎">💎 Gem</option>
                        <option value="🌟">🌟 Glowing Star</option>
                    </select>
                    <p className="mt-2 text-xs text-slate-500">
                        Choose an emoji to display next to your username
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">Country or Region</label>
                    <select
                        value={formData.country}
                        onChange={(e) => onInputChange("country", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                        <option value="">Select country...</option>
                        <option value="AF">🇦🇫 Afghanistan</option>
                        <option value="AL">🇦🇱 Albania</option>
                        <option value="DZ">🇩🇿 Algeria</option>
                        <option value="AR">🇦🇷 Argentina</option>
                        <option value="AM">🇦🇲 Armenia</option>
                        <option value="AU">🇦🇺 Australia</option>
                        <option value="AT">🇦🇹 Austria</option>
                        <option value="AZ">🇦🇿 Azerbaijan</option>
                        <option value="BD">🇧🇩 Bangladesh</option>
                        <option value="BY">🇧🇾 Belarus</option>
                        <option value="BE">🇧🇪 Belgium</option>
                        <option value="BR">🇧🇷 Brazil</option>
                        <option value="BG">🇧🇬 Bulgaria</option>
                        <option value="CA">🇨🇦 Canada</option>
                        <option value="CL">🇨🇱 Chile</option>
                        <option value="CN">🇨🇳 China</option>
                        <option value="CO">🇨🇴 Colombia</option>
                        <option value="CR">🇨🇷 Costa Rica</option>
                        <option value="HR">🇭🇷 Croatia</option>
                        <option value="CU">🇨🇺 Cuba</option>
                        <option value="CZ">🇨🇿 Czech Republic</option>
                        <option value="DK">🇩🇰 Denmark</option>
                        <option value="EG">🇪🇬 Egypt</option>
                        <option value="EE">🇪🇪 Estonia</option>
                        <option value="FI">🇫🇮 Finland</option>
                        <option value="FR">🇫🇷 France</option>
                        <option value="GE">🇬🇪 Georgia</option>
                        <option value="DE">🇩🇪 Germany</option>
                        <option value="GR">🇬🇷 Greece</option>
                        <option value="HU">🇭🇺 Hungary</option>
                        <option value="IS">🇮🇸 Iceland</option>
                        <option value="IN">🇮🇳 India</option>
                        <option value="ID">🇮🇩 Indonesia</option>
                        <option value="IR">🇮🇷 Iran</option>
                        <option value="IQ">🇮🇶 Iraq</option>
                        <option value="IE">🇮🇪 Ireland</option>
                        <option value="IL">🇮🇱 Israel</option>
                        <option value="IT">🇮🇹 Italy</option>
                        <option value="JP">🇯🇵 Japan</option>
                        <option value="KZ">🇰🇿 Kazakhstan</option>
                        <option value="KE">🇰🇪 Kenya</option>
                        <option value="KR">🇰🇷 South Korea</option>
                        <option value="LV">🇱🇻 Latvia</option>
                        <option value="LT">🇱🇹 Lithuania</option>
                        <option value="MY">🇲🇾 Malaysia</option>
                        <option value="MX">🇲🇽 Mexico</option>
                        <option value="MD">🇲🇩 Moldova</option>
                        <option value="MA">🇲🇦 Morocco</option>
                        <option value="NL">🇳🇱 Netherlands</option>
                        <option value="NZ">🇳🇿 New Zealand</option>
                        <option value="NG">🇳🇬 Nigeria</option>
                        <option value="NO">🇳🇴 Norway</option>
                        <option value="PK">🇵🇰 Pakistan</option>
                        <option value="PE">🇵🇪 Peru</option>
                        <option value="PH">🇵🇭 Philippines</option>
                        <option value="PL">🇵🇱 Poland</option>
                        <option value="PT">🇵🇹 Portugal</option>
                        <option value="RO">🇷🇴 Romania</option>
                        <option value="RU">🇷🇺 Russia</option>
                        <option value="SA">🇸🇦 Saudi Arabia</option>
                        <option value="RS">🇷🇸 Serbia</option>
                        <option value="SG">🇸🇬 Singapore</option>
                        <option value="SK">🇸🇰 Slovakia</option>
                        <option value="SI">🇸🇮 Slovenia</option>
                        <option value="ZA">🇿🇦 South Africa</option>
                        <option value="ES">🇪🇸 Spain</option>
                        <option value="SE">🇸🇪 Sweden</option>
                        <option value="CH">🇨🇭 Switzerland</option>
                        <option value="TW">🇹🇼 Taiwan</option>
                        <option value="TH">🇹🇭 Thailand</option>
                        <option value="TR">🇹🇷 Turkey</option>
                        <option value="UA">🇺🇦 Ukraine</option>
                        <option value="AE">🇦🇪 United Arab Emirates</option>
                        <option value="GB">🇬🇧 United Kingdom</option>
                        <option value="US">🇺🇸 United States</option>
                        <option value="UY">🇺🇾 Uruguay</option>
                        <option value="UZ">🇺🇿 Uzbekistan</option>
                        <option value="VE">🇻🇪 Venezuela</option>
                        <option value="VN">🇻🇳 Vietnam</option>
                    </select>
                </div>
            </div>

            {/* Location and Real Name */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-white">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => onInputChange("location", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="City, State"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">Real Name</label>
                    <input
                        type="text"
                        value={formData.realName}
                        onChange={(e) => onInputChange("realName", e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Your real name"
                    />
                </div>
            </div>

            {/* Platform Ratings */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Platform Ratings</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <RatingInput label="Bullet" value={formData.bulletRating} onChange={(v) => onInputChange("bulletRating", v)} />
                    <RatingInput label="Blitz" value={formData.blitzRating} onChange={(v) => onInputChange("blitzRating", v)} />
                    <RatingInput label="Rapid" value={formData.rapidRating} onChange={(v) => onInputChange("rapidRating", v)} />
                    <RatingInput label="Classical" value={formData.classicalRating} onChange={(v) => onInputChange("classicalRating", v)} />
                </div>
                <p className="mt-2 text-xs text-slate-500">Manually override your platform ratings (for testing/admin)</p>
            </div>

            {/* Chess Ratings */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Federation Ratings</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <RatingInput label="FIDE" value={formData.fideRating} onChange={(v) => onInputChange("fideRating", v)} />
                    <RatingInput label="USCF" value={formData.uscfRating} onChange={(v) => onInputChange("uscfRating", v)} />
                    <RatingInput label="ECF" value={formData.ecfRating} onChange={(v) => onInputChange("ecfRating", v)} />
                    <RatingInput label="RCF" value={formData.rcfRating} onChange={(v) => onInputChange("rcfRating", v)} />
                    <RatingInput label="CFC" value={formData.cfcRating} onChange={(v) => onInputChange("cfcRating", v)} />
                    <RatingInput label="DSB" value={formData.dsbRating} onChange={(v) => onInputChange("dsbRating", v)} />
                </div>
                <p className="mt-2 text-xs text-slate-500">If none, leave empty</p>
            </div>

            {/* Social Media Links */}
            <div>
                <label className="mb-2 block text-sm font-medium text-white">Social Media Links</label>
                <textarea
                    value={formData.socialLinks}
                    onChange={(e) => onInputChange("socialLinks", e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Instagram, Facebook, GitHub, Chess.com, ..."
                />
                <p className="mt-2 text-xs text-slate-500">One link per line</p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={onSave}
                    disabled={isLoading}
                    className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </div>
        </div>
    );
}

function RatingInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">{label} rating</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="If none, leave empty"
            />
        </div>
    );
}

// Placeholder sections (to be implemented)
function DisplaySection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white">Display Settings</h2>
            <p className="mt-4 text-slate-400">Chess clock, board theme, piece set customization...</p>
        </div>
    );
}

function GameBehaviorSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white">Game Behavior</h2>
            <p className="mt-4 text-slate-400">Auto-queen, premoves, takeback settings...</p>
        </div>
    );
}

function PrivacySection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white">Privacy</h2>
            <p className="mt-4 text-slate-400">Control who can see your games and profile...</p>
        </div>
    );
}

function NotificationsSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
            <p className="mt-4 text-slate-400">Email and push notification preferences...</p>
        </div>
    );
}

function AccountSection({ user }: any) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                <p className="mt-1 text-sm text-slate-400">Manage your account details</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-white">Username</label>
                    <input
                        type="text"
                        value={user.username}
                        disabled
                        className="w-full rounded-xl border border-white/10 bg-slate-800/30 px-4 py-3 text-slate-400"
                    />
                    <p className="mt-2 text-xs text-slate-500">Username cannot be changed</p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white"
                    />
                </div>

                <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600">
                    Change Password
                </button>

                <button className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600">
                    Two-Factor Authentication
                </button>
            </div>
        </div>
    );
}

function NetworkSection() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white">Network</h2>
            <p className="mt-4 text-slate-400">Connection settings and server preferences...</p>
        </div>
    );
}

// Icons
function UserIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function DisplayIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function GameIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
    );
}

function PrivacyIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function NetworkIcon() {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    );
}
