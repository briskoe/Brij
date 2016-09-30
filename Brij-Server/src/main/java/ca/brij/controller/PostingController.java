package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.posting.Posting;
import ca.brij.dao.posting.PostingDao;
import ca.brij.utils.MergeBeanUtil;



@RestController
public class PostingController {

	@Autowired
	private PostingDao postingDao;

	@RequestMapping(value = "/posting/save", method = RequestMethod.POST)
	@ResponseBody
	public String updatePost(@RequestBody Posting post, Principal principal) throws Exception {
		try {
			logger.info("saving post("+post.getTitle()+") made by: " + principal.getName());
			post.setUserID(principal.getName());
			Posting origPost = null;
			if(post.getId() != null){
				origPost = postingDao.getPostingById(post.getId());

			}
			// means is new
			if (origPost == null) {
				origPost = post;
			} else {
				// update current one by saving only the changed values (not
				// null)
				MergeBeanUtil.copyNonNullProperties(post, origPost);

			}
			postingDao.save(origPost);
		} catch (Exception ex) {
			logger.error("error saving post("+post.getTitle()+") made by: " + principal.getName() + " message " + ex.getMessage());
			throw ex;
		}
		logger.info("Successfully saved post("+post.getTitle()+") made by: " + principal.getName());
		return "Success";
	}

	/**
	 * Find By User
	 * @throws Exception 
	 */
	@RequestMapping(value = "/posting/findByUser", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Posting> getPostingByUser(Principal principal) throws Exception {
		ArrayList<Posting> postings = null;
		try {
			logger.info("retrieving all posts made by: " + principal.getName());
			postings = postingDao.getPostingsByUserID(principal.getName());
		} catch (Exception ex) {
			logger.error("Error retrieving all users made by " + principal.getName());
			throw ex;
		}
		logger.info("successfully retrieved posts made by: " + principal.getName());
		return postings;
	}
	
	/**
	 * Find By id
	 */
	@RequestMapping(value = "/posting/findById", method = RequestMethod.GET)
	@ResponseBody
	public Posting getPostingById(int id) {
		Posting posting = null;
		try {
			logger.info("retrieving post by id" +  id);
			posting = postingDao.getPostingById(id);
		} catch (Exception ex) {
			logger.error("Error occurred retrieving post " + ex.getMessage());
			return null;
		}
		logger.info("Successfully retrieved post by id " + id);
		return posting;
	}

	/**
	 * Get all the postings in the db
	 * @throws Exception 
	 */
	@RequestMapping(value = "/posting/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Posting> getAllPosting() throws Exception {
		ArrayList<Posting> postings;
		try {
			logger.info("Retrieving all posts");
			postings = postingDao.getAllPostings();
		} catch (Exception ex) {
			logger.error("Failed retrieving posts " + ex.getMessage());
			throw ex;
		}
		return postings;
	}
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

}

