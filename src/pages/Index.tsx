
import MainLayout from "@/components/layout/MainLayout";
import SecurityChatbot from "@/components/chatbot/SecurityChatbot";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Camera, Bell, Lock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const securityFeatures = [
    {
      icon: <ShieldCheck className="h-8 w-8 mb-2 text-accent" />,
      title: "Door & Window Status",
      description: "Real-time monitoring of all entry points in your home",
    },
    {
      icon: <Camera className="h-8 w-8 mb-2 text-accent" />,
      title: "Camera Feeds",
      description: "Live video from all your security cameras in one place",
    },
    {
      icon: <Bell className="h-8 w-8 mb-2 text-accent" />,
      title: "Intrusion Alerts",
      description: "Immediate notifications for any unusual activity",
    },
    {
      icon: <Lock className="h-8 w-8 mb-2 text-accent" />,
      title: "Smart Alarm Settings",
      description: "Customize your security preferences with ease",
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-hero-pattern text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Secure Your Home with Intelligent Monitoring
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Get real-time updates, manage security settings, and protect what matters most with our AI-powered security assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="w-full max-w-md">
                <SecurityChatbot />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-security-blue to-security-lightBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Home?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who trust Safe Home Guardian for their security needs. 
            Start protecting what matters most today.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
              Sign Up Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
