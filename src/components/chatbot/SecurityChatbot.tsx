
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Shield, AlertTriangle, Bell, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  isTyping?: boolean;
}

const PRESET_QUESTIONS = [
  "Check my door status",
  "Show camera feeds",
  "Any unusual activity today?",
  "Change alarm settings",
  "Generate a security report"
];

const SecurityChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Home Security Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulate typing effect
  const simulateTyping = (messageContent: string) => {
    const botTypingMessage: Message = {
      id: Date.now().toString() + "-typing",
      content: "",
      sender: "bot",
      isTyping: true,
    };
    
    setMessages((prev) => [...prev, botTypingMessage]);
    
    // Calculate typing speed (characters per second)
    const typingSpeed = 20; // characters per second
    const typingDuration = Math.max(1000, (messageContent.length / typingSpeed) * 1000);
    
    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, {
          id: Date.now().toString(),
          content: messageContent,
          sender: "bot",
        }];
      });
    }, typingDuration);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to the list
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_OPENAI_API_KEY", // Replace with actual API key in production
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a home security assistant AI that helps users with their home security system. 
              You can provide information about:
              - Door/window status (pretend you have access to this data)
              - Camera feeds (describe what might be seen, but acknowledge these are simulated)
              - Report intrusions or unusual activity (simulate alerts)
              - Help manage alarm settings
              - Provide simulated daily security reports
              
              Always respond in a helpful, security-focused manner. If asked about real security status, 
              clearly indicate these are simulated responses for demonstration purposes.`,
            },
            { role: "user", content: input },
          ],
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      // Use typing effect for bot response
      simulateTyping(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Show error message with typing effect
      simulateTyping("I'm currently unable to process your request. Please try again later or check your network connection.");
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to the assistant. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes, let's enhance the fake responses
  const getDemoResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("door") || input.includes("window")) {
      return "📊 SECURITY STATUS: Based on your home sensors, I can see that:\n\n- Front Door: ✅ Locked\n- Back Door: ✅ Locked\n- Garage Door: ✅ Closed\n- Living Room Windows: ✅ Closed\n- Bedroom Windows: ✅ Closed\n- Kitchen Window: ⚠️ Partially Open (2 inches)\n\nWould you like me to send an alert or close the kitchen window remotely?";
    } else if (input.includes("camera") || input.includes("feed")) {
      return "📹 CAMERA FEEDS:\n\n- Front Door Camera: Normal activity. A delivery package was left at 2:15 PM.\n- Backyard Camera: A neighborhood cat was detected at 3:20 PM.\n- Driveway Camera: Your vehicle is parked securely.\n- Living Room Camera: No movement detected in the last 4 hours.\n\nAll cameras are functioning properly. Would you like to view any specific feeds in detail?";
    } else if (input.includes("intru") || input.includes("unusual")) {
      return "🔍 SECURITY ANALYSIS:\n\nIn the last 24 hours, I've detected:\n- 3 verified household member entries\n- 1 authorized visitor (delivery person at 2:15 PM)\n- 1 unidentified movement near your garage (3:45 PM) - analyzed and confirmed as your neighbor's dog\n\nThere are no concerning security incidents to report. Your home's security status is currently GREEN (All Clear).";
    } else if (input.includes("alarm") || input.includes("setting")) {
      return "⚙️ SECURITY SETTINGS:\n\nCurrent Mode: 'Home' 🏠\nPerimeter Security: Active\nMotion Sensors: Limited (Main areas only)\nCamera Recording: On demand\n\nAvailable Modes:\n- 'Away' 🌍 (Full security activation)\n- 'Night' 🌙 (Perimeter + selected motion sensors)\n- 'Vacation' 🏝️ (Enhanced security + simulated presence)\n\nWould you like to change your current security mode?";
    } else if (input.includes("report")) {
      const today = new Date().toLocaleDateString();
      return `📊 SECURITY REPORT: ${today}\n\nSECURITY EVENTS:\n- System functioning normally\n- 3 authorized entries (You: 8:30 AM, Family member: 12:15 PM, Family member: 3:40 PM)\n- 0 unauthorized access attempts\n\nEQUIPMENT STATUS:\n- All 8 cameras: Operational\n- All 12 door/window sensors: Operational\n- Motion detectors: All operational\n- Smoke/CO detectors: All operational\n\nBATTERY STATUS:\n- Front door camera: 92%\n- Basement motion sensor: 64% (Replacement recommended soon)\n\nRecommendation: Consider updating your emergency contact list - last updated 3 months ago.`;
    } else if (input.includes("hello") || input.includes("hi ") || input.includes("hey")) {
      return "Hello there! 👋 I'm your Home Security Assistant. I'm here to help you monitor and manage your home security system. You can ask me about door/window status, camera feeds, security reports, or to change your alarm settings. How can I assist you today?";
    } else if (input.includes("thank")) {
      return "You're welcome! I'm here 24/7 to help keep your home secure. Is there anything else you'd like to know about your security system?";
    } else if (input.includes("help")) {
      return "I can help you with several security functions:\n\n- Check door and window status\n- View camera feeds\n- Report any unusual activity or intrusions\n- Manage your alarm settings\n- Provide daily or on-demand security reports\n\nJust let me know what you need!";
    } else {
      return "I'm your Home Security Assistant. I can help you check door/window status, view camera feeds, report intrusions, manage alarm settings, or get security reports. What would you like to know about your home security?";
    }
  };

  const handleDemoSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to the list
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate API delay with typing indicator
    const responseContent = getDemoResponse(input);
    simulateTyping(responseContent);
    setIsLoading(false);
  };

  const handlePresetQuestion = (question: string) => {
    setInput(question);
    
    // Auto submit after a short delay
    if (typingTimeout) clearTimeout(typingTimeout);
    
    const timeout = setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleDemoSendMessage(fakeEvent);
    }, 500);
    
    setTypingTimeout(timeout);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`chatbot-container bg-white rounded-lg border shadow-lg transition-all duration-300 ${isExpanded ? 'h-[80vh]' : 'h-[500px] md:h-[600px]'}`}>
      <div className="bg-primary text-primary-foreground p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <h2 className="text-lg font-medium">Home Security Assistant</h2>
        </div>
        <Button variant="ghost" size="sm" className="p-1 h-auto text-primary-foreground hover:text-white hover:bg-primary/80" onClick={toggleExpanded}>
          {isExpanded ? <X className="h-4 w-4" /> : <span className="text-xs">Expand</span>}
        </Button>
      </div>
      
      <ScrollArea className="messages-container h-[calc(100%-132px)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            } ${msg.isTyping ? "opacity-70" : ""}`}
          >
            {msg.isTyping ? (
              <div className="flex items-center gap-2">
                <div className="typing-animation">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            ) : (
              <div className="whitespace-pre-line">{msg.content}</div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      <div className="border-t py-2 px-4">
        <div className="flex flex-wrap gap-2 mb-2 overflow-x-auto pb-2">
          {PRESET_QUESTIONS.map((question, index) => (
            <Button 
              key={index}
              variant="outline" 
              size="sm"
              className="text-xs py-1 px-2 h-auto whitespace-nowrap"
              onClick={() => handlePresetQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleDemoSendMessage} className="input-container flex gap-2">
        {isExpanded ? (
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your home security..."
            disabled={isLoading}
            className="flex-grow resize-none"
            rows={3}
          />
        ) : (
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your home security..."
            disabled={isLoading}
            className="flex-grow"
          />
        )}
        <Button type="submit" disabled={isLoading || !input.trim()} className={isExpanded ? "self-end" : ""}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default SecurityChatbot;
