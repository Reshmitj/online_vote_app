package com.sau.onlinevoting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sau.onlinevoting.model.Voter;
import com.sau.onlinevoting.repository.VoterRepository;
import com.sau.onlinevoting.service.VoterService;

@RestController
@RequestMapping("/api/voter")
public class VoterController {
    @Autowired
    private VoterService voterService;
    
    @Autowired
    private VoterRepository voterRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerVoter(@RequestBody Voter voter) {
        try {
            Voter savedVoter = voterService.registerVoter(voter);
            return ResponseEntity.ok(savedVoter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestParam String email, @RequestParam int otp) {
        Map<String, String> response = new HashMap<>();

        if (voterService.verifyOtp(email, otp)) {
            response.put("message", "OTP Verified");
            response.put("redirect", "/dashboard");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid OTP");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/get-voter")
    public ResponseEntity<?> getVoter(@RequestParam String email) {
        Optional<Voter> voter = voterRepository.findByEmail(email);
        if (voter.isPresent()) {
            return ResponseEntity.ok(voter.get()); 
        } else {
            return ResponseEntity.badRequest().body("Voter not found"); 
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
        Map<String, String> response = voterService.loginVoter(email, password);

        if (response.containsKey("redirect")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
    

    @GetMapping("/unapproved")
    public ResponseEntity<List<Voter>> getUnapprovedVoters() {
        return ResponseEntity.ok(voterService.getUnapprovedVoters());
    }

    @PostMapping("/approve")
    public ResponseEntity<Map<String, String>> approveVoter(@RequestParam String voterId) {
        Map<String, String> response = new HashMap<>();
        if (voterService.approveVoter(voterId)) {
            response.put("message", "Voter approved successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Voter not found");
            return ResponseEntity.badRequest().body(response);
        }
    }


    
}
