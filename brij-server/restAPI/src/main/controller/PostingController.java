package main.controller;

import java.security.Principal;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import main.bean.posting.Posting;
import main.dao.PostingDao;
import main.utils.MergeBeanUtil;

@RestController
public class PostingController {

	@Autowired
	private PostingDao postingDao;

	@RequestMapping(value = "/posting/save", method = RequestMethod.POST)
	@ResponseBody
	public String updateUser(@RequestBody Posting post, Principal principal) {
		try {
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
			return "Error updating posting: " + ex.toString();
		}
		return "Post succesfully updated!";
	}

	/**
	 * Find By User
	 */
	@RequestMapping(value = "/posting/findByUser", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Posting> getPostingByUser(String username) {
		ArrayList<Posting> postings = null;
		try {
			postings = postingDao.getPostingsByUserID(username);
		} catch (Exception ex) {
			return null;
		}
		return postings;
	}

	/**
	 * Get all the postings in the db
	 */
	@RequestMapping(value = "/posting/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Posting> getAllPosting() {
		ArrayList<Posting> postings;
		try {
			postings = postingDao.getAllPostings();
		} catch (Exception ex) {
			return null;
		}
		return postings;
	}

}
