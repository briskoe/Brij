package ca.brij.dao.request;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import ca.brij.bean.request.Request;

public interface RequestDao  extends JpaRepository<Request, Long> {

	public ArrayList<Request> findAll();
	
	public Request findById(@Param("requestID") Integer integer);
	
	public ArrayList<Request> findByUser(@Param("userID") String userID);
	
	public ArrayList<Request> findByPost(@Param("postID") int postID);
	
	public Request findByUserAndPost(@Param("userID") String userID, @Param("postID") int postID);
}
