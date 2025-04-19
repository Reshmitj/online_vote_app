package com.sau.onlinevoting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sau.onlinevoting.model.Admin;
import com.sau.onlinevoting.model.SecurityLog;
import com.sau.onlinevoting.model.VoteLog;
import com.sau.onlinevoting.model.Voter;
import com.sau.onlinevoting.repository.AdminRepository;
import com.sau.onlinevoting.repository.SecurityLogRepository;
import com.sau.onlinevoting.repository.VoteLogRepository;
import com.sau.onlinevoting.repository.VoteRepository;
import com.sau.onlinevoting.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private SecurityLogRepository securityLogRepository;
    
    @Autowired
    private VoteLogRepository voteLogRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginAdmin(@RequestParam String email, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();

        Optional<Admin> admin = adminRepository.findByEmail(email);
        
        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            response.put("message", "Login Successful");
            response.put("redirect", "/admin-dashboard");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }
    }
    
    @GetMapping("/pending-voters")
    public ResponseEntity<List<Voter>> getPendingVoters() {
        return ResponseEntity.ok(adminService.getPendingVoters());
    }

    @PostMapping("/approve-voter")
    public ResponseEntity<String> approveVoter(@RequestParam String email) {
        adminService.approveVoter(email);
        return ResponseEntity.ok("Voter approved successfully!");
    }
    
    @GetMapping("/security-logs")
    public ResponseEntity<List<SecurityLog>> getSecurityLogs(@RequestParam(required = false) String userId) {
        return ResponseEntity.ok(userId != null ? securityLogRepository.findByUserId(userId) : securityLogRepository.findAll());
    }
    
    @GetMapping("/vote-logs")
    public ResponseEntity<List<VoteLog>> getVoteLogs() {
        return ResponseEntity.ok(voteLogRepository.findAll());
    }

}
