package com.sau.onlinevoting.repository;

import com.sau.onlinevoting.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByVoterId(String voterId);
}
