package com.example.reversitwo.controller;


import com.example.reversitwo.AI.reversi.Reversi;
import com.example.reversitwo.AI.reversi.ReversiAllas;
import com.example.reversitwo.dto.BoardDTO;
import com.example.reversitwo.entity.Board;
import com.example.reversitwo.entity.Player;
import com.example.reversitwo.service.ReversiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest")
public class ReversiController {

    private final ReversiService reversiService;

    public ReversiController(ReversiService reversiService){this.reversiService=reversiService;}



    @RequestMapping(path="/board",method=RequestMethod.GET)
    public Board board(){
        return new Board();
    }

    @RequestMapping(path="/player",method=RequestMethod.GET)
    public Player player(){
        return Player.BLUE;
    }

    @RequestMapping(path="/create",method = RequestMethod.POST)
    public ResponseEntity<BoardDTO>create(@RequestBody @Valid BoardDTO boardDTO){
        BoardDTO savedBoard=reversiService.createGame(boardDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBoard);
    }

    @RequestMapping(path="/allsaved", method = RequestMethod.GET)
    public List findAll(){
        List<Board> boardList=reversiService.findAll();

        
        if(!boardList.isEmpty()){
            return boardList;
        }else{
            return null;
        }
    }

    @RequestMapping(path="/{id}",method=RequestMethod.GET)
    public ResponseEntity<BoardDTO>findByID(@PathVariable(name="id") Long ID){
        Optional<BoardDTO>optionalBoardDTO=reversiService.findByID(ID);


        ResponseEntity<BoardDTO> response;
        if(optionalBoardDTO.isPresent()){
            response=ResponseEntity.ok(optionalBoardDTO.get());
        }else{
            response=ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return response;
    }

    @RequestMapping(path="/getaimove",method = RequestMethod.POST)
    public ResponseEntity<BoardDTO>aimove(@RequestBody BoardDTO boardDTO){
        Reversi reversi=new Reversi();
        ReversiAllas allas=new ReversiAllas();
        allas.setMatrix(boardDTO.getPalya());
        allas.setN(boardDTO.getN());
        allas.setEgyesekSzama(boardDTO.getEgyesekSzama());
        allas.setKettesekSzama(boardDTO.getKettesekSzama());

        allas=reversi.playGame(allas);



        boardDTO.setPalya(allas.getÁllás());
        boardDTO.setN(allas.getN());
        boardDTO.setEgyesekSzama(allas.getEgyesekSzama());
        boardDTO.setKettesekSzama(allas.getKettesekSzama());


        ResponseEntity<BoardDTO>response;
        response=ResponseEntity.status(HttpStatus.OK).body(boardDTO);
        return response;
    }






}
