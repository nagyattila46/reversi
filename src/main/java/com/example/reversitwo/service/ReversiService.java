package com.example.reversitwo.service;

import com.example.reversitwo.dto.BoardDTO;
import com.example.reversitwo.entity.Board;
import com.example.reversitwo.entity.Player;

import java.util.List;
import java.util.Optional;

public interface ReversiService {

    BoardDTO createGame(BoardDTO boardDTO);

    Board gameplay();

    Board makeMove(Board b,Player p,int i,int j);

    BoardDTO makeMove(BoardDTO b,Player p,int i,int j);

    Player checkWinner(Board b);

    Optional<BoardDTO>findByID(Long ID);

    List<Board> findAll();

}
