import axios from "axios";
const VOTER_API_BASE_URL = "http://localhost:8080/api/voter";
const ADMIN_API_BASE_URL = "http://localhost:8080/api/admin";
const CANDIDATE_API_BASE_URL = "http://localhost:8080/api/candidates";

export const registerVoter = async (voterData) => {
    const response = await axios.post(`${VOTER_API_BASE_URL}/register`, voterData, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const verifyOtp = async (email, otp) => {
    const response = await axios.post(`${VOTER_API_BASE_URL}/verify-otp`, null, {
        params: { email, otp },
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const getVoterInfo = async (email) => {
    const response = await axios.get(`${VOTER_API_BASE_URL}/get-voter`, {
        params: { email },
    });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await axios.post(`${VOTER_API_BASE_URL}/login`, null, {
        params: { email, password },
    });
    return response.data;
};

export const loginAdmin = async (email, password) => {
    const response = await axios.post(`${ADMIN_API_BASE_URL}/login`, null, {
        params: { email, password },
    });
    return response.data;
};

export const getPendingVoters = async () => {
    const response = await axios.get(`${ADMIN_API_BASE_URL}/pending-voters`);
    return response.data;
};

export const approveVoter = async (email) => {
    await axios.post(`${ADMIN_API_BASE_URL}/approve-voter`, null, {
        params: { email },
    });
};

export const getUnapprovedVoters = async () => {
    const response = await axios.get(`${ADMIN_API_BASE_URL}/unapproved`);
    return response.data;
};

export const getSecurityLogs = async () => {
    const response = await axios.get(`${ADMIN_API_BASE_URL}/security-logs`);
    return response.data;
};


// NEW: Cast a vote
export const castVote = async (voterId, candidateId) => {
    const response = await axios.post(`${VOTER_API_BASE_URL}/cast-vote`, null, {
        params: { voterId, candidateId },
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const addCandidate = async (candidateData) => {
    const response = await axios.post("http://localhost:8080/api/candidates/add", candidateData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };
  
  export const getCandidates = async () => {
    const response = await axios.get("http://localhost:8080/api/candidates");
    return response.data;
  };
  
  export const getVoteLogs = async () => {
    const response = await axios.get("http://localhost:8080/api/admin/vote-logs");
    return response.data;
  };
  