import React, { useState } from "react";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    designation: "",
    company: "",
    aboutCompany: "",
    termsAccepted: false,
    idProofs: {
      idCard: { checked: false, file: null },
      appointmentLetter: { checked: false, file: null },
      buildersLetter: { checked: false, file: null },
    },
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleIdProofChange = (e, proofType) => {
    const { type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      idProofs: {
        ...prev.idProofs,
        [proofType]: {
          checked:
            type === "checkbox" ? checked : prev.idProofs[proofType].checked,
          file: files ? files[0] : prev.idProofs[proofType].file,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Check if at least one ID proof is selected and has an image uploaded
    const idProofs = Object.values(formData.idProofs);
    const isIdProofSelected = idProofs.some((proof) => proof.checked);
    const isImageUploaded = idProofs.some(
      (proof) => proof.checked && proof.file
    );

    if (form.checkValidity() === false || !formData.termsAccepted) {
      e.stopPropagation();
      if (!formData.termsAccepted) {
        toast.error("You must accept the Terms and Conditions!");
      }
    } else if (!isIdProofSelected) {
      toast.error("At least one ID proof selection is mandatory!");
    } else if (!isImageUploaded) {
      toast.error("Please upload an image for the selected ID proof!");
    } else {
      console.log("Form Data Submitted:", formData);
      window.confirm("Form submitted successfully!");
      navigate("/subscription");
    }

    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="d-flex flex-column"
      >
        <Row className="mt-5 justify-content-center d-flex">
          <Col md={8} className="mt-5">
            <Row className="d-flex">
              <h1 className="text-center fw-medium fs-3 mb-5">
                Designation Form
              </h1>
              {["name", "contact", "email", "designation", "company"].map(
                (field, index) => (
                  <Col md={6} className="mb-3" key={index}>
                    <Form.Group controlId={field}>
                      <Form.Label className="fs-5">
                        {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your {field}.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )
              )}
              <Col md={6} className="mb-3">
                <Form.Group controlId="aboutCompany">
                  <Form.Label className="fs-5">About Company</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="aboutCompany"
                    value={formData.aboutCompany}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* {/ ID Proofs Section /} */}
              <Col md={12} className="mb-3">
                <h5>ID Proofs</h5>
                {[
                  { label: "ID Card", key: "idCard" },
                  { label: "Appointment Letter", key: "appointmentLetter" },
                  { label: "Builder's Written Letter", key: "buildersLetter" },
                ].map(({ label, key }) => (
                  <Form.Group controlId={key} key={key} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      label={label}
                      checked={formData.idProofs[key].checked}
                      onChange={(e) => handleIdProofChange(e, key)}
                    />
                    {formData.idProofs[key].checked && (
                      <>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleIdProofChange(e, key)}
                        />
                        {formData.idProofs[key].file && (
                          <Image
                            src={URL.createObjectURL(
                              formData.idProofs[key].file
                            )}
                            alt={label}
                            thumbnail
                            className="mt-2"
                            width={150}
                          />
                        )}
                      </>
                    )}
                  </Form.Group>
                ))}
              </Col>

              {/* {/ Terms and Conditions Checkbox /} */}
              <Col md={12} className="mb-3">
                <Form.Group controlId="termsAccepted">
                  <Form.Check
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    label={
                      <span>
                        I accept the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms and Conditions
                        </a>{" "}
                        <span className="text-danger">*</span>
                      </span>
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    You must accept the Terms and Conditions.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center my-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ReplyForm;
