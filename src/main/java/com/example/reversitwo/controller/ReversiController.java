package com.example.reversitwo.controller;

import com.example.reversitwo.dto.BoardDTO;
import com.example.reversitwo.entity.Board;
import com.example.reversitwo.entity.Player;
import com.example.reversitwo.service.ReversiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.lang.management.PlatformLoggingMXBean;
import java.util.Optional;

@RestController
public class ReversiController {

    private ReversiService reversiService;

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
    /*
    @RequestMapping(path="/{id}",method=RequestMethod.GET)
    public ResponseEntity<BoardDTO>findByID(@PathVariable(name="id") String ID){
        Optional<BoardDTO>optionalBoardDTO=reversiService.findByID(ID);

        ResponseEntity<BoardDTO> response;
        if(optionalBoardDTO.isPresent()){
            response=ResponseEntity.ok(optionalBoardDTO.get());
        }else{
            response=ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return response;
    }*/

    @RequestMapping(path="/lepes/{board}/{player}/{i}/{j}",method=RequestMethod.POST)

    public Board lepes(@RequestParam Board board,@RequestParam Player player,@RequestParam int i,@RequestParam int j){
        return reversiService.makeMove(board,player,i,j);
    }


}
