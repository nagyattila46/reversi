package com.example.reversitwo.service;


import com.example.reversitwo.dto.BoardDTO;
import com.example.reversitwo.entity.Board;
import java.util.List;
import java.util.Optional;

public interface ReversiService {

    BoardDTO createGame(BoardDTO boardDTO);

    Optional<BoardDTO>findByID(Long ID);

    List<Board> findAll();


}
