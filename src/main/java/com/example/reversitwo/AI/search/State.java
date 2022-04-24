package com.example.reversitwo.AI.search;

public interface State {

	Iterable<State> getPossibleMoves();
	
	boolean isSolution();
	
	double getHeuristic();
	
	double getDistance();
	
	State getParent();
}
