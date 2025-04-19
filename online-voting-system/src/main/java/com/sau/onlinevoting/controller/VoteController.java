package com.sau.onlinevoting.controller;

import com.sau.onlinevoting.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voter")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/cast-vote")
    public ResponseEntity<String> castVote(@RequestParam String voterId, @RequestParam String candidateId) {
        String result = voteService.castVote(voterId, candidateId);

        if (result.contains("already voted")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }
}
