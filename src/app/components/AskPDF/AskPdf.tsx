'use client'

import React, { useState } from "react";
import styles from './ask-pdf.module.css';

function AskPDF()   {
    const [pdfFile, setPdfFile] = useState(null);
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
      };
    
      const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!pdfFile || !question) {
          alert("Please upload a PDF file and enter a question.");
          return;
        }
    
        const formData = new FormData();
        formData.append("pdf", pdfFile);
        formData.append("question", question);
    
        try {
          const res = await fetch("http://127.0.0.1:5000/ask-pdf", {
            method: "POST",
            body: formData,
          });
    
          if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
          }
    
          const data = await res.json();
          setResponse(data.response);
        } catch (error) {
          console.error("Error:", error);
          setResponse("An error occurred while processing your request.");
        }
      };

      return (
        <div className={styles['ask-pdf-container']}>
          <h1 className={styles['ask-pdf-title']}>Ask PDF</h1>
          <form onSubmit={handleSubmit} className={styles['ask-pdf-form']}>
            <div className={styles['form-group']}>
              <label>Upload PDF:</label>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </div>
            <div className={styles['form-group']}>
              <label>Enter Question:</label>
              <input type="text" value={question} onChange={handleQuestionChange} />
            </div>
            <button type="submit" className={styles['ask-pdf-button']}>Submit</button>
          </form>
          {response && (
            <div className={styles['ask-pdf-response-container']}>
              <h2 className={styles['ask-pdf-response-title']}>Response:</h2>
              <p className={styles['ask-pdf-response-text']}>{response}</p>
            </div>
          )}
        </div>
      );

}

export default AskPDF;