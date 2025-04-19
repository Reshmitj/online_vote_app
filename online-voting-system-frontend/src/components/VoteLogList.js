import React, { useEffect, useState } from "react";
import { getVoteLogs } from "../api";
import {
  Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, CircularProgress, Box
} from "@mui/material";

const VoteLogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getVoteLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching vote logs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
       <Paper elevation={5} sx={{ padding: "20px", marginBottom: "30px" }}>
  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
    Vote Logs (Audit Trail)
  </Typography>

  {loading ? (
    <CircularProgress />
  ) : logs.length > 0 ? (
    <Table sx={{ minWidth: "100%" }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#1976d2" }}>
          <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Voter ID</TableCell>
          <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Candidate ID</TableCell>
          <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Timestamp</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {logs.map((log, index) => (
          <TableRow key={index}>
            <TableCell>{log.voterId || "N/A"}</TableCell>
            <TableCell>{log.candidateId || "N/A"}</TableCell>
            <TableCell>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Typography sx={{ fontStyle: "italic" }}>No vote logs found.</Typography>
  )}
</Paper>

    </Box>
  );
};

export default VoteLogList;
