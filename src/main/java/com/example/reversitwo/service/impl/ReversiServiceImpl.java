package com.example.reversitwo.service.impl;

import com.example.reversitwo.dto.BoardDTO;
import com.example.reversitwo.entity.Board;
import com.example.reversitwo.entity.Player;
import com.example.reversitwo.repository.GameRepository;
import com.example.reversitwo.service.ReversiService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ReversiServiceImpl implements ReversiService {


    private final GameRepository gameRepository;
    private ModelMapper modelMapper;


    public ReversiServiceImpl(GameRepository gameRepository,ModelMapper modelMapper){
        this.gameRepository=gameRepository;
        this.modelMapper=modelMapper;

    }

    @Override
    public BoardDTO createGame(BoardDTO boardDTO) {
        Board boardToSave=modelMapper.map(boardDTO,Board.class);

        Board savedBoard=gameRepository.save(boardToSave);
        return modelMapper.map(savedBoard, BoardDTO.class);
    }

    @Override
    public Board gameplay() {
        return null;
    }


    @Override
    public Board makeMove(Board b,Player p,int i,int j) {
        b.setMezo(b,p,i,j);
        return b;
    }

    @Override
    public BoardDTO makeMove(BoardDTO b, Player p, int i, int j) {
        b.setMezo(b,p,i,j);
        return b;
    }

    @Override
    public Player checkWinner(Board b) {
        if(b.getEgyesekSzama()>b.getKettesekSzama())return Player.RED;
        if(b.getEgyesekSzama()<b.getKettesekSzama())return Player.BLUE;
        else return null;
    }



    @Override
    public Optional<BoardDTO> findByID(Long ID) {
        Optional<Board>optionalBoard=gameRepository.findById(ID);
        return optionalBoard.map(board -> modelMapper.map(board,BoardDTO.class));
    }

    @Override
    public List<Board> findAll() {
        List<Board> optionalBoard=gameRepository.findAll();
        return optionalBoard;
    }
}
