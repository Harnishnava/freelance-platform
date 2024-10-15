"use client";
import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { Models } from "appwrite";

interface Profile {
  name: string;
  skills: string[];
}

interface Job {
  $id: string;
  title: string;
  description: string;
}

function isProfile(obj: any): obj is Profile {
  return typeof obj.name === "string" && Array.isArray(obj.skills);
}

function isJob(obj: any): obj is Job {
  return (
    typeof obj.$id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string"
  );
}

export default function FreelancerDashboard({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await databases.getDocument(
          "670e91ec003be00bf8ed",
          "freelancers",
          userId
        );
        if (isProfile(response)) {
          setProfile(response);
        } else {
          console.error("Fetched profile does not match expected structure");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await databases.listDocuments(
          "670e91ec003be00bf8ed",
          "jobs"
        );
        const validJobs = response.documents
          .map((doc: Models.Document) => ({
            $id: doc.$id,
            title: doc.title as string,
            description: doc.description as string,
          }))
          .filter(isJob);
        setJobs(validJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchProfile();
    fetchJobs();
  }, [userId]);

  return (
    <div>
      <h1>Freelancer Dashboard</h1>
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          <p>Skills: {profile.skills.join(", ")}</p>
        </div>
      )}
      <h2>Available Jobs</h2>
      {jobs.map((job) => (
        <div key={job.$id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}
