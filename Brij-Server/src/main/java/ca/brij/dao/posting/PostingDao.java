package ca.brij.dao.posting;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import ca.brij.bean.posting.Posting;



@Transactional
public interface PostingDao extends JpaRepository<Posting, Long> {
	
	public ArrayList<Posting> getAllPostings(Pageable pageable);

	public ArrayList<Posting> getPostsByLocation(Pageable pageable, @Param("latitude") Double latitude, @Param("longitude") Double longitude, @Param("distance") Double distance );
	
	public ArrayList<Posting> getPostingsByUserID(@Param("userID") String userID, Pageable pageable);
	
	public int getCountOfAll();
	
	public int getCountOfUser(@Param("userID") String userID);
	
	public Posting getPostingById(@Param("id") int i);



}
