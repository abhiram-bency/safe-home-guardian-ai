
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      
      // Add AI response to messages
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.choices[0].message.content,
        sender: "bot",
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Show error message and fallback response
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm currently unable to process your request. Please try again later or check your network connection.",
        sender: "bot",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to the assistant. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes, let's add some fake responses
  const getDemoResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("door") || input.includes("window")) {
      return "Based on your home sensors, all doors and windows appear to be securely closed and locked.";
    } else if (input.includes("camera") || input.includes("feed")) {
      return "Your front door camera shows normal activity. The backyard camera detected some movement from a neighborhood cat about 15 minutes ago.";
    } else if (input.includes("intru") || input.includes("unusual")) {
      return "No intrusions detected in the last 24 hours. There was some unusual activity near your garage yesterday at 3:45 PM, but it was identified as a delivery person.";
    } else if (input.includes("alarm") || input.includes("setting")) {
      return "Your alarm is currently set to 'Home' mode. Would you like to change it to 'Away' or 'Night' mode?";
    } else if (input.includes("report")) {
      return "Today's security report: All systems normal. 3 authorized entries (You at 8:30 AM, Your spouse at 12:15 PM, and Your child at 3:40 PM). No unusual activities detected. All cameras operational.";
    } else {
      return "I'm your Home Security Assistant. I can help you check door/window status, view camera feeds, report intrusions, manage alarm settings, or get security reports. What would you like to know?";
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
    
    // Simulate API delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: getDemoResponse(input),
        sender: "bot",
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chatbot-container bg-white rounded-lg border shadow-lg">
      <div className="bg-primary text-primary-foreground p-3 rounded-t-lg">
        <h2 className="text-lg font-medium">Home Security Assistant</h2>
      </div>
      
      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleDemoSendMessage} className="input-container flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your home security..."
          disabled={isLoading}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default SecurityChatbot;
