"use client";
import React, { useState } from "react";
import { databases } from "../lib/appwrite";

interface PostJobProps {
  clientId: string;
}

export function PostJob({ clientId }: PostJobProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        "670e91ec003be00bf8ed", // Your database ID
        "jobs", // Your collection ID for jobs
        "unique()",
        {
          clientId,
          title,
          description,
          budget: parseFloat(budget),
          status: "open",
        }
      );
      // Reset form or show success message
      setTitle("");
      setDescription("");
      setBudget("");
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
        required
      />
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Budget"
        required
      />
      <button type="submit">Post Job</button>
    </form>
  );
}

interface JobApplicationProps {
  jobId: string;
  freelancerId: string;
}

export function JobApplication({ jobId, freelancerId }: JobApplicationProps) {
  const [proposal, setProposal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        "670e91ec003be00bf8ed", // Your database ID
        "applications", // Your collection ID for applications
        "unique()",
        {
          jobId,
          freelancerId,
          proposal,
          status: "pending",
        }
      );
      // Reset form or show success message
      setProposal("");
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        placeholder="Your Proposal"
        required
      />
      <button type="submit">Submit Application</button>
    </form>
  );
}
