package com.example.reversitwo.AI.search;

import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * This class extends {@link BreadthFirstSolver} to add a heuristic-based
 * priority queue (instead of a vanilla queue).
 * 
 * @author Marcello
 */

public class BestFirstSolver extends AbstractSolver {
	
	private PriorityQueue<State> queue = null;
	
	public BestFirstSolver() {
		queue = new PriorityQueue<State>(1,new Comparator<State>(){
			public int compare(State s1, State s2) {
				// Calculate the f(x) for each state using the sum of distance
				// and heuristic.
				return Double.compare(s1.getDistance()+s1.getHeuristic(),
									  s2.getDistance()+s2.getHeuristic());
			}
		});
	}
	

	protected void addState(State s) {
		if (!queue.contains(s))
			queue.offer(s);
	}

	protected boolean hasElements() {
		return !queue.isEmpty();
	}

	protected State nextState() {
		return queue.remove();
	}
	
	protected void clearOpen(){
		queue.clear();
	}
}
