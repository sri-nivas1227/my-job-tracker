import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "bson";

/*
Data structure for a application object
The slug itself is a unique identifier for the application
{
    id: "string",
    role: "string",
    company: "string",
    dateApplied: "string",
    status: "string",
    notes: "string",
    jobDescriptionLink: "string",
    resumeLink: "string",
    coverLetterLink: "string",
}

*/

export const trackerSlice = createSlice({
  name: "tracker",
  initialState: {
    jobs: [
      {
        id: "1",
        role: "Software Engineer",
        company: "Google",
        dateApplied: "2021-10-10",
        status: "Applied",
        notes: "This is a note",
        jobDescriptionLink: "https://google.com",
        resumeLink: "https://google.com",
        coverLetterLink: "https://google.com",
      },
    ],
  },
  reducers: {
    addApplication: (state, action) => {
      const applicationData = action.payload;
      const id = createId();
      applicationData.id = id;

      state.jobs.push(applicationData);
    },
    deleteApplication: (state, action) => {
      let data = state.jobs;
      data = data.filter((application) => application.id !== action.payload.id);
      state.jobs = data;
      // return state.tracker.filter((person) => person.id !== action.payload);
    },
    editApplication: (state, action) => {
      console.log("here in slice");
      const applicationData = action.payload;
      const id = applicationData.id;

      console.log(applicationData, id);
      let data = state.jobs;
      data = data.map((application) => {
        if (application.id === id) {
          return applicationData;
        }
        return application;
      });
      console.log(data);
      state.jobs = data;
    },
  },
});

const createId = () => {
  return new ObjectId().toString();
};

// const { actions, reducer } = personSlice;
export const { addApplication, deleteApplication, editApplication } =
  trackerSlice.actions;
export const jobs = (state) => state.tracker.jobs;

export default trackerSlice.reducer;
