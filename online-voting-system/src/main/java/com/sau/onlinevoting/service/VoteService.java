package com.sau.onlinevoting.service;

import com.sau.onlinevoting.model.Vote;
import com.sau.onlinevoting.model.VoteLog;
import com.sau.onlinevoting.repository.VoteRepository;
import com.sau.onlinevoting.repository.VoteLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private VoteLogRepository voteLogRepository;

    @Autowired
    private EmailService emailService;

    public String castVote(String voterId, String candidateId) {
        if (voteRepository.existsByVoterId(voterId)) {
            return "You have already voted.";
        }

        Vote vote = new Vote(voterId, candidateId);
        voteRepository.save(vote);

        voteLogRepository.save(new VoteLog(voterId, "Vote Casted"));
        emailService.sendVoteConfirmation(voterId);

        return "Vote cast successfully.";
    }
}
