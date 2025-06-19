import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Tenders from "@/pages/Tenders";
import TenderDetail from "@/pages/TenderDetail";
import TenderCreate from "@/pages/TenderCreate";
import Marketplace from "@/pages/Marketplace";
import MarketplaceItemDetail from "@/pages/MarketplaceItemDetail";
import MarketplaceItemCreate from "@/pages/MarketplaceItemCreate";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import NewMessage from "@/pages/NewMessage";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import TopSpecialists from "@/pages/TopSpecialists";
import HowItWorks from "@/pages/HowItWorks";
import Help from "@/pages/Help";
import Guarantees from "@/pages/Guarantees";
import GuaranteeCreate from "@/pages/GuaranteeCreate";
import GuaranteeDetail from "@/pages/GuaranteeDetail";
import Wallet from "@/pages/Wallet";
import Admin from "@/pages/Admin";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/authContext";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tenders" component={Tenders} />
          <Route path="/tenders/create" component={TenderCreate} />
          <Route path="/tenders/:id" component={TenderDetail} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/marketplace/create" component={MarketplaceItemCreate} />
          <Route path="/marketplace/:id" component={MarketplaceItemDetail} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/messages" component={Messages} />
          <Route path="/messages/new" component={NewMessage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/top-specialists" component={TopSpecialists} />
          <Route path="/guarantees" component={Guarantees} />
          <Route path="/guarantees/create" component={GuaranteeCreate} />
          <Route path="/guarantees/:id" component={GuaranteeDetail} />
          <Route path="/guarantees/my" component={Guarantees} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/help" component={Help} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
