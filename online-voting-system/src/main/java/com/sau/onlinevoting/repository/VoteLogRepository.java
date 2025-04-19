package com.sau.onlinevoting.repository;

import com.sau.onlinevoting.model.VoteLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteLogRepository extends JpaRepository<VoteLog, Long> {
    List<VoteLog> findByVoterId(String voterId);
}
