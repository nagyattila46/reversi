package com.example.reversitwo.repository;

import com.example.reversitwo.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Board,Long> {
}
