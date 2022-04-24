package com.example.reversitwo.AI.puzzles;

import com.example.reversitwo.AI.search.AbstractState;
import com.example.reversitwo.AI.search.State;

import java.util.HashSet;
import java.util.Set;

/**
 * This class defines a state for the Sliding Tile problem.
 * 
 * @author Marcello
 */

public class SlidingTileState extends AbstractState {

	/**
	 * Constructs a new default sliding tile state.
	 * This is specified as the game start state: B B B   W W W
	 */
	public SlidingTileState() {
	}

	/**
	 * An array of tiles for the state.
	 */
	private char[] tiles = {'b','b','b',' ','w','w','w'};
	
	/**
	 * Constructs a move state from a parent state
	 * @param parent  the parent state
	 * @param space   the location of its space
	 * @param tile    the locaiton of the tile to move into the space     
	 */
	private SlidingTileState(SlidingTileState parent, int space, int tile) {
		super(parent);
		this.tiles = parent.tiles.clone();
		this.tiles[space] = parent.tiles[tile];
		this.tiles[tile] = parent.tiles[space];
	}

	/**
	 * Returns a set of all possible moves from this state.
	 */
	public Set<State> getPossibleMoves() {
		Set<State> moves = new HashSet<State>();
		// Find the space
		int space = getSpace();
		// Try all possible moves (check if they're valid)
		for (int i=space-3; i<=space+3; i++)
			if (i>=0 && i<tiles.length && i!=space)
				moves.add(new SlidingTileState(this, space, i));
		return moves;
	}
	/**
	 * Finds the space in the sliding tile problem
	 * @return the index of the space
	 */
	private int getSpace() {
		for (int i=0; i<tiles.length; i++)
			if (tiles[i] == ' ')
				return i;
		return 0;
	}
	/**
	 * Counts the number of white tiles to the right of black tiles. This counts
	 * separately for each black tile (so if there are 3 black tiles to the left
	 * of 3 white tiles, this returns 9).
	 * 
	 * @return the number of white tiles to the right of black tiles.
	 */
	private int countWhiteTiles() {
		int sum = 0;
		for (int i=0; i<tiles.length; i++)
			if (tiles[i] == 'b')
				for (int j=i+1; j<tiles.length; j++)
					if (tiles[j]=='w')
						sum++;
		return sum;
	}
	/**
	 * The solution is specified as having all the white tiles to the left
	 * of all the black tiles.
	 * @return true if this state is a solution
	 */
	public boolean isSolution() {
		return countWhiteTiles() == 0;
	}


	/**
	 * Returns a heuristic approximation of the number of moves required
	 * to solve this problem from this state.  This is implemented as
	 * counting the number of white tiles to the right of black tiles.
	 */
	public double getHeuristic() {
		return countWhiteTiles();
	}
	/**
	 * Compares whether two states are identical.
	 */
	public boolean equals(Object o) {
		if (o==null || !(o instanceof SlidingTileState))
			return false;
		SlidingTileState sts = (SlidingTileState)o;
		return new String(tiles).equals(new String(sts.tiles));
	}
	/**
	 * Returns a hashcode for this state (for lookup optimization).
	 */
	public int hashCode() {
		return new String(tiles).hashCode();
	}
	public String toString() {
		return "Sliding Tile State ["+new String(tiles)+"] "+
		       "(moves: "+ getDistance() +") (heuristic: "+getHeuristic()+")";
	}
}
