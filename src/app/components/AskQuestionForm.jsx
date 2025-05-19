import React from "react";

export default function AskQuestionForm({ onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn} aria-label="Close form">
          &times;
        </button>
        <h2 style={styles.title}>প্রশ্ন করুন</h2>

        <form
          action="https://formsubmit.co/m.b.siam2008@gmail.com"
          method="POST"
          style={styles.form}
        >
          {/* Name */}
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="আপনার নাম"
            required
          />

          {/* Email */}
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="আপনার ইমেইল"
            required
          />

          {/* Phone (optional) */}
          <input
            style={styles.input}
            type="tel"
            name="phone"
            placeholder="ফোন নম্বর (ঐচ্ছিক)"
          />

          {/* Question */}
          <textarea
            style={{ ...styles.input, height: "100px", resize: "vertical" }}
            name="question"
            placeholder="আপনার প্রশ্ন এখানে লিখুন"
            required
          />

          {/* FormSubmit hidden settings */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="/thank" />
          <input type="hidden" name="_subject" value="Qna question"/>
          {/* Submit */}
          <button type="submit" style={styles.submitBtn}>
            প্রশ্ন জমা দিন
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(4, 38, 10, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#f3f8f1",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 0 25px rgba(4, 38, 10, 0.7)",
    position: "relative",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#064420",
    boxSizing: "border-box",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 16,
    background: "transparent",
    border: "none",
    fontSize: 28,
    fontWeight: "bold",
    cursor: "pointer",
    color: "#064420",
  },
  title: {
    marginBottom: 20,
    fontWeight: "700",
    textAlign: "center",
    fontSize: 24,
    borderBottom: "2px solid #a3c293",
    paddingBottom: 8,
    letterSpacing: 1.1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    padding: "10px 14px",
    fontSize: 16,
    borderRadius: 8,
    border: "2px solid #a3c293",
    outlineColor: "#064420",
    fontFamily: "inherit",
    color: "#064420",
    backgroundColor: "#e6f0d4",
    transition: "border-color 0.3s ease",
  },
  submitBtn: {
    marginTop: 10,
    padding: "12px",
    fontSize: 18,
    fontWeight: "700",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#064420",
    color: "#f3f8f1",
    boxShadow: "0 3px 8px rgba(4, 38, 10, 0.6)",
    transition: "background-color 0.3s ease",
  },
};
