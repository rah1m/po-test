import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@company",
    phone: "0513686378",
    message: "Hello",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Simulating different scenarios
  const [scenario, setScenario] = useState("validation"); // 'validation' or 'network'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+994\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number in format: +994XXXXXXXXX";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔍 Submit button clicked");

    // Scenario 1: Validation Issue (silently fails without showing errors)
    if (scenario === "validation") {
      console.log("⚠️ Running validation...");
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
        console.error("❌ Validation failed:", validationErrors);

        // BUG: Validation fails but no error messages shown to user!
        // Uncomment the line below to fix:
        // setErrors(validationErrors)
        // setShowValidationErrors(true)

        // This is why "nothing happens" - the form is invalid but user doesn't see errors
        return;
      }
    }

    console.log("✅ Validation passed");
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Scenario 2: Network Error
    if (scenario === "network") {
      console.log("🌐 Attempting to send network request...");

      try {
        // Simulating an API call that fails
        const response = await fetch(
          "https://nonexistent-api-endpoint-12345.com/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Success:", data);
        setSubmitStatus({
          type: "success",
          message: "Form submitted successfully!",
        });
      } catch (error) {
        console.error("❌ Network error:", error);
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });

        // BUG: Error caught but user might not see clear feedback
        // Uncomment to fix:
        // setSubmitStatus({
        //   type: 'error',
        //   message: 'Failed to submit form. Please check your connection and try again.'
        // })

        // This is why "nothing happens" - network fails silently
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Contact Us</h1>
        <p className="subtitle">
          We'd love to hear from you. Fill out the form below and we'll get back
          to you soon.
        </p>
      </div>

      <div className="scenario-selector">
        <h3>Test Environment:</h3>
        <div className="scenario-buttons">
          <button
            className={`scenario-btn ${
              scenario === "validation" ? "active" : ""
            }`}
            onClick={() => {
              setScenario("validation");
              setSubmitStatus(null);
              setErrors({});
            }}
          >
            Form A
          </button>
          <button
            className={`scenario-btn ${scenario === "network" ? "active" : ""}`}
            onClick={() => {
              setScenario("network");
              setSubmitStatus(null);
              setErrors({});
            }}
          >
            Form B
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Contact Form</h2>

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {showValidationErrors && errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {showValidationErrors && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : ""}
            placeholder="+994513686378"
          />
          {showValidationErrors && errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={errors.message ? "error" : ""}
          />
          {showValidationErrors && errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {submitStatus && (
          <div className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
