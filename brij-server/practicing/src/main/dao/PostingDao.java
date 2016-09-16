package main.dao;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import main.bean.posting.Posting;


@Transactional
public interface PostingDao extends JpaRepository<Posting, Long> {
	
	public ArrayList<Posting> getAllPostings();

	public ArrayList<Posting> getPostingsByUserID(@Param("userID") String userID);
	
	public Posting getPostingById(@Param("id") int i);



}
