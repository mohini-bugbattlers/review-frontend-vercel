import { motion } from "framer-motion";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SubscriptionPlans.css"; // Import CSS for animations

const SubscriptionPlans = () => {
  const freeTrialPlan = {
    title: "Free Trial",
    price: "0$/month",
    features: ["90 Days Access", "Basic Support"],
    buttonText: "Start Trial",
  };

  return (
    <div className="subscription-container mt-5">
      <h2 className="text-3xl font-bold mb-6 mt-5">Subscription Plan</h2>
      <motion.div
        className="animated-card "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="custom-card border-animation py-5">
          <Card.Body className="text-center">
            <h3 className="plan-title">{freeTrialPlan.title}</h3>
            <p className="plan-price">{freeTrialPlan.price}</p>
            <ul className="plan-features">
              {freeTrialPlan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <Link to="/home" className="custom-button">
              {freeTrialPlan.buttonText}
            </Link>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubscriptionPlans;
