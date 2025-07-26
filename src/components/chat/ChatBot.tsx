import { useState } from "react";
import { Send, Upload, BarChart3, Lightbulb, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
    id: string;
    type: "user" | "bot";
    content: string;
    timestamp: Date;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "bot",
            content: "Hello! I'm your EcoTrack AI assistant. I can track your activities, calculate carbon impact, and share eco-friendly tips. What did you do today?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");

    const shortcutButtons = [
        { icon: BarChart3, label: "Progress Report", action: "progress" },
        { icon: Sparkles, label: "Fun Fact", action: "funfact" },
        { icon: Activity, label: "Activity Summary", action: "activity" },
        { icon: Lightbulb, label: "Tips", action: "tips" },
    ];

    // FAQ + Activity-based responses
    const responses: Record<string, string> = {
        // 🚴 Travel Activities
        "i biked": "🚴 Awesome job biking! You saved around 0.2 kg of CO₂ per km compared to a car trip. That’s a win for the planet!",
        "i biked 5km": "🚴 Awesome job biking 5km! You saved around 1kg of CO₂ compared to a car trip. That’s a win for the planet!",
        "cycled": "🚴 Cycling helps save around 0.2 kg of CO₂ per km compared to driving. Keep it up!",
        "i took the bus": "🚌 Using public transport reduces your carbon footprint significantly. Thanks for being eco-conscious!",
        "i walked instead of driving": "👣 Every step matters! Walking instead of driving avoided about 0.25 kg CO₂/km. Keep going!",

        // 🥗 Food-Related Prompts
        "i ate vegetarian": "🥗 A plant-based meal emits up to 80% less CO₂ than one with red meat. Great choice!",
        "i had meat": "🍖 Meat-heavy meals have higher carbon impact. Consider swapping one meat meal a week for a plant-based dish to help the planet!",
        "i avoided dairy": "🥛 Skipping dairy reduces your carbon footprint. Almond, oat, or soy milks are great alternatives!",

        // 💡 Energy Usage
        "i used solar power": "☀ Amazing! Using solar energy can reduce your electricity-based CO₂ footprint by over 80%. Keep shining!",
        "i switched off lights": "💡 Every small action counts. Turning off unused lights can save energy and money!",
        "i used air conditioning": "❄ Air conditioning can be energy intensive. Try setting it a bit higher or using fans when possible. 🌬",

        // 🛒 Lifestyle & Consumption
        "i bought second hand clothes": "👕 Great call! Buying pre-loved items reduces the carbon impact of fast fashion. Thrift is the new trend!",
        "i recycled plastic": "♻ Recycling plastic helps reduce landfill waste and lowers emissions from new plastic production. Keep it up!",
        "i avoided single use plastic": "🙌 Fantastic! Choosing reusable options helps fight plastic pollution. Mother Earth thanks you!",

        // 📊 Footprint Estimation Queries
        "how much co2 does driving emit": "🚗 On average, a petrol car emits 0.21 kg CO₂/km. Consider alternatives like cycling or carpooling.",
        "how much co2 for one flight": "✈ A short-haul flight emits around 0.25 kg CO₂ per km per passenger. Trains are often a greener option!",
        "what's my carbon footprint for today": "🌍 I’ll need more details (travel, meals, electricity use), but I can help you calculate it step-by-step. Try telling me what you did!",

        // ✅ Eco FAQs
        "what can i do to reduce my carbon footprint": "You can reduce your carbon footprint by using public transport, reducing energy use at home, eating a plant-based diet, recycling, and switching to renewable energy sources.",
        "how can i save energy at home": "Switch to LED bulbs, unplug devices when not in use, use energy-efficient appliances, and properly insulate your home to save energy.",
        "what are carbon offsets": "Carbon offsets are projects (like tree planting or renewable energy projects) that compensate for the CO2 emissions you produce.",
        "how does diet affect carbon footprint": "A plant-based diet typically has a lower carbon footprint because meat and dairy production emits more greenhouse gases.",
        "how does flying affect carbon footprint": "Air travel produces high CO2 emissions. Reducing flights, taking trains, or using carbon offset programs can help.",
        "how can i reduce car emissions": "Carpooling, using public transport, cycling, walking, or switching to electric vehicles are great ways to cut car emissions.",
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");

        setTimeout(() => {
            const lowerInput = inputValue.trim().toLowerCase();
            let botContent = "I'm sorry, I don't have an answer for that yet. Try telling me about your eco-friendly activities!";

            // Find matching response (checks if input contains any key phrase)
            for (const key in responses) {
                if (lowerInput.includes(key)) {
                    botContent = responses[key];
                    break;
                }
            }

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: "bot",
                content: botContent,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 600);
    };

    const handleShortcut = (action: string) => {
        const responses = {
            progress: "You've reduced your carbon footprint by 23% this month! Keep up the great work. 🌱",
            funfact: "Did you know? If every household switched to LED lights, we'd save over 1.5 billion tons of CO2 per year!",
            activity: "This week: 3 bike rides, 8 plant-based meals, and 2 days of renewable energy usage.",
            tips: "💡 Tip: Use cold water for laundry. It saves energy and helps the planet!"
        };

        const botMessage: Message = {
            id: Date.now().toString(),
            type: "bot",
            content: responses[action as keyof typeof responses] || "How can I help you today?",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <Card className="flex flex-col max-h-[600px]">
            <CardHeader className="pb-3 shrink-0">
                <CardTitle className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-eco-green to-eco-green-light flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span>EcoTrack AI Assistant</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4 p-4 flex-1 min-h-0">
                {/* Shortcut Buttons */}
                <div className="grid grid-cols-2 gap-2 shrink-0">
                    {shortcutButtons.map((button) => {
                        const Icon = button.icon;
                        return (
                            <Button
                                key={button.action}
                                variant="outline"
                                size="sm"
                                onClick={() => handleShortcut(button.action)}
                                className="h-auto p-2 flex flex-col items-center space-y-1 hover:bg-eco-green/5 hover:border-eco-green text-xs"
                            >
                                <Icon className="h-3 w-3" />
                                <span className="text-xs leading-tight">{button.label}</span>
                            </Button>
                        );
                    })}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                                <Avatar className="h-6 w-6 shrink-0">
                                    <AvatarFallback className={message.type === "bot" ? "bg-eco-green text-white text-xs" : "bg-eco-green-dark text-white text-xs"}>
                                        {message.type === "bot" ? "AI" : "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`rounded-lg p-3 text-sm ${
                                        message.type === "user"
                                            ? "bg-eco-green text-white"
                                            : "bg-eco-green/10 text-foreground border"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="flex space-x-2 shrink-0">
                    <div className="relative">
                        <Button
                            variant="outline"
                            size="sm"
                            className="p-2 shrink-0 hover:bg-eco-green/10 hover:border-eco-green"
                            onClick={() => document.getElementById('chat-image-upload')?.click()}
                        >
                            <Upload className="h-4 w-4" />
                        </Button>
                        <input
                            id="chat-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    console.log('Image selected:', file.name);
                                }
                            }}
                            className="hidden"
                        />
                    </div>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Tell me your eco-friendly activity..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm" className="p-2 shrink-0 bg-eco-green hover:bg-eco-green-dark">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChatBot;